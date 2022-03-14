import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Main from "./views/Main";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
}
