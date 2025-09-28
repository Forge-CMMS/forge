"use client"

import * as React from 'react'
import { DynamicLayout } from "../../components/DynamicLayout"
import { initializePlugins } from "../../lib/plugin-init"
import { ChartAreaInteractive } from "@forge/ui/components/chart-area-interactive"
import { DataTable } from "@forge/ui/components/data-table"

// Import the existing data
import data from "./data.json"

// Default dashboard content when no plugins provide tabs
function DefaultDashboardContent() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50 md:col-span-2">
          <ChartAreaInteractive />
        </div>
        <div className="aspect-video rounded-xl bg-muted/50">
          <div className="p-4">
            <h3 className="font-semibold">Quick Stats</h3>
            <p className="text-sm text-muted-foreground">
              Key metrics at a glance
            </p>
          </div>
        </div>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
        <DataTable data={data} />
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [pluginsInitialized, setPluginsInitialized] = React.useState(false)
  
  React.useEffect(() => {
    const init = async () => {
      try {
        await initializePlugins()
        setPluginsInitialized(true)
      } catch (error) {
        console.error('Failed to initialize plugins:', error)
        setPluginsInitialized(true) // Still show UI even if plugins fail
      }
    }
    
    init()
  }, [])

  if (!pluginsInitialized) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-muted-foreground">Loading plugins...</p>
        </div>
      </div>
    )
  }

  return (
    <DynamicLayout currentPath="/dashboard">
      <DefaultDashboardContent />
    </DynamicLayout>
  )
}