import * as React from 'react'
import { Package, Settings, BarChart3 } from 'lucide-react'
import type { Plugin } from '@forge/core'

// Component definitions
const InventoryOverview = React.lazy(() => import('./components/InventoryOverview'))
const InventorySettings = React.lazy(() => import('./components/InventorySettings'))
const InventoryStats = React.lazy(() => import('./components/InventoryStats'))
const InventoryManagement = React.lazy(() => import('./components/InventoryManagement'))

// Plugin definition
export const InventoryPlugin: Plugin = {
  id: 'inventory-management',
  name: 'Inventory Management',
  version: '1.0.0',
  description: 'Manage spare parts, supplies, and consumables',
  dependencies: ['assets'], // Depends on assets for linking parts to equipment
  
  tabs: [
    {
      id: 'inventory-overview',
      label: 'Inventory',
      icon: Package,
      component: InventoryOverview,
      permissions: ['inventory:read', 'admin', 'manager', 'technician']
    }
  ],
  
  sidebarPanels: [
    {
      id: 'inventory-stats',
      title: 'Inventory Stats',
      icon: BarChart3,
      component: InventoryStats,
      collapsible: true,
      defaultCollapsed: false,
      permissions: ['inventory:read', 'admin', 'manager']
    },
    {
      id: 'inventory-settings',
      title: 'Inventory Settings',
      icon: Settings,
      component: InventorySettings,
      collapsible: true,
      defaultCollapsed: true,
      permissions: ['inventory:admin', 'admin']
    }
  ],
  
  navigationItems: [
    {
      id: 'inventory-nav',
      label: 'Inventory',
      icon: Package,
      url: '/inventory',
      permissions: ['inventory:read', 'admin', 'manager', 'technician']
    }
  ],
  
  mainContent: [
    {
      id: 'inventory-management',
      path: '/inventory',
      component: InventoryManagement,
      permissions: ['inventory:read', 'admin', 'manager', 'technician']
    }
  ],
  
  initialize: async () => {
    console.log('Inventory Management plugin initialized')
    // Initialize any necessary resources
  },
  
  cleanup: async () => {
    console.log('Inventory Management plugin cleaned up')
    // Clean up resources
  }
}