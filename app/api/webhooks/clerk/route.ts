export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    return new Response('Missing webhook secret', { status: 500 })
  }

  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing Svix headers', { status: 400 })
  }

  const payload = await req.text()

  const wh = new Webhook(WEBHOOK_SECRET)
  let evt: WebhookEvent

  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Webhook verification failed:', err)
    return new Response('Invalid signature', { status: 400 })
  }

  if (evt.type === 'user.created') {
    const { id, email_addresses, first_name, last_name } = evt.data
    const primaryEmail = email_addresses[0]?.email_address

    if (!primaryEmail) {
      return new Response('No email found', { status: 400 })
    }

    await prisma.user.upsert({
      where: { clerkId: id },
      update: {},
      create: {
        clerkId: id,
        email: primaryEmail,
        name: `${first_name || ''} ${last_name || ''}`.trim() || null,
      },
    })
  }

  if (evt.type === 'user.deleted') {
    const { id } = evt.data
    if (id) {
      await prisma.user.delete({
        where: { clerkId: id },
      }).catch(() => {})
    }
  }

  return new Response('OK', { status: 200 })
}