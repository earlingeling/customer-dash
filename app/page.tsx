'use client'
import React, { useState, useEffect } from 'react';
import Dashboard from './dashboard/page';
import Image from 'next/image';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (loggedInUser && new Date(loggedInUser.expiresAt) > new Date()) {
        setIsLoggedIn(true);
        setUsername(loggedInUser.username);
      }
      setHasMounted(true);
    }
  }, [hasMounted]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // TODO: validate username and password
    if (username === 'Romaguera-Crona' && password === 'password') {
      setIsLoggedIn(true);
      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 1);
      localStorage.setItem('user', JSON.stringify({ username, expiresAt: expirationDate.toISOString() }));
    } else {
      setError('Invalid username or password.');
    }

    setIsLoading(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-14 w-10 border-t-2 border-b-2 border-gray-900">
          </div>
          <div className="ml-10">
            <p className="text-gray-900 text-m font-bold mt-15 animate-pulse">Logging you in...</p>
            </div>
            <div className="ml-10">
          </div>
        </div>
      ) : (
        <div>
          {hasMounted && isLoggedIn ? (
            <Dashboard authorized={isLoggedIn} username={username} onLogout={handleLogout} />
          ) : (
            <div>
                <h2 className="mt-6 text-center text-m font-extrabold text-gray-900">Dashboard Login:</h2>
                <form className="mt-8 space-y-6" name="loginform" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username" className="sr-only">
                      Username:
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete="username"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password:
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Log in
                    </button>
                  </div>
                </form>
                {error && (
                  <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                    <br />
                    <span className="text-s">Contact your reseller for support.</span>
                  </div>
                )}
              </div>
            
          )}
        </div>
      )}
    </div>
  );
};

export default LoginPage;