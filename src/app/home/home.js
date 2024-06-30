import React from "react";
import Search from "../search/search";
import Sidebar from "../sidebar/sidebar";

import {
  Box,
  Center,
  VStack,
  Grid,
  GridItem,
  Container,
} from "@chakra-ui/react";

function Home() {
  return (
    <Box p={4}>
      <Grid gap={6}>
        <GridItem rowSpan={2} colSpan={1}>
          <Sidebar />
        </GridItem>
        <GridItem rowSpan={2} colSpan={2} ml={{ base: 0, md: 60 }} p="4">
          <VStack spacing={5}>
            <Center mt={2}>
              Search for Japanese songs. Lyrics available in Hiragana, Romaji,
              and Kanji.
            </Center>
            <Center>
              <Search />
            </Center>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Home;
