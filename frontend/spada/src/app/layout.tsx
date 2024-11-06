import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import "../styles/global.css";

export const metadata = {
  title: "SPADA",
  description: "Generated by Next.js",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />
          <main className='w-full m-4'>
            {children}
          </main>
        </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};