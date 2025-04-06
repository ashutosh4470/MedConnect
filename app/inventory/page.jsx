





'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function InventoryPage() {
    const [inventory, setInventory] = useState([]);
    const [formData, setFormData] = useState({
        _id: '',
        medicineName: '',
        batchNumber: '',
        expiryDate: '',
        quantity: '',
        pricePerUnit: '',
    });

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        const res = await fetch('/api/inventory');
        const data = await res.json();
        setInventory(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = formData._id ? 'PUT' : 'POST';
        const url = formData._id ? `/api/inventory/${formData._id}` : '/api/inventory';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            setFormData({
                _id: '',
                medicineName: '',
                batchNumber: '',
                expiryDate: '',
                quantity: '',
                pricePerUnit: '',
            });
            fetchInventory();
        }
    };

    const handleDelete = async (id) => {
        const res = await fetch(`/api/inventory/${id}`, {
            method: 'DELETE',
        });
        if (res.ok) {
            fetchInventory();
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-5xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold text-blue-800 mb-10 text-center"
                >
                    Inventory Management
                </motion.h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto mb-10"
                >
                    <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
                        Add Medicine to Inventory
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Medicine Name */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Medicine Name
                            </label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g. Paracetamol"
                                value={formData.medicineName}
                                onChange={(e) =>
                                    setFormData({ ...formData, medicineName: e.target.value })
                                }
                                required
                            />
                        </div>

                        {/* Batch Number */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Batch Number
                            </label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g. B12345"
                                value={formData.batchNumber}
                                onChange={(e) =>
                                    setFormData({ ...formData, batchNumber: e.target.value })
                                }
                                required
                            />
                        </div>

                        {/* Expiry Date */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Expiry Date
                            </label>
                            <input
                                type="date"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.expiryDate}
                                onChange={(e) =>
                                    setFormData({ ...formData, expiryDate: e.target.value })
                                }
                                required
                            />
                        </div>

                        {/* Quantity */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Quantity</label>
                            <input
                                type="number"
                                min={1}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g. 50"
                                value={formData.quantity}
                                onChange={(e) =>
                                    setFormData({ ...formData, quantity: e.target.value })
                                }
                                required
                            />
                        </div>

                        {/* Price per Unit */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 font-medium mb-2">
                                Price per Unit (₹)
                            </label>
                            <input
                                type="number"
                                min={0}
                                step={0.01}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g. 5.00"
                                value={formData.pricePerUnit}
                                onChange={(e) =>
                                    setFormData({ ...formData, pricePerUnit: e.target.value })
                                }
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-center mt-8">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
                        >
                            ➕ Add to Inventory
                        </button>
                    </div>
                </form>

                {/* Inventory List */}
                <h2 className="text-2xl font-semibold mb-4 text-blue-700">Current Stock</h2>
                <div className="grid gap-4">
                    {inventory.length === 0 ? (
                        <p className="text-gray-500">No medicines in inventory.</p>
                    ) : (
                        inventory.map((item) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white p-4 rounded shadow border"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <div>
                                        <h3 className="font-bold text-lg text-blue-800">{item.medicineName}</h3>
                                        <p className="text-sm text-gray-500">Batch: {item.batchNumber}</p>
                                    </div>
                                    <div className="space-x-2">
                                        <button
                                            onClick={() => setFormData(item)}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <p className="text-sm">Qty: {item.quantity}</p>
                                <p className="text-sm">Price: ₹{item.pricePerUnit}</p>
                                <p className="text-sm text-gray-600">
                                    Expiry: {new Date(item.expiryDate).toLocaleDateString()}
                                </p>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
