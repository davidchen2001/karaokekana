"use client";

import React from "react";

import Sidebar from "../../sidebar/sidebar";

import {
  Input,
  Textarea,
  VStack,
  Box,
  Grid,
  GridItem,
  Button,
} from "@chakra-ui/react";

function Submit() {
  return (
    <Box p={4}>
      <Grid gap={6}>
        <GridItem rowSpan={2} colSpan={1}>
          <Sidebar />
        </GridItem>
        <GridItem rowSpan={2} colSpan={2} ml={{ base: 0, md: 60 }} p="4">
          <VStack spacing={10}>
            <Input placeholder="song title" />
            <Input placeholder="song artist" />
            <Textarea placeholder="hiragana lyrics" />
            <Textarea placeholder="romaji lyrics" />
            <Textarea placeholder="kanji lyrics" />

            <Button
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="teal"
            >
              Submit
            </Button>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Submit;
