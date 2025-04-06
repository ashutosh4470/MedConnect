import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Delivery from '@/models/delivery';

export async function GET() {
  try {
    await dbConnect();
    const deliveries = await Delivery.find().sort({ date: -1 });
    return NextResponse.json(deliveries);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch deliveries' }, { status: 500 });
  }
}

// POST /api/deliveries
export async function POST(req) {
    try {
      await dbConnect();
      const data = await req.json();
  
      // Create the delivery
      const newDelivery = await Delivery.create(data);
  
      // Update the status of the associated request
      await Request.findByIdAndUpdate(data.requestId, { status: 'Delivered' });
  
      return NextResponse.json(newDelivery, { status: 201 });
    } catch (err) {
      return NextResponse.json({ error: 'Failed to add delivery' }, { status: 500 });
    }
  }
  
