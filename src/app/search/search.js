import React, { useState } from "react";

import { useForm } from "react-hook-form";
import {
  Input,
  InputGroup,
  Button,
  FormControl,
  VStack,
} from "@chakra-ui/react";

import { useRouter } from "next/navigation";

function Search() {
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleSongChange = (e) => {
    setSong(e.target.value);
  };

  const handleArtistChange = (e) => {
    setArtist(e.target.value);
  };

  const onSubmit = () => {
    const getData = async () => {
      const response = await fetch(`/api/song?title=${song}&artist=${artist}`, {
        method: "GET",
      });
      return response;
    };
    getData().then((data) => {
      console.log(data);
      const route = `${song}-${artist}`;
      router.push("song/" + route);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired>
        <InputGroup>
          <VStack align="stretch">
            <Input
              value={song}
              onChange={handleSongChange}
              placeholder="Search for song "
            />

            <Input
              value={artist}
              onChange={handleArtistChange}
              placeholder="Search for artist "
            />

            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Search
            </Button>
          </VStack>
        </InputGroup>
      </FormControl>
    </form>
  );
}

export default Search;
