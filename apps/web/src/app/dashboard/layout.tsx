"use client"

import { AppSidebar } from "@forge/ui/components/app-sidebar"
import { AppRightSidebar } from "@forge/ui/components/app-right-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@forge/ui/components/ui/sidebar"
import { Button } from "@forge/ui/components/ui/button"
import { Separator } from "@forge/ui/components/ui/separator"
import { Building2, PanelRight } from "lucide-react"
import * as React from "react"

// Simple header with only breadcrumbs
function BreadcrumbHeader() {
  const { toggleRightSidebar } = useSidebar()
  
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        {/* Breadcrumbs will go here - can be passed as props or context */}
        <div className="text-sm text-muted-foreground">
          Dashboard / Overview
        </div>
      </div>
      <div className="ml-auto">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={toggleRightSidebar}
        >
          <PanelRight className="h-4 w-4" />
          <span className="sr-only">Toggle Right Sidebar</span>
        </Button>
      </div>
    </header>
  )
}

// Main content footer component with consistent height
function MainContentFooter() {
  return (
    <footer className="sticky bottom-0 border-t bg-background h-16 flex items-center px-6">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">&copy; 2024 Forge CMMS. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-4">
          <a href="/help" className="text-sm text-muted-foreground hover:text-foreground">Help</a>
          <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy</a>
          <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms</a>
        </div>
      </div>
    </footer>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="grid grid-cols-[auto_1fr_auto] h-screen w-screen overflow-hidden">
        <AppSidebar />
        <SidebarInset className="flex flex-col h-screen min-w-0">
          <BreadcrumbHeader />
          <div className="flex-1 overflow-auto p-4">
            {children}
          </div>
          <MainContentFooter />
        </SidebarInset>
        <AppRightSidebar />
      </div>
    </SidebarProvider>
  )
}