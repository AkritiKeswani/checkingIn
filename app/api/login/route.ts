import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Redirect to Replit Auth login
  // This should trigger the Replit Auth flow configured in the workspace
  const authUrl = `https://${request.headers.get('host')}/api/auth/login`;
  return NextResponse.redirect(authUrl);
}