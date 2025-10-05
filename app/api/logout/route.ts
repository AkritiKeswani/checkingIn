import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // In Replit environment, redirect to the Replit Auth logout
    const host = request.headers.get('host');
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    
    // Try to redirect to Replit Auth logout endpoint
    const authUrl = `${protocol}://${host}/auth/logout`;
    
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Logout redirect error:', error);
    return NextResponse.json(
      { error: 'Logout failed. Please try again.' },
      { status: 500 }
    );
  }
}