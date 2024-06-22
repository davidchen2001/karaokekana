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
  const [romanji, setRomanji] = useState("");
  const [kanji, setKanji] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`/api/song?title=${song}&artist=${artist}`);
      return response;
    };
    getData().then((data) => {
      console.log(data);

      const { hiragana, romanji, kanji } = data["text"];
      setHiragana(hiragana);
      setRomanji(romanji);
      setKanji(kanji);
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
            <TabPanel>{romanji}</TabPanel>
            <TabPanel>{kanji}</TabPanel>
          </TabPanels>
        </Tabs>
      </Center>
    </div>
  );
}

export default Song;
