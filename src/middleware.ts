import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;
  const { pathname } = req.nextUrl;

  const protectedUserRoutes = ['/profile'];
  const protectedAdminRoutes = ['/adminDashboard'];

  try {
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      );
      const decodedToken = JSON.parse(jsonPayload);

      if (!decodedToken.isAdmin && protectedAdminRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/', req.url));
      }

      if (pathname === '/login' || pathname === '/register') {
        return NextResponse.redirect(new URL('/', req.url));
      }

      return NextResponse.next();
    } else {
      if (protectedUserRoutes.some(route => pathname === route || pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/login', req.url));
      }

      if (protectedAdminRoutes.some(route => pathname === route || pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/', req.url));
      }

      return NextResponse.next();
    }
  } catch (err) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/login', '/register', '/profile/:path*', '/adminDashboard/:path*'],
};
