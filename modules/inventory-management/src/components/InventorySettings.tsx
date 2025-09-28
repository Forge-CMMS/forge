import * as React from 'react'
import { Button } from '@forge/ui'

const InventorySettings: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Reorder Settings</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Auto-reorder</span>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
          <div className="flex justify-between text-sm">
            <span>Low stock alerts</span>
            <Button variant="outline" size="sm">Setup</Button>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Categories</h4>
        <Button variant="outline" size="sm" className="w-full">
          Manage Categories
        </Button>
      </div>
    </div>
  )
}

export default InventorySettings