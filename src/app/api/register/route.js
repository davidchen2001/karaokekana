import { NextResponse } from "next/server";
import { User } from "../../../model/User";

import bcrypt, { hash } from "bcryptjs";
import { dbConnect } from "../../../lib/db";

const SALT_ROUNDS = 5;

export const POST = async (request) => {
  const { username, password } = await request.json();

  await dbConnect();

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  try {
    await User.findOneAndUpdate(
      { username: username },
      {
        $setOnInsert: { password: hashedPassword },
      },
      { upsert: true }
    );
  } catch (err) {
    return NextResponse({ id: 500, text: err });
  }

  return NextResponse.json({
    id: 201,
    text: "User has been added",
  });
};
