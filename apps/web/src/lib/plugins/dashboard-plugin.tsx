import * as React from 'react'
import { LayoutDashboard, TrendingUp } from 'lucide-react'
import { Dashboard } from '../../components/dashboard'
import type { Plugin } from '@forge/core'

// Dashboard overview component
const DashboardOverview: React.FC = () => {
  return <Dashboard />
}

// Dashboard analytics panel
const DashboardAnalytics: React.FC = () => {
  return (
    <div className="space-y-3">
      <div className="text-sm">
        <div className="flex justify-between mb-1">
          <span>Performance</span>
          <span className="text-green-600">+12%</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Efficiency</span>
          <span className="text-blue-600">87%</span>
        </div>
        <div className="flex justify-between">
          <span>Uptime</span>
          <span className="text-green-600">99.2%</span>
        </div>
      </div>
    </div>
  )
}

export function createDashboardPlugin(): Plugin {
  return {
    id: 'dashboard',
    name: 'Dashboard',
    version: '1.0.0',
    description: 'Main dashboard and overview',
    
    tabs: [
      {
        id: 'dashboard-overview',
        label: 'Overview',
        icon: LayoutDashboard,
        component: DashboardOverview,
        permissions: ['dashboard:read']
      }
    ],
    
    sidebarPanels: [
      {
        id: 'dashboard-analytics',
        title: 'Quick Analytics',
        icon: TrendingUp,
        component: DashboardAnalytics,
        collapsible: true,
        defaultCollapsed: false,
        permissions: ['dashboard:read']
      }
    ],
    
    navigationItems: [
      {
        id: 'dashboard-nav',
        label: 'Dashboard',
        icon: LayoutDashboard,
        url: '/dashboard',
        permissions: ['dashboard:read']
      }
    ],
    
    mainContent: [
      {
        id: 'dashboard-main',
        path: '/dashboard',
        component: DashboardOverview,
        permissions: ['dashboard:read']
      }
    ],
    
    initialize: async () => {
      console.log('Dashboard plugin initialized')
    }
  }
}