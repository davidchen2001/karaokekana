const accessToken = process.env.GENIUS_ACCESS_TOKEN;

import { NextResponse } from "next/server";
import { getLyrics } from "genius-lyrics-api";
import { toKana } from "wanakana";
const Languages = require("languages.io");
const language = new Languages();

const Genius = require("genius-lyrics");
const Client = new Genius.Client();
const INTRO = "[Intro]";

function parseHiragana(romaji) {
  const words = romaji.split(/\n/);
  let parsedHiragana = "";
  words.forEach((element) => {
    if (
      element.includes("[") ||
      element.includes("]") ||
      language.isEnglish(element)
    ) {
      if (element.includes("(") && element.includes(")")) {
        parsedHiragana += toKana(element.substring(0, element.indexOf("(")));
        parsedHiragana += element.substring(
          element.indexOf("("),
          element.indexOf(")")
        );
        parsedHiragana += toKana(
          element.substring(element.indexOf(")"), element.length)
        );
      } else {
        parsedHiragana += " " + element;
      }
    } else {
      parsedHiragana += " " + toKana(element);
    }
  });

  return parsedHiragana;
}

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

    const searches = await Client.songs.search(title);
    const firstSong = searches[0];

    const romaji = await firstSong.lyrics();

    const introIndex = romaji.indexOf(INTRO);
    const romajiToConvert = romaji.substring(introIndex);
    const hiragana = parseHiragana(romajiToConvert);

    const lyrics = {
      kanji: kanji,
      romaji: romaji,
      hiragana: hiragana,
    };

    return NextResponse.json({ id: 200, text: lyrics });
  } catch (err) {
    return NextResponse.json({ id: 500, text: err });
  }
}
