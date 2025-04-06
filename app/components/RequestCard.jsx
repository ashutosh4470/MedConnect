'use client';

import { useEffect, useState } from "react";

export default function RequestCard() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [deliveredRequests, setDeliveredRequests] = useState([]);

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
          setPendingRequests(data.filter(req => req.status === 'pending'));
          setAcceptedRequests(data.filter(req => req.status === 'accepted'));
          setDeliveredRequests(data.filter(req => req.status === 'delivered'));
        } else {
          console.error('Error fetching requests:', data.error || data.message);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchRequests();
  }, []);

  const renderCard = (req) => {
    const {
      _id,
      medicineName,
      quantity,
      status,
      storeId,
      note,
      createdAt,
    } = req;

    const storeName = storeId?.name || 'Unknown Store';

    return (
      <div key={_id} className="bg-white shadow-md rounded-lg p-4 w-full">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-blue-700">{medicineName}</h3>
          <span
            className={`text-sm font-medium px-2 py-1 rounded ${
              status === 'pending'
                ?  'bg-red-100 text-red-700'
                : status === 'accepted'
                ?  'bg-yellow-100  text-yellow-700'
                :'bg-green-100 text-green-700'
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
  };

  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Pending Requests */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-yellow-700">Pending</h2>
          <div className="space-y-4">
            {pendingRequests.length > 0 ? (
              pendingRequests.map(renderCard)
            ) : (
              <p className="text-gray-500">No pending requests.</p>
            )}
          </div>
        </div>

        {/* Accepted Requests */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-green-700">Accepted</h2>
          <div className="space-y-4">
            {acceptedRequests.length > 0 ? (
              acceptedRequests.map(renderCard)
            ) : (
              <p className="text-gray-500">No accepted requests.</p>
            )}
          </div>
        </div>

        {/* Delivered Requests */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-blue-700">Delivered</h2>
          <div className="space-y-4">
            {deliveredRequests.length > 0 ? (
              deliveredRequests.map(renderCard)
            ) : (
              <p className="text-gray-500">No delivered requests.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
