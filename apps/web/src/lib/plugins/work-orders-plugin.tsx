import * as React from 'react'
import { Wrench, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from '@forge/ui/components'
import type { Plugin } from '@forge/core'

// Work Orders overview component
const WorkOrdersOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Work Orders</h1>
        <p className="text-muted-foreground">
          Track and manage maintenance requests
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Open</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">
              Active work orders
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">15</div>
            <p className="text-xs text-muted-foreground">
              Currently being worked on
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">4</div>
            <p className="text-xs text-muted-foreground">
              Past due date
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">156</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Work Orders</CardTitle>
          <CardDescription>Latest maintenance requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: 'WO-001', title: 'Replace HVAC Filter', priority: 'medium', status: 'open', assignee: 'John Doe' },
              { id: 'WO-002', title: 'Fix Conveyor Belt', priority: 'high', status: 'in_progress', assignee: 'Jane Smith' },
              { id: 'WO-003', title: 'Lubricate Machinery', priority: 'low', status: 'completed', assignee: 'Bob Johnson' },
            ].map((wo) => (
              <div key={wo.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{wo.title}</p>
                  <p className="text-sm text-muted-foreground">{wo.id} • Assigned to {wo.assignee}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={wo.priority === 'high' ? 'destructive' : wo.priority === 'medium' ? 'default' : 'secondary'}
                  >
                    {wo.priority}
                  </Badge>
                  <Badge variant="outline">
                    {wo.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Work order quick stats panel
const WorkOrderStats: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Today's Tasks:</span>
          <span className="font-medium">8</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Due This Week:</span>
          <span className="font-medium text-amber-600">23</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Overdue:</span>
          <span className="font-medium text-red-600">4</span>
        </div>
      </div>
      
      <div className="pt-2 border-t">
        <div className="space-y-1">
          <div className="text-xs font-medium">By Priority</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Critical</span>
              <span className="text-red-600">2</span>
            </div>
            <div className="flex justify-between">
              <span>High</span>
              <span className="text-amber-600">6</span>
            </div>
            <div className="flex justify-between">
              <span>Medium</span>
              <span>15</span>
            </div>
            <div className="flex justify-between">
              <span>Low</span>
              <span>5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function createWorkOrdersPlugin(): Plugin {
  return {
    id: 'work-orders',
    name: 'Work Orders',
    version: '1.0.0',
    description: 'Manage maintenance work orders',
    dependencies: ['assets'], // Work orders depend on assets
    
    tabs: [
      {
        id: 'work-orders-overview',
        label: 'Work Orders',
        icon: Wrench,
        component: WorkOrdersOverview,
        permissions: ['workorder:read', 'admin', 'manager', 'technician']
      }
    ],
    
    sidebarPanels: [
      {
        id: 'work-order-stats',
        title: 'Work Order Stats',
        icon: Clock,
        component: WorkOrderStats,
        collapsible: true,
        defaultCollapsed: false,
        permissions: ['workorder:read', 'admin', 'manager', 'technician']
      }
    ],
    
    navigationItems: [
      {
        id: 'work-orders-nav',
        label: 'Work Orders',
        icon: Wrench,
        url: '/work-orders',
        permissions: ['workorder:read', 'admin', 'manager', 'technician']
      }
    ],
    
    mainContent: [
      {
        id: 'work-orders-main',
        path: '/work-orders',
        component: WorkOrdersOverview,
        permissions: ['workorder:read', 'admin', 'manager', 'technician']
      }
    ],
    
    initialize: async () => {
      console.log('Work Orders plugin initialized')
    }
  }
}