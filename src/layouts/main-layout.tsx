import React from "react";

import { Outlet } from "react-router-dom";
import { Unauthenticated } from "convex/react";
import { Authenticated } from "convex/react";
import { SignInButton } from "@clerk/clerk-react";
import { UserButton } from "@clerk/clerk-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/custom/AppSidebar";

export const MainLayout: React.FC = () => {
  return (
    <>
      <div>
        <Unauthenticated>
          <SignInButton />
        </Unauthenticated>
        <Authenticated>
          <SidebarProvider>
            <AppSidebar />
            <UserButton />
            <Outlet />
          </SidebarProvider>
        </Authenticated>
      </div>
    </>
  );
};
