import { NextResponse } from "next/server";
import { toKana, isRomaji } from "wanakana";
const Languages = require("languages.io");
const Genius = require("genius-lyrics");

import { auth } from "../../../auth";
import Song from "../../../model/Song";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const language = new Languages();
const Client = new Genius.Client();
const INTRO = "[Intro]";
const ROMANIZED = "romanized";
const ENGLISH = "english";

function parseHiragana(romaji) {
  const lines = romaji.split(/\n/);
  let parsedHiragana = "";
  lines.forEach((element) => {
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
      element = element.replace(/ wa /g, "ha");
      element = element.replace(/ o /g, "wo");
      parsedHiragana += " " + toKana(element);
    }
    parsedHiragana += "\n";
  });

  return parsedHiragana;
}

function findRomanizedSong(searches) {
  for (let i = 0; i < searches.length; i++) {
    if (searches[i].fullTitle.toLowerCase().includes(ROMANIZED)) {
      return searches[i];
    }
  }
}

function findKanjiSong(searches) {
  for (let i = 0; i < searches.length; i++) {
    if (
      !searches[i].fullTitle.toLowerCase().includes(ROMANIZED) &&
      !searches[i].fullTitle.toLowerCase().includes(ENGLISH)
    ) {
      return searches[i];
    }
  }
}

export async function GET(request) {
  const title = request.nextUrl.searchParams.get("title");
  const artist = request.nextUrl.searchParams.get("artist");

  try {
    let clientQuery = title + ", " + artist;
    let searches = await Client.songs.search(clientQuery);

    if (searches.length === 0) {
      return NextResponse.json({ id: 404, text: "Song not found" });
    }

    const kanjiSong = findKanjiSong(searches);
    const kanji = await kanjiSong.lyrics();

    clientQuery += ", " + ROMANIZED;
    searches = await Client.songs.search(clientQuery);

    const romanizedSong = findRomanizedSong(searches);

    const romaji = await romanizedSong.lyrics();

    const introIndex = romaji.indexOf(INTRO);
    const romajiToConvert = romaji.substring(introIndex);
    const parsedHiragana = parseHiragana(romajiToConvert);
    const hiragana = romaji.substring(0, introIndex) + "\n" + parsedHiragana;

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

export async function POST(request, response) {
  const session = await getServerSession(request, response, authOptions);

  if (!session?.user) {
    return new NextResponse.json({
      id: 500,
      text: "You are not authenticated.",
    });
  }

  await dbConnect();

  const { title, artist, hiragana, romaji, kanji } = await request.json();

  const query = {
      $set: {
        title: title,
        artist: artist,
        hiragana: hiragana,
        romaji: romaji,
        kanji: kanji,
      },
    },
    update = { expire: new Date() },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

  // Find the document

  try {
    await Song.findOneAndUpdate(query, update, options);
  } catch (err) {
    return NextResponse.json({
      id: 500,
      text: err,
    });
  }

  return NextResponse.json({
    id: 201,
    text: "Song has been updated",
  });
}
