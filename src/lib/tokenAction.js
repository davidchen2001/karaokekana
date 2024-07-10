import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const secretKey = process.env.NEXTAUTH_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 seconds")
    .sign(key);
}

export async function decrypt(input) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) {
    return null;
  }
  return await decrypt(session);
}

export async function updateSession(request) {
  const session = request.cookies.get("session");

  if (!session) {
    return;
  }

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });

  return res;
}
