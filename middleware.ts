import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protected routes
  const protectedRoutes = ["/dashboard", "/entries"]
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  if (isProtectedRoute) {
    const token = request.cookies.get("token")?.value

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    const userId = await verifyToken(token)
    if (!userId) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  // Redirect authenticated users away from auth pages
  const authRoutes = ["/login", "/signup"]
  const isAuthRoute = authRoutes.includes(pathname)

  if (isAuthRoute) {
    const token = request.cookies.get("token")?.value
    if (token) {
      const userId = await verifyToken(token)
      if (userId) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/entries/:path*", "/login", "/signup"],
}
