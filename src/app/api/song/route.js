const accessToken = process.env.GENIUS_ACCESS_TOKEN;

import { NextResponse } from "next/server";
import { getLyrics, getSong } from "genius-lyrics-api";

export async function GET(request) {
  const title = request.nextUrl.searchParams.get("title");
  const artist = request.nextUrl.searchParams.get("artist");

  const options = {
    apiKey: accessToken,
    title: title,
    artist: artist,
    optimizeQuery: true,
  };

  try {
    const lyrics = await getLyrics(options);
    return NextResponse.json({ id: 200, text: lyrics });
  } catch (err) {
    return NextResponse.json({ id: 500, text: err });
  }
}
