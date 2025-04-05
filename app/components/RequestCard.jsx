'use client';

export default function RequestCard({ request }) {
  const { medicineName, quantity, storeName, note, status = 'Pending', createdAt } = request;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 w-full max-w-md mx-auto">
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
}
