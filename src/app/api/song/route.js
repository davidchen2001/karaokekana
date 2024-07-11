import { NextResponse } from "next/server";
import { toKana, isRomaji } from "wanakana";
import { Song } from "../../../model/Song";
import { getToken } from "next-auth/jwt";
import { dbConnect } from "../../../lib/db";
const Languages = require("languages.io");
const Genius = require("genius-lyrics");
const japaneseCharacters = require("japanese-characters");

const secret = process.env.NEXTAUTH_JWT_SECRET;

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

  await dbConnect();

  const query = {
    $match: {
      $or: [
        {
          title: {
            $regex: title,
            $options: "i",
          },
        },
        {
          artist: {
            $regex: artist,
            $options: "i",
          },
        },
      ],
    },
  };

  const song = await Song.aggregate([query]);

  if (song.length === 1) {
    return NextResponse.json({ id: 200, text: song[0] });
  } else {
    try {
      let clientQuery = title + ", " + artist;
      let searches = await Client.songs.search(clientQuery);

      if (searches.length === 0) {
        return NextResponse.json({ id: 404, text: "Song not found" });
      }

      const kanjiSong = findKanjiSong(searches);
      const kanji = await kanjiSong.lyrics();

      const kanaPresent = japaneseCharacters.presentIn(kanji);

      if (kanaPresent) {
        clientQuery += ", " + ROMANIZED;
        searches = await Client.songs.search(clientQuery);

        const romanizedSong = findRomanizedSong(searches);

        const romaji = await romanizedSong.lyrics();

        const introIndex = romaji.indexOf(INTRO);
        const romajiToConvert = romaji.substring(introIndex);
        const parsedHiragana = parseHiragana(romajiToConvert);
        const hiragana =
          romaji.substring(0, introIndex) + "\n" + parsedHiragana;

        const lyrics = {
          kanji: kanji,
          romaji: romaji,
          hiragana: hiragana,
        };

        return NextResponse.json({ id: 200, text: lyrics });
      } else {
        const lyrics = {
          kanji: kanji,
        };
        return NextResponse.json({ id: 200, text: lyrics });
      }
    } catch (err) {
      return NextResponse.json({ id: 500, text: err });
    }
  }
}

export async function POST(req, res) {
  const token = await getToken({ req, secret });

  if (!token) {
    return NextResponse.json({
      id: 401,
      text: "You are not authenticated.",
    });
  }

  await dbConnect();

  const { title, artist, hiragana, romaji, kanji } = await req.json();

  const filter = {
    title: title,
    artist: artist,
  };
  const update = { hiragana: hiragana, romaji: romaji, kanji: kanji };
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  // Find the document
  try {
    await Song.findOneAndUpdate(filter, update, options);
  } catch (err) {
    console.log(err);
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
