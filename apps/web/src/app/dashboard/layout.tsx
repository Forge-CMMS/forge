"use client"

import { AppSidebar } from "@forge/ui/components/app-sidebar"
import { SiteHeader } from "@forge/ui/components/site-header"
import { TenantSwitcher } from "@forge/ui/components/tenant-switcher"
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
import { Building2, ListIcon, MessageCircle, Factory, Store, Wrench } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@forge/ui/components/ui/tabs"

// Mock tenant data
const tenants = [
  {
    name: "Acme Manufacturing",
    logo: Factory,
    plan: "Enterprise",
  },
  {
    name: "Global Retail Corp",
    logo: Store,
    plan: "Professional",
  },
  {
    name: "Tech Solutions Inc",
    logo: Wrench,
    plan: "Professional",
  },
]

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
      className="sticky top-0 hidden h-screen border-l xl:flex w-80 shrink-0"
      {...props}
    >
      <SidebarHeader className="h-16 border-b border-sidebar-border flex items-center justify-center px-4">
        <TenantSwitcher tenants={tenants} />
      </SidebarHeader>
        <Tabs className="flex-1 flex flex-col" defaultValue="settings">

      <SidebarContent className="p-0">
        <TabsContent value="settings" className="w-full p-4 text-sm text-muted-foreground">
              Settings content goes here.
            </TabsContent>
            <TabsContent value="help" className="w-full p-4 text-sm text-muted-foreground">
              Help content goes here.
            </TabsContent>  
      </SidebarContent>
      <SidebarFooter className="border-t h-16 flex items-center px-4">
            <TabsList className="w-full">
              <TabsTrigger value="settings" className="w-full justify-center">
                <ListIcon className="mr-2 size-4" />
              </TabsTrigger>
              <TabsTrigger value="help" className="w-full justify-center">
                <MessageCircle className="mr-2 size-4" />
              </TabsTrigger>
            </TabsList>
                
      </SidebarFooter>
        </Tabs>

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
      <div className="grid grid-cols-[auto_1fr_auto] h-screen w-screen overflow-hidden">
        <AppSidebar />
        <SidebarInset className="flex flex-col h-screen min-w-0">
          <BreadcrumbHeader />
          <div className="flex-1 overflow-auto p-4">
            {children}
          </div>
          <MainContentFooter />
        </SidebarInset>
        <RightSidebar />
      </div>
    </SidebarProvider>
  )
}