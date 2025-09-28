"use client"

import * as React from 'react'
import { pluginRegistry } from '@forge/core'
import type { NavItem } from '@forge/core'
import type { UserPermissions } from '@forge/core'
import { Button } from '../components/ui/button'
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '../components/ui/sidebar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../components/ui/collapsible'
import { ChevronRight } from 'lucide-react'

interface DynamicNavigationProps {
  userPermissions?: UserPermissions
  onNavigate?: (path: string) => void
}

export function DynamicNavigation({ 
  userPermissions, 
  onNavigate 
}: DynamicNavigationProps) {
  const [navItems, setNavItems] = React.useState<NavItem[]>([])

  React.useEffect(() => {
    const updateNavItems = () => {
      const pluginNavItems = pluginRegistry.getNavigationItems(userPermissions)
      setNavItems(pluginNavItems)
    }

    updateNavItems()
    const unsubscribe = pluginRegistry.subscribe(updateNavItems)
    
    return unsubscribe
  }, [userPermissions])

  const handleNavigate = (item: NavItem) => {
    if (item.url && onNavigate) {
      onNavigate(item.url)
    }
  }

  const renderNavItem = (item: NavItem) => {
    const Icon = item.icon

    if (!item.items || item.items.length === 0) {
      return (
        <SidebarMenuItem key={item.id}>
          <SidebarMenuButton 
            onClick={() => handleNavigate(item)}
            className="w-full justify-start"
          >
            {Icon && <Icon className="h-4 w-4" />}
            <span>{item.label}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )
    }

    return (
      <Collapsible key={item.id} className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className="w-full justify-start">
              {Icon && <Icon className="h-4 w-4" />}
              <span>{item.label}</span>
              <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items.map((subItem) => (
                <SidebarMenuSubItem key={subItem.id}>
                  <SidebarMenuSubButton 
                    onClick={() => handleNavigate(subItem)}
                    className="w-full justify-start"
                  >
                    {subItem.icon && <subItem.icon className="h-4 w-4" />}
                    <span>{subItem.label}</span>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    )
  }

  if (navItems.length === 0) {
    return null
  }

  return (
    <SidebarMenu>
      {navItems.map(renderNavItem)}
    </SidebarMenu>
  )
}