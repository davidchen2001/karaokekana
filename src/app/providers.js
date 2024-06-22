// app/providers.tsx
"use client";

import { ChakraProvider, CSSReset } from "@chakra-ui/react";

export function Providers({ children }) {
  return (
    <ChakraProvider>
      <CSSReset />
      {children}
    </ChakraProvider>
  );
}
