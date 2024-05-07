import React from "react";
import Search from "../Search/Search";

import { HStack, SimpleGrid } from "@chakra-ui/react";

function Home() {
  return (
    <div>
      Japanese lyrics available in Hiragana, Romanji, and Kanji
      <Search />
    </div>
  );
}

export default Home;
