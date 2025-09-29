import { NextRequest } from 'next/server';
import { getReplitUser, getOrCreateUser } from './replitAuth';

export interface AuthUser {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
}

export async function getAuthUser(request: NextRequest): Promise<AuthUser | null> {
  try {
    // Try to get Replit Auth user
    const replitUser = await getReplitUser(request);
    
    if (!replitUser) {
      // No authenticated user found
      return null;
    }

    // Get or create user in our database
    const user = await getOrCreateUser(replitUser);
    
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