import React from "react";
import { Input, InputLeftAddon, InputGroup, Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

function Search() {
  return (
    <div>
      <InputGroup>
        <InputLeftAddon>
          <Button>
            <SearchIcon />
          </Button>
        </InputLeftAddon>
        <Input placeholder="Search lyrics " />
      </InputGroup>
    </div>
  );
}

export default Search;
