import { auth } from '@clerk/nextjs/server'
import { prisma } from './prisma'

export async function getCurrentUser() {
  const { userId: clerkId } = await auth()
  
  console.log('getCurrentUser - clerkId:', clerkId)
  
  if (!clerkId) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { clerkId },
  })

  console.log('getCurrentUser - user found:', !!user)

  return user
}