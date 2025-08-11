import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Only protect dashboard routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    try {
      // Use HTTP request to get session (compatible with stable Next.js versions)
      const sessionResponse = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      })

      if (!sessionResponse.ok) {
        const url = new URL("/auth/signin", request.url)
        url.searchParams.set("callbackUrl", request.nextUrl.pathname)
        return NextResponse.redirect(url)
      }

      const session = await sessionResponse.json()

      // If no session, redirect to sign in
      if (!session?.user) {
        const url = new URL("/auth/signin", request.url)
        url.searchParams.set("callbackUrl", request.nextUrl.pathname)
        return NextResponse.redirect(url)
      }

      // Check for admin routes
      if (request.nextUrl.pathname.startsWith("/dashboard/admin")) {
        if (session.user.role !== "admin") {
          // Redirect non-admin users to regular dashboard
          return NextResponse.redirect(new URL("/dashboard", request.url))
        }
      }

      return NextResponse.next()
    } catch (error) {
      console.error("Auth middleware error:", error)
      // Redirect to sign in on any auth error
      const url = new URL("/auth/signin", request.url)
      url.searchParams.set("callbackUrl", request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
  ],
}
