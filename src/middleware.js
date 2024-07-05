import { NextResponse } from "next/server";
import { authConfig } from "./authConfig";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

import { ROOT, PROTECTED_SUB_ROUTES } from "./lib/routes";

export async function middleware(request) {
  const { nextUrl } = request;
  const session = await auth();
  const isAuthenticated = !!session?.user;

  const isProtectedRoute = PROTECTED_SUB_ROUTES.find((route) =>
    nextUrl.pathname.startsWith(route)
  );

  console.log(isPublicRoute);

  if (!isAuthenticated && isProtectedRoute)
    return NextResponse.redirect(new URL(ROOT, nextUrl));
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
