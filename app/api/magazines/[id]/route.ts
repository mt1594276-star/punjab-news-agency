import { NextResponse } from 'next/server';
import { magazineStore } from '@/lib/magazineStore';

type RouteContext = {
  params: { id: string }
}

export async function GET(
  request: Request,
  context: RouteContext
) {
  const { id } = context.params;
  const magazine = magazineStore.getById(parseInt(id));
  if (!magazine) {
    return NextResponse.json({ error: 'Magazine not found' }, { status: 404 });
  }
  return NextResponse.json(magazine);
}

export async function PUT(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = context.params;
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
  context: RouteContext
) {
  const { id } = context.params;
  const deleted = magazineStore.delete(parseInt(id));
  if (!deleted) {
    return NextResponse.json({ error: 'Magazine not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
