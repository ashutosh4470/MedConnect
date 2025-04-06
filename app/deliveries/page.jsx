'use client';

import { useState, useEffect } from 'react';

export default function DeliveriesPage() {
  const [deliveries, setDeliveries] = useState([]);
  const [formData, setFormData] = useState({
    medicineName: '',
    quantity: '',
    deliveredTo: '',
    requestId: '',
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const res = await fetch('/api/deliveries');
      const data = await res.json();
      console.log('Deliveries API response:', data);

      if (Array.isArray(data)) {
        setDeliveries(data);
      } else {
        setDeliveries([]);
        console.error('Expected array, got:', data);
      }
    } catch (err) {
      console.error('Failed to fetch deliveries:', err);
      setDeliveries([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editId ? `/api/deliveries/${editId}` : '/api/deliveries';
    const method = editId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setFormData({ medicineName: '', quantity: '', deliveredTo: '' });
      setEditId(null);
      fetchDeliveries();
    } else {
      console.error('Failed to save delivery');
    }
  };

  const handleEdit = (delivery) => {
    setFormData({
      medicineName: delivery.medicineName,
      quantity: delivery.quantity,
      deliveredTo: delivery.deliveredTo,
    });
    setEditId(delivery._id);
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/deliveries/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      fetchDeliveries();
    } else {
      console.error('Failed to delete delivery');
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-10">
      <h1 className="text-3xl font-semibold text-yellow-700 mb-6 text-center">Deliveries 📦</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto mb-10">
        <h2 className="text-xl text-yellow-700 mb-4">{editId ? 'Update' : 'Add'} Delivery</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Medicine Name"
            value={formData.medicineName}
            onChange={(e) => setFormData({ ...formData, medicineName: e.target.value })}
            required
            className="w-full border rounded-lg p-2"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            required
            className="w-full border rounded-lg p-2"
          />
          <input
            type="text"
            placeholder="Delivered To"
            value={formData.deliveredTo}
            onChange={(e) => setFormData({ ...formData, deliveredTo: e.target.value })}
            required
            className="w-full border rounded-lg p-2"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg transition"
        >
          {editId ? 'Update Delivery' : 'Add Delivery'}
        </button>
      </form>

      {/* Delivery List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {deliveries.length === 0 ? (
          <p className="text-center text-gray-500">No deliveries yet.</p>
        ) : (
          deliveries.map((d) => (
            <div key={d._id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">{d.medicineName}</h3>
                <p className="text-sm text-gray-700">Quantity: {d.quantity}</p>
                <p className="text-sm text-gray-700">Delivered To: {d.deliveredTo}</p>
                <p className="text-sm text-gray-500">Date: {new Date(d.date).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(d)}
                  className="text-sm px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(d._id)}
                  className="text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
