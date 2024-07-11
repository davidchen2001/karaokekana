"use client";

import React, { useState } from "react";
import Sidebar from "../../sidebar/sidebar";
import { useForm } from "react-hook-form";

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
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [data, setData] = useState({
    title: "",
    artist: "",
    hiragana: "",
    romaji: "",
    kanji: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = () => {
    const getData = async () => {
      const response = await fetch(`/api/song`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response;
    };
    return new Promise((resolve) => {
      setTimeout(() => {
        getData().then((response) => {
          alert("Song has been successfully updated");
          reset();
        });
      }, 3000);
    });
  };

  return (
    <Box p={4}>
      <Grid gap={6}>
        <GridItem rowSpan={2} colSpan={1}>
          <Sidebar />
        </GridItem>
        <GridItem rowSpan={2} colSpan={2} ml={{ base: 0, md: 60 }} p="4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={10}>
              <Input
                name="title"
                placeholder="song title"
                value={data.title}
                onChange={handleChange}
                isRequired
              />
              <Input
                name="artist"
                placeholder="song artist"
                value={data.artist}
                onChange={handleChange}
                isRequired
              />
              <Textarea
                name="hiragana"
                placeholder="hiragana lyrics"
                value={data.hiragana}
                onChange={handleChange}
                isRequired
              />
              <Textarea
                name="romaji"
                placeholder="romaji lyrics"
                value={data.romaji}
                onChange={handleChange}
                isRequired
              />
              <Textarea
                name="kanji"
                placeholder="kanji lyrics"
                value={data.kanji}
                onChange={handleChange}
                isRequired
              />

              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
              >
                Submit
              </Button>
            </VStack>
          </form>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Submit;
