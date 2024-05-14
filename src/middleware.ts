import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
 

export function middleware(request: NextRequest) {
  
  const cookieStore = cookies()
  const hasCookie = cookieStore.has('token')
  const url = request.nextUrl;
  console.log(url);
  

  console.log(hasCookie);
  
  if (
    hasCookie &&
    (url.pathname.startsWith('/signup') ||
      url.pathname.startsWith('/main')
      )
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  
    
}

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile/:path*',
    '/main',
    '/signup',
    
  ]
}