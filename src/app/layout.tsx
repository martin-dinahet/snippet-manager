import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/custom/AppSidebar";
import { SnippetsProvider } from "@/components/custom/SnippetsProvider";
import { AppHeader } from "@/components/custom/AppHeader";

import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html>
      <body className="w-screen min-h-screen">
        <SnippetsProvider>
          <SidebarProvider>
            <AppSidebar />
            <div className="w-full">
              <AppHeader>
                <SidebarTrigger />
              </AppHeader>
              <main>{children}</main>
            </div>
          </SidebarProvider>
        </SnippetsProvider>
      </body>
    </html>
  );
};

export default RootLayout;
