"use client"

import { AppSidebar } from "@forge/ui/components/app-sidebar"
import { SiteHeader } from "@forge/ui/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@forge/ui/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar variant="sidebar"/>
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}