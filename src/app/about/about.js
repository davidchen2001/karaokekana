"use client";

import React from "react";
import Sidebar from "../sidebar/sidebar";

import {
  Center,
  Text,
  Stack,
  Grid,
  GridItem,
  Container,
  VStack,
} from "@chakra-ui/react";

function About() {
  return (
    <Grid
      templateAreas={`
        "nav main"
        `}
    >
      <GridItem rowSpan={2} colSpan={1} area={"nav"}>
        <Sidebar />
      </GridItem>
      <GridItem rowSpan={2} colSpan={2} area={"main"}>
        <Stack spacing={3}>
          <Container>
            <Center>
              <Text fontSize="3xl">About</Text>
            </Center>
            <Center>
              <Stack>
                <Text fontSize="lg">
                  This tool was created to help make singing J-Pop easier. Most
                  karaoke systems outside of Japan don't support hiragana,
                  romaji, and furigana lyrics for J-Pop songs.
                </Text>
                <Text fontSize="lg">
                  While other sites have romaji and kanji lyrics available, I
                  haven't found a site that offers hiragana lyrics, which I
                  personally find easier to read than romaji.
                </Text>
              </Stack>
            </Center>
            <Center>
              <VStack>
                <Text fontSize="2xl">WIP Features and Fixes</Text>
                <Text fontSize="lg">
                  The Hiragana lyrics can be inaccurate for Katakana and will
                  sometimes translate English words.
                </Text>
              </VStack>
            </Center>
          </Container>
        </Stack>
      </GridItem>
    </Grid>
  );
}

export default About;
