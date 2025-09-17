import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const isLoggedIn = req.cookies.get("basic-auth")
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth/login")
  if (!isLoggedIn && !isAuthPage) return NextResponse.redirect(new URL("/auth/login", req.url))

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

