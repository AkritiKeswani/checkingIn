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
    // For demo purposes, check if there's a 'demo-auth' cookie to simulate being logged in
    const demoAuthCookie = request.cookies.get('demo-auth');
    
    if (!demoAuthCookie) {
      // No authentication - return null so user sees sign-in button
      return null;
    }

    // Simulate authenticated user for demo
    const mockUserId = "user_demo";
    
    // Check if user exists, create if not  
    let user = await prisma.user.findUnique({
      where: { id: mockUserId }
    });
    
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: mockUserId,
          email: "demo@gmail.com", 
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

// Middleware function to require authentication
export async function requireAuth(request: NextRequest): Promise<AuthUser> {
  const user = await getAuthUser(request);
  if (!user) {
    throw new Error('Unauthorized - Please sign in with Google');
  }
  return user;
}