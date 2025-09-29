import { NextRequest } from 'next/server';
import { prisma } from './prisma';

export interface AuthUser {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
}

export async function getAuthUser(request: NextRequest): Promise<AuthUser | null> {
  try {
    // In development, we'll create a mock user for now
    // This will be replaced with actual Replit Auth when fully implemented
    const mockUserId = "user_1";
    
    // Check if user exists, create if not
    let user = await prisma.user.findUnique({
      where: { id: mockUserId }
    });
    
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: mockUserId,
          email: "demo@example.com",
          firstName: "Demo",
          lastName: "User"
        }
      });
    }
    
    return {
      id: user.id,
      email: user.email || undefined,
      firstName: user.firstName || undefined,
      lastName: user.lastName || undefined,
      profileImageUrl: user.profileImageUrl || undefined
    };
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}

export function requireAuth() {
  return async function(request: NextRequest) {
    const user = await getAuthUser(request);
    if (!user) {
      throw new Error('Unauthorized');
    }
    return user;
  };
}