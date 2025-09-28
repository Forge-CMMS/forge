import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from '@forge/ui'
import { Plus, Search } from 'lucide-react'

const InventoryManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground">
            Manage your spare parts, supplies, and consumables inventory
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
          <CardDescription>
            Search and manage your inventory items
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                className="w-full pl-10 pr-4 py-2 border rounded-md"
                placeholder="Search inventory items..."
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
          
          <div className="space-y-3">
            {[
              { name: 'Brake Pads - Set of 4', sku: 'BP-001', quantity: 15, location: 'A1-B2', status: 'In Stock' },
              { name: 'Motor Oil 5W-30', sku: 'MO-530', quantity: 8, location: 'B2-C3', status: 'Low Stock' },
              { name: 'Air Filter', sku: 'AF-001', quantity: 0, location: 'C3-D1', status: 'Out of Stock' },
              { name: 'Spark Plugs - Set of 4', sku: 'SP-004', quantity: 25, location: 'A2-B1', status: 'In Stock' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Quantity</p>
                    <p className="font-medium">{item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{item.location}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        item.status === 'In Stock'
                          ? 'bg-green-100 text-green-700'
                          : item.status === 'Low Stock'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default InventoryManagement