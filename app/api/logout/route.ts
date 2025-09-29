import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Redirect to Replit Auth logout
  const authUrl = `https://${request.headers.get('host')}/api/auth/logout`;
  return NextResponse.redirect(authUrl);
}