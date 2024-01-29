'use server'
import React from 'react'
import { useEffect, useState } from 'react';

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        }
    }
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    }
    };

/**
 * Retrieves users from the API based on the provided company name.
 * @param companyName - The name of the company to filter users by.
 * @returns An array of users filtered by the provided company name.
 */
export const getUsers = async (companyName: string) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        cache: "no-store",
    });
    const users = await response.json();
    // Filter users by the provided company name
    return users.filter((user: User) => user.company.name === companyName);
}

const page = async (company: string) => {
    const users =  await getUsers(company);
    return (
        <div className="container mx-auto p-4 bg-white">
            <h4 className="text-2xl font-bold mb-6 text-center">Test Data</h4>
            <ul className="space-y-4">
                {users.map((user: User) => (
                    <li 
                        key={user.id} 
                        className="p-6 border border-gray-200 rounded-lg shadow hover:shadow-md transition duration-300 bg-white"
                    >
                        <p className="text-lg font-semibold">{user.name} ({user.username})</p>
                        <a href={`mailto:${user.email}`} className="text-gray-700">{user.email}</a>
                        <p className="text-gray-700">Phone: {user.phone}</p>
                        <p className="text-gray-700">Website: {user.website}</p>
                        <div className="mt-4">
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
        </div>
    )
    
}

export default page