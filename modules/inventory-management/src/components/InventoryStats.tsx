import * as React from 'react'

const InventoryStats: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Available Items:</span>
          <span className="font-medium">1,211</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Reserved:</span>
          <span className="font-medium text-amber-600">23</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>On Order:</span>
          <span className="font-medium text-blue-600">156</span>
        </div>
      </div>
      
      <div className="pt-2 border-t">
        <div className="space-y-1">
          <div className="text-xs font-medium">Top Categories</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Filters</span>
              <span>234</span>
            </div>
            <div className="flex justify-between">
              <span>Oils & Fluids</span>
              <span>189</span>
            </div>
            <div className="flex justify-between">
              <span>Belts & Hoses</span>
              <span>145</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InventoryStats