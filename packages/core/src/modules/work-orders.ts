import { z } from "zod"
import type { ForgeModule } from "../index"

// Work Order schemas
export const WorkOrderCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  priority: z.enum(["low", "medium", "high", "critical"]).default("medium"),
  type: z.enum(["preventive", "corrective", "emergency", "inspection"]),
  asset_id: z.string().uuid("Invalid asset ID"),
  assigned_to: z.string().uuid().optional(),
  due_date: z.string().datetime().optional(),
  estimated_hours: z.number().positive().optional(),
  custom_fields: z.record(z.any()).optional(),
})

export const WorkOrderUpdateSchema = WorkOrderCreateSchema.partial().extend({
  status: z.enum(["open", "in_progress", "on_hold", "completed", "cancelled"]).optional(),
  completed_at: z.string().datetime().optional(),
  actual_hours: z.number().positive().optional(),
  cost: z.number().positive().optional(),
  notes: z.string().optional(),
})

export const WorkOrderFilterSchema = z.object({
  status: z.enum(["open", "in_progress", "on_hold", "completed", "cancelled"]).optional(),
  priority: z.enum(["low", "medium", "high", "critical"]).optional(),
  type: z.enum(["preventive", "corrective", "emergency", "inspection"]).optional(),
  assigned_to: z.string().uuid().optional(),
  asset_id: z.string().uuid().optional(),
  due_before: z.string().datetime().optional(),
  due_after: z.string().datetime().optional(),
  search: z.string().optional(),
})

// Work Order service functions
export class WorkOrderService {
  private static generateWorkOrderNumber(): string {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const day = String(now.getDate()).padStart(2, "0")
    const time = now.getTime().toString().slice(-4)
    return `WO-${year}${month}${day}-${time}`
  }

  static async create(data: z.infer<typeof WorkOrderCreateSchema>) {
    const workOrderData = {
      ...data,
      work_order_number: this.generateWorkOrderNumber(),
      status: "open" as const,
    }
    // Implementation would integrate with Supabase
    console.log("Creating work order:", workOrderData)
    return workOrderData
  }

  static async update(id: string, data: z.infer<typeof WorkOrderUpdateSchema>) {
    // Implementation would integrate with Supabase
    console.log("Updating work order:", id, data)
  }

  static async delete(id: string) {
    // Implementation would integrate with Supabase
    console.log("Deleting work order:", id)
  }

  static async findMany(filters?: z.infer<typeof WorkOrderFilterSchema>) {
    // Implementation would integrate with Supabase
    console.log("Finding work orders:", filters)
    return []
  }

  static async findById(id: string) {
    // Implementation would integrate with Supabase
    console.log("Finding work order by id:", id)
    return null
  }

  static async assign(id: string, userId: string) {
    // Implementation would integrate with Supabase
    console.log("Assigning work order:", id, "to user:", userId)
  }

  static async complete(id: string, notes?: string, actualHours?: number, cost?: number) {
    const updateData = {
      status: "completed" as const,
      completed_at: new Date().toISOString(),
      notes,
      actual_hours: actualHours,
      cost,
    }
    return this.update(id, updateData)
  }
}

// Work Order module definition
export const WorkOrderModule: ForgeModule = {
  id: "work-orders",
  name: "Work Order Management",
  version: "1.0.0",
  description: "Create and track maintenance requests",
  dependencies: ["assets"], // Depends on assets module
  entities: [
    {
      name: "WorkOrder",
      schema: WorkOrderCreateSchema,
      permissions: {
        create: ["workorder:create", "admin", "manager", "technician"],
        read: ["workorder:read", "admin", "manager", "technician"],
        update: ["workorder:update", "admin", "manager"],
        delete: ["workorder:delete", "admin"],
      },
    },
  ],
  initialize: async () => {
    console.log("Initializing Work Order Management module")
  },
}