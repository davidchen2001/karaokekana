import { useState } from "react";
import {
  Flex,
  Input,
  Button,
  InputGroup,
  Stack,
  Box,
  FormControl,
  InputRightElement,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import Sidebar from "../sidebar/sidebar";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Box p={4}>
      <Grid gap={6}>
        <GridItem rowSpan={2} colSpan={1}>
          <Sidebar />
        </GridItem>
        <GridItem rowSpan={2} colSpan={2} ml={{ base: 0, md: 60 }} p="4">
          <Flex flexDirection="column" width="100wh" height="100vh">
            <Stack
              flexDir="column"
              mb="2"
              justifyContent="center"
              alignItems="center"
            >
              <Box minW={{ base: "90%", md: "468px" }}>
                <form>
                  <Stack
                    spacing={4}
                    p="1rem"
                    backgroundColor="whiteAlpha.900"
                    boxShadow="md"
                  >
                    <FormControl>
                      <InputGroup>
                        <Input placeholder="Username" />
                      </InputGroup>
                    </FormControl>
                    <FormControl>
                      <InputGroup>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                        />
                        <InputRightElement width="4.5rem">
                          <Button
                            h="1.75rem"
                            size="sm"
                            onClick={handleShowClick}
                          >
                            {showPassword ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <Button
                      borderRadius={0}
                      type="submit"
                      variant="solid"
                      colorScheme="teal"
                      width="full"
                    >
                      Login
                    </Button>
                  </Stack>
                </form>
              </Box>
            </Stack>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Login;
