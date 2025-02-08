import * as React from "react";
import "./globals.css";

export const metadata = {
  title: "Snippet Manager",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
};

export default RootLayout;
