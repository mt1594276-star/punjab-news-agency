import { NextResponse } from 'next/server';
import { contactStore } from '@/lib/contactStore';

export async function GET() {
  const contact = contactStore.get();
  return NextResponse.json(contact);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const updated = contactStore.update(body);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
