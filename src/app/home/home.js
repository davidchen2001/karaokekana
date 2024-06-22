import React from "react";
import Search from "../search/search";

import { Box } from "@chakra-ui/react";

export default function home() {
  return (
    <Box p={4}>
      Japanese lyrics available in Hiragana, Romanji, and Kanji
      <Search />
    </Box>
  );
}
