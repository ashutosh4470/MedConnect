'use client';

import { useEffect, useState } from "react";

export default function RequestCard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch('/api/auth/request', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();
        if (res.ok) {
          setRequests(data);
        } else {
          console.error('Error fetching requests:', data.error || data.message);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="space-y-4 p-4">
      {requests.length > 0 ? (
        requests.map((req) => {
          const {
            _id,
            medicineName,
            quantity,
            status = 'Pending',
            storeId,
            note,
            createdAt,
          } = req;

          const storeName = storeId?.name || 'Unknown Store';

          return (
            <div key={_id} className="bg-white shadow-md rounded-lg p-4 sm:p-6 w-full max-w-md mx-auto">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-blue-700">{medicineName}</h3>
                <span
                  className={`text-sm font-medium px-2 py-1 rounded ${
                    status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : status === 'Approved'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {status}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Quantity:</span> {quantity}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Store:</span> {storeName}
              </p>

              {note && (
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Note:</span> {note}
                </p>
              )}

              {createdAt && (
                <p className="text-xs text-gray-400 mt-2">
                  Requested on: {new Date(createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-600">No requests found.</p>
      )}
    </div>
  );
}
  