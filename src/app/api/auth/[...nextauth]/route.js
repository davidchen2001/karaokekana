import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import { dbConnect } from "../../../../lib/db";
import { User } from "../../../../model/User";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { encrypt } from "../../../../lib/tokenAction";
import { serialize } from "cookie";

export const authOptions = (req, res) => {
  return {
    session: {
      strategy: "jwt",
    },
    providers: [
      CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        credentials: {
          username: {},
          password: {},
        },
        async authorize(credentials) {
          if (credentials === null) return null;

          await dbConnect();

          try {
            const user = await User.findOne({
              username: credentials?.username,
            });

            if (user) {
              const isMatch = await bcrypt.compare(
                credentials.password,
                user.password
              );

              if (isMatch) {
                const sessionData = username;
                const encryptedSessionData = encrypt(sessionData);
                const cookie = serialize("session", encryptedSessionData, {
                  httpOnly: true,
                  maxAge: " 60 * 60", //one hour
                  path: "/",
                });

                res.setHeader("Set-Cookie", cookie);
                res.status(200).json({ message: "Successfully logged in!" });

                return user;
              } else {
                throw new Error("Username or Password is not correct");
              }
            } else {
              throw new Error("User not found");
            }
          } catch (error) {
            throw new Error(error);
          }
        },
      }),
    ],

    pages: {
      signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
  };
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
