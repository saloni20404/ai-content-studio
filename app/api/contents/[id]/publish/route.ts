import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import slugify from 'slugify';

function generateSlug(title: string): string {
  const baseSlug = slugify(title, { lower: true, strict: true });
  const suffix = Math.random().toString(36).substring(2, 6);
  return `${baseSlug}-${suffix}`;
}

export async function POST(
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

  const newPublishedStatus = !content.isPublished;
  let publicSlug = content.publicSlug;

  if (newPublishedStatus && !publicSlug) {
    publicSlug = generateSlug(content.title);
    const existing = await prisma.content.findUnique({ where: { publicSlug } });
    if (existing) publicSlug = generateSlug(content.title) + '-' + Date.now();
  }

  const updated = await prisma.content.update({
    where: { id },
    data: { isPublished: newPublishedStatus, publicSlug },
  });

  return NextResponse.json(updated);
}
