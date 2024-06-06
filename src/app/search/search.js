import React, { useState } from "react";
import {
  Input,
  InputLeftAddon,
  InputGroup,
  Button,
  FormControl,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

function Search() {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const isError = input === "";

  return (
    <FormControl isInvalid={isError}>
      <InputGroup>
        <InputLeftAddon>
          <Button>
            <SearchIcon />
          </Button>
        </InputLeftAddon>
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Search for songs "
        />
      </InputGroup>
    </FormControl>
  );
}

export default Search;
