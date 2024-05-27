import "./App.css";

import { ChakraProvider } from "@chakra-ui/react";

import Home from "./components/Home/Home.js";
import Song from "./components/Song/Song.js";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/song",
    element: <Song />,
  },
]);

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </div>
  );
}

export default App;
