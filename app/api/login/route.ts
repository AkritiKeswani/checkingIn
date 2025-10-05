import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // In Replit environment, redirect to the Replit Auth login
    // The Replit Auth integration should handle this automatically
    const host = request.headers.get('host');
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    
    // Try to redirect to Replit Auth login endpoint
    // This will be handled by the Replit Auth integration
    const authUrl = `${protocol}://${host}/auth/login`;
    
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Login redirect error:', error);
    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 }
    );
  }
}