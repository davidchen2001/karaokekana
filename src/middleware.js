import { NextResponse } from "next/server";
import { getSession } from "./lib/tokenAction";
import { PROTECTED_SUB_ROUTES } from "./lib/routes";

export async function middleware(request) {
  const { nextUrl } = request;
  const currentSession = await getSession();
  const isProtectedRoute = PROTECTED_SUB_ROUTES.find((route) =>
    nextUrl.pathname.startsWith(route)
  );

  if (!currentSession && isProtectedRoute) {
    console.log("REDIRECT");
    return NextResponse.redirect(new URL("/", nextUrl));
  }
}

export const config = {
  matcher: ["/song/submit"],
};
