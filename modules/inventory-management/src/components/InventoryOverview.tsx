import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@forge/ui'

const InventoryOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Inventory Overview</h1>
        <p className="text-muted-foreground">
          Manage your spare parts, supplies, and consumables
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">23</div>
            <p className="text-xs text-muted-foreground">
              Items need reordering
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">5</div>
            <p className="text-xs text-muted-foreground">
              Critical items
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231</div>
            <p className="text-xs text-muted-foreground">
              Total inventory value
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest inventory movements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Brake Pads - Set of 4</p>
                <p className="text-sm text-muted-foreground">Restocked: +20 units</p>
              </div>
              <div className="text-sm text-green-600">2 hours ago</div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Motor Oil 5W-30</p>
                <p className="text-sm text-muted-foreground">Used: -5 gallons</p>
              </div>
              <div className="text-sm text-muted-foreground">4 hours ago</div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Air Filter</p>
                <p className="text-sm text-muted-foreground">Restocked: +50 units</p>
              </div>
              <div className="text-sm text-green-600">Yesterday</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default InventoryOverview