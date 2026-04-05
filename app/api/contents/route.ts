import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('search') || undefined;
  const tag = searchParams.get('tag') || undefined;
  const contentType = searchParams.get('contentType') as any || undefined;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = 20;
  const skip = (page - 1) * limit;

  const where: any = {
    userId: user.id,
  };

  if (search) {
    where.title = { contains: search, mode: 'insensitive' };
  }
  if (tag) {
    where.tags = { has: tag };
  }
  if (contentType) {
    where.contentType = contentType;
  }

  const [contents, total] = await Promise.all([
    prisma.content.findMany({
      where,
      skip,
      take: limit,
      orderBy: { updatedAt: 'desc' },
      include: {
        folder: { select: { id: true, name: true } },
      },
    }),
    prisma.content.count({ where }),
  ]);

  return NextResponse.json({
    contents,
    total,
    pages: Math.ceil(total / limit),
  });
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { title, contentType, folderId } = body;

  if (!title || !contentType) {
    return NextResponse.json(
      { error: 'Missing required fields: title, contentType' },
      { status: 400 }
    );
  }

  // Verify folder belongs to user if provided
  if (folderId) {
    const folder = await prisma.folder.findFirst({
      where: { id: folderId, userId: user.id },
    });
    if (!folder) {
      return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
    }
  }

  const content = await prisma.content.create({
    data: {
      title,
      contentType,
      userId: user.id,
      folderId: folderId || null,
      body: '',
      tags: '',
    },
  });

  return NextResponse.json(content, { status: 201 });
}