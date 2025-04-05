import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'; // assuming you used JWT for login

// Replace this with your JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export async function GET(req) {
  try {
    const authHeader = req.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Simulate fetching user from DB
    const userFromDb = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
    };

    return NextResponse.json({ user: userFromDb });
  } catch (err) {
    console.error('Profile Fetch Error:', err);
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
  }
}
