import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Skeleton from "./components/custom/Skeleton.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <React.Suspense fallback={<Skeleton />}>
      <BrowserRouter>
        <QueryClientProvider client={client}>
          <App />
          <ReactQueryDevtools
            initialIsOpen={true}
            buttonPosition="bottom-left"
          />
        </QueryClientProvider>
      </BrowserRouter>
    </React.Suspense>
  </React.StrictMode>
);
