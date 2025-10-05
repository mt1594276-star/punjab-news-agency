import { NextResponse } from 'next/server';
import { magazineStore } from '@/lib/magazineStore';

export async function GET() {
  const magazines = magazineStore.getAll();
  return NextResponse.json(magazines);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newMagazine = magazineStore.add(body);
    return NextResponse.json(newMagazine, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
