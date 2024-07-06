import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import { User } from "../../../../model/User";
import { authConfig } from "../../../../auth.config";
import bcrypt from "bcryptjs";

export const authOptions = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials === null) return null;

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
              return user;
            } else {
              throw new Error("Email or Password is not correct");
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
});
