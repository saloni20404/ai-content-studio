import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const content = await prisma.content.findFirst({
    where: { id, userId: user.id },
    include: { folder: true },
  });

  if (!content) return NextResponse.json({ error: 'Content not found' }, { status: 404 });
  return NextResponse.json(content);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const content = await prisma.content.findFirst({
    where: { id, userId: user.id },
  });
  if (!content) return NextResponse.json({ error: 'Content not found' }, { status: 404 });

  const body = await request.json();
  const { title, body: contentBody, tags, folderId, tone } = body;

  if (folderId) {
    const folder = await prisma.folder.findFirst({ where: { id: folderId, userId: user.id } });
    if (!folder) return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
  }

  const updated = await prisma.content.update({
    where: { id },
    data: {
      title: title ?? content.title,
      body: contentBody ?? content.body,
      tags: tags ?? content.tags,
      folderId: folderId !== undefined ? folderId : content.folderId,
      tone: tone ?? content.tone,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const content = await prisma.content.findFirst({ where: { id, userId: user.id } });
  if (!content) return NextResponse.json({ error: 'Content not found' }, { status: 404 });

  await prisma.content.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
