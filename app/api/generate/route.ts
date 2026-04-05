import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const lengthMap = { short: '150-250', medium: '300-500', long: '600-1000' };

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { contentId, topic, tone, length, keywords, contentType } = await req.json();
  const wordRange = lengthMap[length as keyof typeof lengthMap] ?? '300-500';

  const prompt = `Write a ${contentType?.replace('_', ' ').toLowerCase() ?? 'piece of content'} about: ${topic}.
Tone: ${tone}. Length: ${wordRange} words.
${keywords ? `Include these keywords naturally: ${keywords}.` : ''}
Write only the content, no explanations or meta-commentary.`;

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1500,
    });

    const text = completion.choices[0]?.message?.content ?? '';
    const tokensUsed = completion.usage?.total_tokens ?? 0;

    await prisma.user.update({
      where: { id: user.id },
      data: { tokensUsed: { increment: tokensUsed } },
    });

    if (contentId) {
      await prisma.content.update({
        where: { id: contentId },
        data: { body: text, tokensUsed: { increment: tokensUsed } },
      });
    }

    return NextResponse.json({ text, tokensUsed });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
