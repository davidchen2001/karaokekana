"use client";

import React, { useEffect, useState } from "react";

import {
  Center,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tab,
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

  useEffect(() => {
    const getData = async () => {
      const query = await fetch(`/api/song?title=${song}&artist=${artist}`);
      const response = await query.json();
      return response;
    };
    getData().then((data) => {
      const kanji = data.text.kanji;
      const romaji = data.text.romaji;
      const hiragana = data.text.hiragana;
      setKanji(kanji);
      setRomaji(romaji);
      setHiragana(hiragana);
    });
  }, []);
  return (
    <div>
      <Center>
        <Tabs>
          <TabList>
            <Tab>Hiragana</Tab>
            <Tab>Romanji</Tab>
            <Tab>Kanji</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>{hiragana}</TabPanel>
            <TabPanel>{romaji}</TabPanel>
            <TabPanel>{kanji}</TabPanel>
          </TabPanels>
        </Tabs>
      </Center>
    </div>
  );
}

export default Song;
