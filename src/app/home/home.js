import React from "react";
import Search from "../search/search";
import Sidebar from "../sidebar/sidebar";

import { Box, Center, VStack, Grid, GridItem, Text } from "@chakra-ui/react";

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
              <Text fontSize="md">
                Search for Japanese songs. Lyrics available in Hiragana, Romaji,
                and Kanji.
              </Text>
            </Center>
            <Text fontSize="md">
              Searching for non-Japanese songs is also supported.
            </Text>
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
