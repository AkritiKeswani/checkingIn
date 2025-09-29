import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Remove demo auth cookie
  const response = NextResponse.redirect(new URL('/', request.url));
  
  response.cookies.delete('demo-auth');
  
  return response;
}