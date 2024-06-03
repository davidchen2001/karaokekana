const accessToken = process.env.GENIUS_ACCESS_TOKEN;

import { NextResponse } from "next/server";
import { getLyrics, getSong } from "genius-lyrics-api";
import { convert } from "jp-conversion";

import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";

const kuroshiro = new Kuroshiro();

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
    const kanji = await getLyrics(options);
    await kuroshiro.init(new KuromojiAnalyzer());

    const hiragana = await kuroshiro.convert(kanji, {
      to: "hiragana",
    });

    const romaji = await kuroshiro.convert(kanji, {
      to: "romaji",
    });

    const lyrics = {
      kanji: kanji,
      hiragana: hiragana,
      romanji: romaji,
    };

    return NextResponse.json({ id: 200, text: lyrics });
  } catch (err) {
    return NextResponse.json({ id: 500, text: err });
  }
}
