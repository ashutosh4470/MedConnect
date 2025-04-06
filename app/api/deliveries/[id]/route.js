import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Delivery from '@/models/delivery';

export async function PUT(req, { params }) {
  const { id } = params;
  try {
    await dbConnect();
    const updated = await Delivery.findByIdAndUpdate(id, await req.json(), { new: true });
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update delivery' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await dbConnect();
    const deleted = await Delivery.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete delivery' }, { status: 500 });
  }
}
