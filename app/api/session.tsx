import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

interface Session {
  cookies: string;
  csrf: string;
}

let session: Session | null = null;

async function getCsrf(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  });

  const text = await response.text();
  const dom = new JSDOM(text);
  const csrfToken = dom.window.document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

  console.log(`Token: ${csrfToken}`);

  return csrfToken;
}

export async function login(username: string, password: string): Promise<boolean> {
  const loginUrl = process.env.DASHURL || 'https://pvrfd-xihprfvtgg.mylogin.cc/';
  const dashboardUrl = process.env.DASHURL + '/dashboard' || 'https://pvrfd-xihprfvtgg.mylogin.cc/dashboard';

  // Step 1: Fetch the CSRF token
  const csrfToken = await getCsrf(loginUrl);

  // Step 2: Attempt to log in
  const response = await fetch(loginUrl, {
    method: 'POST',
    body: JSON.stringify({
      _token: csrfToken,
      username: username,
      password: password,
    }),
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  });

  // Check if login post was successful
  if (!response.ok) {
    return false;
  }

  const setCookie = response.headers.get('Set-Cookie');

  console.log(`Cookie: ${setCookie}`)

  const dashboardResponse = await fetch(dashboardUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Cookie': setCookie || '',

    },
  });

  const dashboardText = await dashboardResponse.text();

  console.log(`Dashboard: ${dashboardText}`);
  console.log(`Dashboard.ok: ${dashboardResponse.ok}`);

  if (dashboardResponse.ok && (dashboardText.includes('Connections') || dashboardText.includes('Connection Map'))) {
    const cookies = response.headers.get('set-cookie');
    session = {
      cookies: setCookie || '',
      csrf: csrfToken,
    };
    setTimeout(() => login(username, password), 60 * 60 * 1000); // Refresh every 60 minutes
    return true;
  } else {
    return false;
  }
}

