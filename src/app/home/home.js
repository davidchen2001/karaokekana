import React from "react";
import Search from "../search/search";

import { HStack, SimpleGrid } from "@chakra-ui/react";

export default function home() {
  return (
    <div>
      Japanese lyrics available in Hiragana, Romanji, and Kanji
      <Search />
    </div>
  );
}
