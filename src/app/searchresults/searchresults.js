import { Heading } from "@chakra-ui/react";
import React from "react";

function SearchResults(props) {
  return (
    <div>
      <Heading>{props.title}</Heading>
      <Heading as="h5" size="sm">
        All Results
      </Heading>
    </div>
  );
}

export default SearchResults;
