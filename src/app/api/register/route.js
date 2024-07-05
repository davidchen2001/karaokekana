import { NextResponse } from "next/server";
import { User } from "../../../model/User";

import bcrypt from "bcryptjs";
import { dbConnect } from "../../../lib/db";

const SALT_ROUNDS = 5;

export const POST = async (request) => {
  const { username, password } = await request.json();

  await dbConnect();

  const hashedPassword = bcrypt.hash(password, SALT_ROUNDS);

  const newUser = {
    username: username,
    password: hashedPassword,
  };

  try {
    await User.create(newUser);
  } catch (err) {
    return new NextResponse(error.mesage, {
      status: 500,
    });
  }

  return new NextResponse("User has been created", {
    status: 201,
  });
};
