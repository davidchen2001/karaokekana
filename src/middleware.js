import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_JWT_SECRET;

export default async function middleware(req) {
  const { nextUrl } = req;
  const token = await getToken({ req, secret });
  if (!token) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }
}

export const config = {
  matcher: ["/song/submit"],
};
