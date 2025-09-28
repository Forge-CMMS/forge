"use client"

import { AppSidebar } from "@forge/ui/components/app-sidebar"
import { SiteHeader } from "@forge/ui/components/site-header"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@forge/ui/components/ui/sidebar"
import { Separator } from "@forge/ui/components/ui/separator"
import { Building2 } from "lucide-react"

// Simple header with only breadcrumbs
function BreadcrumbHeader() {
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
    </header>
  )
}

// Right sidebar component with consistent height
function RightSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      side="right"
      collapsible="none"
      className="sticky top-0 hidden h-screen border-l lg:flex"
      {...props}
    >
      <SidebarHeader className="h-16 border-b border-sidebar-border flex items-center px-4">
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Acme Corp</span>
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors text-left">
              Switch tenant ↓
            </button>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-0">
        <SidebarGroup className="p-0">
          <SidebarGroupContent className="p-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="h-10">
                  <span>Recent Activity</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="h-10">
                  <span>Notifications</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="h-10">
                  <span>Quick Actions</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t h-16 flex items-center px-4">
        <div className="flex items-center gap-2 w-full">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground flex-1">
            Tenant Panel
          </span>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
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
      <AppSidebar />
      <SidebarInset className="flex flex-col h-screen">
        <BreadcrumbHeader />
        <div className="flex-1 overflow-auto p-4">
          {children}
        </div>
        <MainContentFooter />
      </SidebarInset>
      <RightSidebar />
    </SidebarProvider>
  )
}