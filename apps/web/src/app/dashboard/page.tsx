import { ChartAreaInteractive } from "@forge/ui/components/chart-area-interactive"
import { DataTable } from "@forge/ui/components/data-table"
import { SectionCards } from "@forge/ui/components/section-cards"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@forge/ui/components/ui/breadcrumb"
import { Separator } from "@forge/ui/components/ui/separator"
import { SidebarTrigger } from "@forge/ui/components/ui/sidebar"

// Import the data
import data from "./data.json"

export default function DashboardPage() {
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
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
    </>
  )
}