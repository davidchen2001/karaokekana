import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

import { ROOT, PROTECTED_SUB_ROUTES, PUBLIC_ROUTES } from "./lib/routes";

export async function middleware(request) {
  const { nextUrl } = request;
  const session = await auth();
  const isAuthenticated = !!session?.user;

  const isProtectedRoute = PROTECTED_SUB_ROUTES.find((route) =>
    nextUrl.pathname.startsWith(route)
  );

  if (!isAuthenticated && isProtectedRoute)
    return NextResponse.redirect(new URL(LOGIN, nextUrl));
}

export const config = {
  matcher: "/song/submit",
};
