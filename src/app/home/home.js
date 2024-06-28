import React from "react";
import Search from "../search/search";

import { Box, Center, Stack } from "@chakra-ui/react";

export default function home() {
  return (
    <Box p={4}>
      <Stack>
        <Center>
          Search for Japanese songs. Lyrics available in Hiragana, Romanji, and
          Kanji
        </Center>
        <Center>
          <Search />
        </Center>
      </Stack>
    </Box>
  );
}
