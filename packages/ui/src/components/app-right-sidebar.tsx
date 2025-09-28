"use client"

import * as React from "react"
import { Building2, ListIcon, MessageCircle, Factory, Store, Wrench } from "lucide-react"

import { TenantSwitcher } from "./tenant-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "./ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

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

export function AppRightSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      side="right"
      collapsible="offcanvas"
      {...props}
    >
      <SidebarHeader className="h-16 border-b border-sidebar-border flex items-center justify-center px-4">
        <TenantSwitcher tenants={tenants} />
      </SidebarHeader>
      
      <Tabs className="flex-1 flex flex-col" defaultValue="treeview">
        <SidebarContent className="p-0">
          <TabsContent value="treeview" className="w-full p-4 text-sm text-muted-foreground">
            Settings content goes here.
          </TabsContent>
          <TabsContent value="help" className="w-full p-4 text-sm text-muted-foreground">
            Help content goes here.
          </TabsContent>  
        </SidebarContent>
        
        <SidebarFooter className="border-t h-16 flex items-center px-4">
          <TabsList className="w-full">
            <TabsTrigger value="treeview" className="w-full justify-center">
              <ListIcon className="mr-2 size-4" />
            </TabsTrigger>
            <TabsTrigger value="help" className="w-full justify-center">
              <MessageCircle className="mr-2 size-4" />
            </TabsTrigger>
          </TabsList>
        </SidebarFooter>
      </Tabs>

      <SidebarRail side="right" />
    </Sidebar>
  )
}
