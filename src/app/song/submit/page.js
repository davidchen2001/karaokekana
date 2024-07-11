"use client";

import React, { useState, useEffect } from "react";
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
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  Td,
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

  const [reports, setReports] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const query = await fetch(`/api/report`);
      const response = await query.json();
      return response;
    };
    getData().then((data) => {
      const reports = data.text;

      setReports(reports);
    });
  }, []);

  const onDeleteSubmit = (title, artist) => {
    const body = {
      title: title,
      artist: artist,
    };
    const deleteSong = async () => {
      const response = await fetch(`/api/report`, {
        method: "DELETE",
        body: JSON.stringify(body),
      });
      return response;
    };
    return new Promise((resolve) => {
      setTimeout(() => {
        deleteSong().then((response) => {
          alert("Song has been successfully deleted");
          reset();
        });
      }, 3000);
    });
  };

  const generateReports = (reports) => {
    let reportsRow = [];

    reports.forEach((report) => {
      reportsRow.push(
        <Tr>
          <Td>{report.title}</Td>
          <Td>{report.artist}</Td>
          <Td>
            <Button
              onClick={() =>
                handleSubmit(onDeleteSubmit(report.title, report.artist))
              }
              isDisabled={isSubmitting}
              isSubmitting={isSubmitting}
            >
              Delete
            </Button>
          </Td>
        </Tr>
      );
    });

    return reportsRow;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = () => {
    const postData = async () => {
      const response = await fetch(`/api/song`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response;
    };
    return new Promise((resolve) => {
      setTimeout(() => {
        postData().then((response) => {
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
              <TableContainer>
                <Table>
                  <TableCaption>List of Reports</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Song Title</Th>
                      <Th>Song Artist </Th>
                      <Th> Delete</Th>
                    </Tr>
                  </Thead>
                  <Tbody>{generateReports(reports)}</Tbody>
                </Table>
              </TableContainer>
            </VStack>
          </form>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Submit;
