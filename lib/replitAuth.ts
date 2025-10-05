// Replit Auth integration for Next.js App Router
import { prisma } from './prisma';
import { config } from './config';

interface ReplitUser {
  sub: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  profile_image_url?: string;
}

export async function getReplitUser(request: Request): Promise<ReplitUser | null> {
  try {
    // Check for Replit Auth session
    const cookies = request.headers.get('cookie');
    if (!cookies) {
      return null;
    }

    // Parse cookies to find Replit Auth session
    const cookieMap = new Map();
    cookies.split(';').forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      cookieMap.set(name, value);
    });

    // Check for Replit Auth session cookie
    const sessionId = cookieMap.get('connect.sid') || cookieMap.get('replit_session');
    if (!sessionId) {
      return null;
    }

    // In Replit environment, we can access the user info through the global Replit object
    // This is available when running in Replit's environment
    if (typeof window !== 'undefined' && (window as any).replit) {
      const replit = (window as any).replit;
      if (replit.auth && replit.auth.user) {
        return {
          sub: replit.auth.user.id || replit.auth.user.sub,
          email: replit.auth.user.email,
          first_name: replit.auth.user.firstName || replit.auth.user.first_name,
          last_name: replit.auth.user.lastName || replit.auth.user.last_name,
          profile_image_url: replit.auth.user.profileImageUrl || replit.auth.user.profile_image_url
        };
      }
    }

    // For server-side, try to get user info from Replit Auth API
    // This would require the Replit Auth service to be running
    try {
      const authResponse = await fetch(`${config.replitAuth.authUrl}/auth/me`, {
        headers: {
          'Cookie': `connect.sid=${sessionId}`,
          'User-Agent': 'Next.js App'
        }
      });

      if (authResponse.ok) {
        const userData = await authResponse.json();
        return {
          sub: userData.id || userData.sub,
          email: userData.email,
          first_name: userData.firstName || userData.first_name,
          last_name: userData.lastName || userData.last_name,
          profile_image_url: userData.profileImageUrl || userData.profile_image_url
        };
      }
    } catch (apiError) {
      console.log('Replit Auth API not available, trying alternative method');
    }

    // Fallback: Check if we're in a Replit environment and try to get user from environment
    if (config.replitAuth.userId) {
      return {
        sub: config.replitAuth.userId,
        email: config.replitAuth.userEmail,
        first_name: config.replitAuth.userFirstName,
        last_name: config.replitAuth.userLastName,
        profile_image_url: config.replitAuth.userProfileImageUrl
      };
    }

    return null;
  } catch (error) {
    console.error('Replit Auth error:', error);
    return null;
  }
}

export async function getOrCreateUser(replitUser: ReplitUser) {
  return await prisma.user.upsert({
    where: { id: replitUser.sub },
    update: {
      email: replitUser.email,
      firstName: replitUser.first_name,
      lastName: replitUser.last_name,
      profileImageUrl: replitUser.profile_image_url,
    },
    create: {
      id: replitUser.sub,
      email: replitUser.email,
      firstName: replitUser.first_name,
      lastName: replitUser.last_name,
      profileImageUrl: replitUser.profile_image_url,
    },
  });
}