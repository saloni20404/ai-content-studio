import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const { userId: clerkId } = await auth()
  
  if (!clerkId) {
    return Response.json({ error: 'No clerkId', clerkId: null })
  }

  const user = await prisma.user.findUnique({ where: { clerkId } })
  
  return Response.json({ 
    clerkId, 
    userFound: !!user,
    userId: user?.id 
  })
}