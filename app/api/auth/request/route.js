import dbConnect from '@/lib/dbConnect';
import Request from '@/models/Request';

export async function POST(req) {
    await dbConnect();
    const { storeId, medicineName, quantity } = await req.json();

    try {
        const request = await Request.create({ storeId, medicineName, quantity });
        return new Response(JSON.stringify({ message: 'Request created', request }), {
            status: 201,
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 400,
        });
    }
}

export async function GET() {
    await dbConnect();
    try {
        const requests = await Request.find().populate('storeId assignedTo');
        return new Response(JSON.stringify(requests), {
            status: 200,
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
        });
    }
}
