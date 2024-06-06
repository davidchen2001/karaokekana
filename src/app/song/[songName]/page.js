import {
  Center,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tab,
} from "@chakra-ui/react";
import React from "react";

function Song(props) {
  return (
    <div>
      <Center>
        <Tabs>
          <TabList>
            <Tab>Hiragana</Tab>
            <Tab>Romanji</Tab>
            <Tab>Kanji</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>{props.hiragana}</TabPanel>
            <TabPanel>{props.romanji}</TabPanel>
            <TabPanel>{props.kanji}</TabPanel>
          </TabPanels>
        </Tabs>
      </Center>
    </div>
  );
}

export default Song;
