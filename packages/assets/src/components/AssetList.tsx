"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@forge/ui/components/card"
import { Button } from "@forge/ui/components/button"
import { Package, MapPin, Settings, Wrench } from "lucide-react"

export function AssetList() {
  const [assets] = React.useState([
    {
      id: "1",
      name: "Compressor Unit A",
      asset_number: "COMP-001",
      category: "HVAC",
      location: "Building 1 - Basement",
      status: "active",
      last_maintenance: "2024-01-15",
    },
    {
      id: "2",
      name: "Elevator #1",
      asset_number: "ELEV-001",
      category: "Transportation",
      location: "Building 1 - Main Floor",
      status: "maintenance",
      last_maintenance: "2024-01-20",
    },
    {
      id: "3",
      name: "Generator Unit B",
      asset_number: "GEN-002",
      category: "Power",
      location: "Building 2 - Roof",
      status: "active",
      last_maintenance: "2024-01-10",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100"
      case "maintenance":
        return "text-yellow-600 bg-yellow-100"
      case "inactive":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Package className="h-4 w-4" />
      case "maintenance":
        return <Wrench className="h-4 w-4" />
      case "inactive":
        return <Settings className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Asset Management</h1>
          <p className="text-muted-foreground">
            Manage your equipment, machinery, and facilities
          </p>
        </div>
        <Button>Add New Asset</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {assets.map((asset) => (
          <Card key={asset.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{asset.name}</CardTitle>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                    asset.status
                  )}`}
                >
                  {getStatusIcon(asset.status)}
                  {asset.status}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {asset.asset_number}
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Category:</span>
                <span>{asset.category}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Location:</span>
                <span>{asset.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Wrench className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Last Maintenance:</span>
                <span>{asset.last_maintenance}</span>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}