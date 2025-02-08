import * as React from "react";
import "./globals.css";
import { ConvexClientProvider } from "@/components/custom/providers/ConvexClientProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/custom/AppSidebar";

export const metadata = {
  title: "Snippet Manager",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className="antialiased w-screen min-h-screen overflow-x-hidden">
        <ConvexClientProvider>
          <SidebarProvider>
            <AppSidebar />
            <main>{children}</main>
          </SidebarProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
