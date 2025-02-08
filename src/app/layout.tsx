import * as React from "react";
import "./globals.css";
import { ConvexClientProvider } from "@/components/custom/providers/ConvexClientProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/custom/AppSidebar";
import { AppHeader } from "@/components/custom/AppHeader";

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
            <div className="w-full">
              <AppHeader children={<SidebarTrigger />} />
              <main>{children}</main>
            </div>
          </SidebarProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
