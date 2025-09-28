import * as React from 'react'
import { Package, Settings } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Button } from '@forge/ui/components'
import type { Plugin } from '@forge/core'

// Assets overview component
const AssetsOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Assets Overview</h1>
        <p className="text-muted-foreground">
          Manage your equipment and facilities
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">432</div>
            <p className="text-xs text-muted-foreground">
              +8 added this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Maintenance Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">12</div>
            <p className="text-xs text-muted-foreground">
              Requiring attention
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Out of Service</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-muted-foreground">
              Critical issues
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Assets settings panel
const AssetSettings: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Asset Management</h4>
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start">
            Asset Categories
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            Maintenance Schedules
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            Asset Locations
          </Button>
        </div>
      </div>
    </div>
  )
}

export function createAssetsPlugin(): Plugin {
  return {
    id: 'assets',
    name: 'Asset Management',
    version: '1.0.0',
    description: 'Manage equipment and facilities',
    
    tabs: [
      {
        id: 'assets-overview',
        label: 'Assets',
        icon: Package,
        component: AssetsOverview,
        permissions: ['asset:read', 'admin', 'manager', 'technician']
      }
    ],
    
    sidebarPanels: [
      {
        id: 'asset-settings',
        title: 'Asset Settings',
        icon: Settings,
        component: AssetSettings,
        collapsible: true,
        defaultCollapsed: true,
        permissions: ['asset:admin', 'admin']
      }
    ],
    
    navigationItems: [
      {
        id: 'assets-nav',
        label: 'Assets',
        icon: Package,
        url: '/assets',
        permissions: ['asset:read', 'admin', 'manager', 'technician']
      }
    ],
    
    mainContent: [
      {
        id: 'assets-main',
        path: '/assets',
        component: AssetsOverview,
        permissions: ['asset:read', 'admin', 'manager', 'technician']
      }
    ],
    
    initialize: async () => {
      console.log('Assets plugin initialized')
    }
  }
}