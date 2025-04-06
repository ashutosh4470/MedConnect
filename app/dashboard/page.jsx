'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  Bell,
  PackageSearch,
  ClipboardList,
  LayoutDashboard,
  Settings,
} from 'lucide-react';

export default function DashboardPage() {
  const [requestStats, setRequestStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    delivered: 0,
  });

  useEffect(() => {
    const fetchRequestStats = async () => {
      try {
        const res = await fetch('/api/auth/request', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();

        if (res.ok) {
          const pending = data.filter((req) => req.status === 'pending').length;
          const accepted = data.filter((req) => req.status === 'accepted').length;
          const delivered = data.filter((req) => req.status === 'delivered').length;
          const total = data.length;

          setRequestStats({ total, pending, accepted, delivered });
        } else {
          console.error('Failed to fetch request stats:', data.message || data.error);
        }
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };

    fetchRequestStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Welcome to Your Dashboard 👨‍⚕️
        </h1>

        {/* Analytics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Requests', count: requestStats.total, color: 'bg-blue-100' },
            { label: 'Pending', count: requestStats.pending, color: 'bg-yellow-100' },
            { label: 'Accepted', count: requestStats.accepted, color: 'bg-green-100' },
            { label: 'Delivered', count: requestStats.delivered, color: 'bg-purple-100' },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`rounded-xl p-4 shadow-sm ${item.color} text-center`}
            >
              <p className="text-lg font-semibold text-gray-700">{item.label}</p>
              <p className="text-2xl font-bold text-blue-800">{item.count}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Request Medicine */}
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <ClipboardList size={20} /> Request Medicine
            </h2>
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

          {/* View Requests */}
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <PackageSearch size={20} /> View My Requests
            </h2>
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

          {/* Inventory Management */}
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <LayoutDashboard size={20} /> Inventory Overview
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Monitor current stock levels and update inventory.
            </p>
            <Link
              href="/inventory"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              Manage Inventory
            </Link>
          </div>

          {/* Delivery History */}
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <ClipboardList size={20} /> Delivery History
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Check when and what was delivered recently.
            </p>
            <Link
              href="/deliveries"
              className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              View Deliveries
            </Link>
          </div>

          {/* Notifications */}
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Bell size={20} /> Notifications
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              View recent updates, alerts and important messages.
            </p>
            <Link
              href="/notifications"
              className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              View Alerts
            </Link>
          </div>

          {/* Settings */}
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Settings size={20} /> Settings
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Update your profile, store information and password.
            </p>
            <Link
              href="/settings"
              className="inline-block bg-gray-600 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
