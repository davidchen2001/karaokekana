import { dbConnect } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const con = await dbConnect();
    return NextResponse.json({ id: 200, message: "Connected" });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json({ id: 500, message: error.message }, { status: 500 });
  }
}
