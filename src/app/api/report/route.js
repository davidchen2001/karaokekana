import { NextResponse } from "next/server";
import { Report } from "../../../model/Report";
import { dbConnect } from "../../../lib/db";

export async function GET(req) {
  await dbConnect();

  const reports = await Report.find({});

  return NextResponse.json({
    id: 200,
    text: reports,
  });
}

export async function POST(req) {
  const { title, artist } = await req.json();

  await dbConnect();

  const filter = {
    title: title,
    artist: artist,
  };
  const update = { title: title, artist: artist };
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  // Find the document
  try {
    await Report.findOneAndUpdate(filter, update, options);
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      id: 500,
      text: err,
    });
  }

  return NextResponse.json({
    id: 201,
    text: "Report has been made",
  });
}

export async function DELETE(req) {
  const { title, artist } = await req.json();

  await dbConnect();

  const filter = {
    title: title,
    artist: artist,
  };

  // Find the document
  try {
    const result = await Report.deleteOne(filter);
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      id: 500,
      text: err,
    });
  }

  return NextResponse.json({
    id: 201,
    text: "Report has been deleted",
  });
}
