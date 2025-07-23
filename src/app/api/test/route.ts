// src/app/api/test/route.ts
import { connectDB } from '@/lib/db';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  await connectDB(); // 👈 This will log "MongoDB connected" if it's working
  return NextResponse.json({ status: 'Database connected successfully' });
}
