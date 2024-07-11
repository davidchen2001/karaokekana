"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../../sidebar/sidebar";
import { useForm } from "react-hook-form";

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
  Button,
  HStack,
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

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  function formatLyrics(lyrics) {
    const lines = lyrics.split("\n");
    let finalLyrics = [];
    lines.forEach((line) => {
      finalLyrics.push(<Text>{line}</Text>);
    });

    return finalLyrics;
  }

  const onSubmit = () => {
    const reportBody = {
      title: song,
      artist: artist,
    };

    const postData = async () => {
      const response = await fetch(`/api/report`, {
        method: "POST",
        body: JSON.stringify(reportBody),
      });
      return response;
    };
    return new Promise((resolve) => {
      setTimeout(() => {
        postData().then((response) => {
          alert("Report has been successfully made.");
          reset();
        });
      }, 3000);
    });
  };

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

        <Center>
          <form onSubmit={handleSubmit(onSubmit)}>
            <HStack>
              <Text>Something wrong with the lyrics?</Text>
              <Button
                colorScheme="teal"
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
                type="submit"
              >
                Report
              </Button>
            </HStack>
          </form>
        </Center>
      </GridItem>
    </Grid>
  );
}

export default Song;
