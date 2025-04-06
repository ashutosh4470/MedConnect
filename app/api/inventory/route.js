import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Inventory from '@/models/inventory';

export async function GET() {
  try {
    await dbConnect();
    const items = await Inventory.find().sort({ addedOn: -1 });
    return NextResponse.json(items);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch inventory' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();
    const newItem = await Inventory.create(data);
    return NextResponse.json(newItem, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to add inventory item' }, { status: 500 });
  }
}
