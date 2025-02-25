import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Index } from "@/pages/index";
import { MainLayout } from "@/layouts/main-layout";
import { ConvexProvider } from "convex/react";
import { ConvexReactClient } from "convex/react";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConvexProvider
      client={new ConvexReactClient(import.meta.env.VITE_CONVEX_URL)}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Index />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConvexProvider>
  </StrictMode>
);
