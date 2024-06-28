import React from "react";
import Search from "../search/search";
import Sidebar from "../sidebar/sidebar";

import { Box, Center, Stack, Grid, GridItem } from "@chakra-ui/react";

function Home() {
  return (
    <Box p={4}>
      <Grid gap={6}>
        <GridItem rowSpan={2} colSpan={1}>
          <Sidebar />
        </GridItem>
        <GridItem rowSpan={2} colSpan={2}>
          <Stack>
            <Center>
              Search for Japanese songs. Lyrics available in Hiragana, Romanji,
              and Kanji.
            </Center>
            <Center>
              <Search />
            </Center>
          </Stack>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Home;
