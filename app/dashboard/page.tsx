'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getUsers, User } from '../api/apiguide';

// Remove the ? to make the username required
interface DashboardProps {
  authorized?: boolean;
  username?: string;
  onLogout?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ authorized, username, onLogout }) => {

  // use getUsers function from test/page.tsx to get users
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsers(username || "");
      setUsers(usersData);
    }
    fetchUsers();
  }
  , [username]);
  
  return (
    <div>
      <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">Welcome, {username}!</h2>
      <p className="mt-4 mb-4 text-center text-gray-600">You are logged in to your account.</p>
      <ul className="list-none space-y-4">
        {users.map((user: User) => (
          <li 
            key={user.id} 
            className="p-3 border text-black border-indigo-600 rounded-lg shadow hover:shadow-md transition duration-300"
          >
            <p className="text-lg font-semibold">{user.name} ({user.username})</p>
            <a href={`mailto:${user.email}`} className="text-gray-700">{user.email}</a>
            <p className="text-gray-700">Phone: {user.phone}</p>
            <p className="text-gray-700">Website: {user.website}</p>
            <div className="mt-3">
              <h5 className="font-bold">Address:</h5>
              <p className="text-gray-600">{user.address.street}, {user.address.suite}</p>
              <p className="text-gray-600">{user.address.city}, {user.address.zipcode}</p>
              <p className="text-gray-600">Geo: {user.address.geo.lat}, {user.address.geo.lng}</p>
            </div>
            <div className="mt-3">
              <h5 className="font-bold">Company:</h5>
              <p className="text-gray-600">{user.company.name}</p>
              <p className="text-gray-600">{user.company.catchPhrase}</p>
              <p className="text-gray-600">{user.company.bs}</p>
            </div>
          </li>
        ))}
      </ul>
      <button
        className="mt-8 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={onLogout}
      >
        Log out
      </button>
    </div>
  );
};

export default Dashboard;