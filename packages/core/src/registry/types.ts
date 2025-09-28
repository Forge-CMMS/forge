import * as React from 'react'

export interface TabDefinition {
  id: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  component: React.ComponentType
  permissions?: string[]
}

export interface PanelDefinition {
  id: string
  title: string
  icon?: React.ComponentType<{ className?: string }>
  component: React.ComponentType
  collapsible?: boolean
  defaultCollapsed?: boolean
  permissions?: string[]
}

export interface NavItem {
  id: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  url?: string
  items?: NavItem[]
  permissions?: string[]
}

export interface ContentDefinition {
  id: string
  path: string
  component: React.ComponentType
  permissions?: string[]
}

export interface Plugin {
  id: string
  name: string
  version: string
  description?: string
  dependencies?: string[]
  tabs?: TabDefinition[]
  sidebarPanels?: PanelDefinition[]
  navigationItems?: NavItem[]
  mainContent?: ContentDefinition[]
  initialize?: () => Promise<void>
  cleanup?: () => Promise<void>
}

export interface PluginHooks {
  onTabChange?: (tabId: string) => void
  onPanelToggle?: (panelId: string, collapsed: boolean) => void
  onNavigate?: (path: string) => void
}

export interface PluginState {
  loaded: boolean
  enabled: boolean
  error?: Error
  hooks?: PluginHooks
}