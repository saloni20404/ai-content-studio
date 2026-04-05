import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const folders = await prisma.folder.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'asc' },
    include: {
      _count: { select: { contents: true } },
    },
  });

  return NextResponse.json(folders);
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { name } = body;

  if (!name || typeof name !== 'string') {
    return NextResponse.json(
      { error: 'Folder name is required' },
      { status: 400 }
    );
  }

  const folder = await prisma.folder.create({
    data: {
      name,
      userId: user.id,
    },
  });

  return NextResponse.json(folder, { status: 201 });
}