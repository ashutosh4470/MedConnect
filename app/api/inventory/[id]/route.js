import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Inventory from '@/models/inventory';

// PUT: Update a single item
export async function PUT(req, { params }) {
  const { id } = params;

  try {
    await dbConnect();
    const data = await req.json();
    const updated = await Inventory.findByIdAndUpdate(id, data, { new: true });
    if (!updated) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update inventory item' }, { status: 500 });
  }
}

// DELETE: Remove a single item
export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await dbConnect();
    const deleted = await Inventory.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Item deleted successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete inventory item' }, { status: 500 });
  }
}
