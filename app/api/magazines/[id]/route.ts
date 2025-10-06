import { NextResponse } from 'next/server';
import { magazineStore } from '@/lib/magazineStore';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const magazine = magazineStore.getById(parseInt(id));
  if (!magazine) {
    return NextResponse.json({ error: 'Magazine not found' }, { status: 404 });
  }
  return NextResponse.json(magazine);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = magazineStore.update(parseInt(id), body);
    if (!updated) {
      return NextResponse.json({ error: 'Magazine not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deleted = magazineStore.delete(parseInt(id));
  if (!deleted) {
    return NextResponse.json({ error: 'Magazine not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}

export const dynamic = 'force-dynamic';
