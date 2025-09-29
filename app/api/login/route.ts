import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // For demo purposes, set a cookie to simulate Google login
  const response = NextResponse.redirect(new URL('/', request.url));
  
  // Set demo auth cookie 
  response.cookies.set('demo-auth', 'true', {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7 // 1 week
  });
  
  return response;
}