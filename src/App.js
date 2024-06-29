import "./App.css";

import { ChakraProvider } from "@chakra-ui/react";

import Home from "./app/home/home.js";
import About from "./app/about/about.js";

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
    path: "/about",
    element: <About />,
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
