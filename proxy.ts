import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/logs", "/alerts", "/agents", "/settings"];
const publicRoutes = ["/login", "/signup"];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));

  const sessionCookie = req.cookies.get("better-auth.session_token")?.value;

  // Redirect unauthenticated users away from protected routes
  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Redirect authenticated users away from login/signup
  if (isPublicRoute && sessionCookie) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
