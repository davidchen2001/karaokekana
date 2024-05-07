import "./App.css";

import { ChakraProvider } from "@chakra-ui/react";

import Home from "./components/Home/Home.js";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Home />
      </ChakraProvider>
    </div>
  );
}

export default App;
