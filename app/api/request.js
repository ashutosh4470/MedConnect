import { connectToDatabase } from '@/lib/dbConnect';
import Request from '@/models/Request';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { storeId, medicineName, quantity } = req.body;

    try {
      const request = await Request.create({ storeId, medicineName, quantity });
      return res.status(201).json({ message: 'Request created', request });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  if (req.method === 'GET') {
    try {
      const requests = await Request.find().populate('storeId assignedTo');
      return res.status(200).json(requests);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).end();
}
