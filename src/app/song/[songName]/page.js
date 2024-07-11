"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../../sidebar/sidebar";

import {
  Center,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tab,
  Stack,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import { useParams } from "next/navigation";

function Song() {
  const params = useParams();

  const param = JSON.stringify(params["songName"]);
  const song = param.split("-")[0].replace('"', "");
  const artist = param.split("-")[1].replace('"', "");

  const [hiragana, setHiragana] = useState("");
  const [romaji, setRomaji] = useState("");
  const [kanji, setKanji] = useState("");

  function formatLyrics(lyrics) {
    const lines = lyrics.split("\n");
    let finalLyrics = [];
    lines.forEach((line) => {
      finalLyrics.push(<Text>{line}</Text>);
    });

    return finalLyrics;
  }

  useEffect(() => {
    const getData = async () => {
      const query = await fetch(`/api/song?title=${song}&artist=${artist}`);
      const response = await query.json();
      return response;
    };
    getData().then((data) => {
      const kanji = data.text.kanji;
      setKanji(kanji);

      if (data.text.romaji) {
        const romaji = data.text.romaji;
        setRomaji(romaji);
      }

      if (data.text.hiragana) {
        const hiragana = data.text.hiragana;
        setHiragana(hiragana);
      }
    });
  }, []);
  return (
    <Grid>
      <GridItem rowSpan={2} colSpan={1}>
        <Sidebar />
      </GridItem>
      <GridItem rowSpan={2} colSpan={2} ml={{ base: 0, md: 60 }} p="4">
        {romaji !== "" ? (
          <Center>
            <Tabs>
              <Center>
                <TabList>
                  <Tab>Hiragana</Tab>
                  <Tab>Romaji</Tab>
                  <Tab>Kanji</Tab>
                </TabList>
              </Center>

              <TabPanels>
                <Center>
                  <TabPanel>
                    <Stack>{formatLyrics(hiragana)}</Stack>
                  </TabPanel>
                </Center>
                <Center>
                  <TabPanel>
                    <Stack>{formatLyrics(romaji)}</Stack>
                  </TabPanel>
                </Center>
                <Center>
                  <TabPanel>{formatLyrics(kanji)}</TabPanel>
                </Center>
              </TabPanels>
            </Tabs>
          </Center>
        ) : (
          <Center>
            <Stack>{formatLyrics(kanji)}</Stack>
          </Center>
        )}
      </GridItem>
    </Grid>
  );
}

export default Song;
