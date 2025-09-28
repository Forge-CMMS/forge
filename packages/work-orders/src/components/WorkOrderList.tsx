"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@forge/ui/components/card"
import { Button } from "@forge/ui/components/button"
import { FileText, Clock, User, AlertCircle, CheckCircle } from "lucide-react"

export function WorkOrderList() {
  const [workOrders] = React.useState([
    {
      id: "1",
      work_order_number: "WO-20240928-001",
      title: "Replace HVAC Filter - Building A",
      description: "Monthly preventive maintenance for HVAC system",
      priority: "medium",
      status: "open",
      type: "preventive",
      asset_name: "HVAC Unit A-1",
      assigned_to: "John Doe",
      due_date: "2024-09-30",
      created_at: "2024-09-25",
    },
    {
      id: "2", 
      work_order_number: "WO-20240928-002",
      title: "Elevator Emergency Stop Button Repair",
      description: "Emergency stop button is not functioning properly",
      priority: "high",
      status: "in_progress",
      type: "corrective",
      asset_name: "Elevator #1",
      assigned_to: "Jane Smith",
      due_date: "2024-09-29",
      created_at: "2024-09-28",
    },
    {
      id: "3",
      work_order_number: "WO-20240927-003",
      title: "Generator Inspection",
      description: "Quarterly inspection of backup generator",
      priority: "low",
      status: "completed",
      type: "inspection",
      asset_name: "Generator Unit B",
      assigned_to: "Mike Johnson",
      due_date: "2024-09-27",
      created_at: "2024-09-20",
    },
  ])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "text-red-700 bg-red-100"
      case "high":
        return "text-red-600 bg-red-100"
      case "medium":
        return "text-yellow-600 bg-yellow-100"
      case "low":
        return "text-green-600 bg-green-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "text-blue-600 bg-blue-100"
      case "in_progress":
        return "text-orange-600 bg-orange-100"
      case "on_hold":
        return "text-yellow-600 bg-yellow-100"
      case "completed":
        return "text-green-600 bg-green-100"
      case "cancelled":
        return "text-gray-600 bg-gray-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <FileText className="h-4 w-4" />
      case "in_progress":
        return <Clock className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "critical":
      case "high":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Work Orders</h1>
          <p className="text-muted-foreground">
            Manage maintenance requests and track progress
          </p>
        </div>
        <Button>Create Work Order</Button>
      </div>

      <div className="grid gap-6">
        {workOrders.map((workOrder) => (
          <Card key={workOrder.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{workOrder.title}</CardTitle>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${getPriorityColor(
                        workOrder.priority
                      )}`}
                    >
                      {getPriorityIcon(workOrder.priority)}
                      {workOrder.priority}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {workOrder.work_order_number}
                  </div>
                </div>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                    workOrder.status
                  )}`}
                >
                  {getStatusIcon(workOrder.status)}
                  {workOrder.status.replace("_", " ")}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">{workOrder.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Type:</span>
                  <span className="capitalize">{workOrder.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Assigned:</span>
                  <span>{workOrder.assigned_to}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Due:</span>
                  <span>{workOrder.due_date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Asset:</span>
                  <span>{workOrder.asset_name}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                {workOrder.status === "open" && (
                  <Button size="sm">
                    Start Work
                  </Button>
                )}
                {workOrder.status === "in_progress" && (
                  <Button size="sm">
                    Complete
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}