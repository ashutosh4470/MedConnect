'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Profile({ show, onClose }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch user');
        }

        setUser(data.user);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    if (show) {
      fetchUser(); // Fetch user info when modal is shown
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && user && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white w-full max-w-sm rounded-3xl shadow-xl p-6 relative border border-blue-100"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl"
              aria-label="Close"
            >
              &times;
            </button>

            {/* Avatar */}
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-3xl text-blue-700 font-bold shadow-inner">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-center text-blue-700 mb-4">
              Your Profile
            </h2>

            {/* Divider */}
            <hr className="mb-4 border-t border-blue-100" />

            {/* User Info */}
            <div className="space-y-3 text-gray-700 text-sm">
              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-medium text-base">{user.name}</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium text-base">{user.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Role</p>
                <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
                  {user.role}
                </span>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-5 border-t border-blue-100" />

            {/* Logout */}
            <button
              onClick={() => {
                sessionStorage.clear();
                window.location.reload();
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              Logout
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
