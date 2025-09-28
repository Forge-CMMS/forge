"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@forge/ui/components/card"
import { Button } from "@forge/ui/components/button"
import { Settings, Users, Wrench, FileText, BarChart3, Plus } from "lucide-react"

export function Dashboard() {
  const modules = [
    {
      id: "assets",
      name: "Asset Management",
      description: "Manage equipment, machinery, and facilities",
      icon: Wrench,
      color: "bg-blue-500",
    },
    {
      id: "work-orders",
      name: "Work Orders",
      description: "Create and track maintenance requests",
      icon: FileText,
      color: "bg-green-500",
    },
    {
      id: "reporting",
      name: "Reports & Analytics",
      description: "View performance metrics and reports",
      icon: BarChart3,
      color: "bg-purple-500",
    },
    {
      id: "users",
      name: "User Management",
      description: "Manage users and permissions",
      icon: Users,
      color: "bg-orange-500",
    },
  ]

  const quickStats = [
    { label: "Active Assets", value: "1,234", change: "+12%" },
    { label: "Open Work Orders", value: "56", change: "-8%" },
    { label: "Completed This Month", value: "89", change: "+23%" },
    { label: "Average Response Time", value: "2.4h", change: "-15%" },
  ]

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <Wrench className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold">Forge CMMS</h1>
              <p className="text-xs text-muted-foreground">Maintenance Platform</p>
            </div>
          </div>
        </div>
        <nav className="p-4 space-y-2">
          {modules.map((module) => {
            const Icon = module.icon
            return (
              <Button
                key={module.id}
                variant="ghost"
                className="w-full justify-start"
              >
                <Icon className="mr-2 h-4 w-4" />
                {module.name}
              </Button>
            )
          })}
          <div className="pt-4 border-t">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">
              Welcome to your maintenance management platform
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Work Order
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {quickStats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span
                    className={
                      stat.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {stat.change}
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Module Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {modules.map((module) => {
            const Icon = module.icon
            return (
              <Card key={module.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${module.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle>{module.name}</CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Open Module
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your CMMS modules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Work Order #1234 completed", time: "2 minutes ago", module: "Work Orders" },
                { action: "New asset added: Compressor Unit B", time: "1 hour ago", module: "Assets" },
                { action: "Monthly report generated", time: "3 hours ago", module: "Reporting" },
                { action: "User John Doe logged in", time: "5 hours ago", module: "Users" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.module}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}