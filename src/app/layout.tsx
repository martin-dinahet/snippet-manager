import * as React from "react";
import "./globals.css";
import { ConvexClientProvider } from "@/components/custom/providers/ConvexClientProvider";

export const metadata = {
  title: "Snippet Manager",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className="antialiased w-screen min-h-screen overflow-x-hidden">
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
