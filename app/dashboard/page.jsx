'use client';

import Link from 'next/link';
import React from 'react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Welcome to Your Dashboard 👨‍⚕️
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Request Medicine</h2>
            <p className="text-sm text-gray-600 mb-4">
              Create a new request for medicines needed in your medical store.
            </p>
            <Link
              href="/request?viewOnly=false"
              className="inline-block bg-blue-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              Make Request
            </Link>

          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">View My Requests</h2>
            <p className="text-sm text-gray-600 mb-4">
              Track the status of your previous medicine requests from the agency.
            </p>
            <Link
              href="/request?viewOnly=true"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              View Requests
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}
