import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // User already has tokensUsed, tokensLimit, plan from the user object
  return NextResponse.json({
    tokensUsed: user.tokensUsed,
    tokensLimit: user.tokensLimit,
    plan: user.plan,
  });
}