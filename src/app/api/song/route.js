import { configDotenv } from "dotenv";
const accessToken = process.env.GENIUS_ACCESS_TOKEN;

import { NextRequest } from "next/server";
import { getLyrics, getSong } from "genius-lyrics-api";

export async function GET(request) {
  const { title } = request.nextUrl.searchParams.get("title");
  const options = {
    apiKey: accessToken,
    title: title,
    optimizeQuery: true,
  };

  getLyrics(options)
    .then((lyrics) => {
      console.log(lyrics);
      return Response.json({ id: 200, text: "Hello" });
    })
    .err((error) => {
      console.log(error);
      return Response.json({ id: 404, text: "Not Found" });
    });
}
