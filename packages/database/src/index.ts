import { z } from "zod"

// Base entity schema
export const BaseEntitySchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  tenant_id: z.string().uuid(),
})

// User schema
export const UserSchema = BaseEntitySchema.extend({
  email: z.string().email(),
  full_name: z.string(),
  role: z.enum(["admin", "manager", "technician", "viewer"]),
  department: z.string().optional(),
  phone: z.string().optional(),
  is_active: z.boolean().default(true),
})

// Asset schema
export const AssetSchema = BaseEntitySchema.extend({
  name: z.string(),
  description: z.string().optional(),
  asset_number: z.string(),
  category: z.string(),
  location: z.string(),
  status: z.enum(["active", "inactive", "maintenance", "retired"]),
  purchase_date: z.string().datetime().optional(),
  warranty_expiry: z.string().datetime().optional(),
  cost: z.number().optional(),
  manufacturer: z.string().optional(),
  model: z.string().optional(),
  serial_number: z.string().optional(),
  parent_asset_id: z.string().uuid().optional(),
  custom_fields: z.record(z.any()).optional(),
})

// Work Order schema
export const WorkOrderSchema = BaseEntitySchema.extend({
  title: z.string(),
  description: z.string(),
  work_order_number: z.string(),
  priority: z.enum(["low", "medium", "high", "critical"]),
  status: z.enum(["open", "in_progress", "on_hold", "completed", "cancelled"]),
  type: z.enum(["preventive", "corrective", "emergency", "inspection"]),
  asset_id: z.string().uuid(),
  assigned_to: z.string().uuid().optional(),
  requested_by: z.string().uuid(),
  due_date: z.string().datetime().optional(),
  completed_at: z.string().datetime().optional(),
  estimated_hours: z.number().optional(),
  actual_hours: z.number().optional(),
  cost: z.number().optional(),
  notes: z.string().optional(),
  custom_fields: z.record(z.any()).optional(),
})

// Module schema for dynamic modules
export const ModuleSchema = BaseEntitySchema.extend({
  name: z.string(),
  slug: z.string(),
  version: z.string(),
  description: z.string(),
  is_active: z.boolean().default(true),
  config: z.record(z.any()).optional(),
  permissions: z.array(z.string()).optional(),
})

// Custom Entity schema for dynamic entities
export const CustomEntitySchema = BaseEntitySchema.extend({
  name: z.string(),
  slug: z.string(),
  module_id: z.string().uuid(),
  schema: z.record(z.any()),
  permissions: z.record(z.array(z.string())).optional(),
  display_config: z.record(z.any()).optional(),
})

// Type exports
export type BaseEntity = z.infer<typeof BaseEntitySchema>
export type User = z.infer<typeof UserSchema>
export type Asset = z.infer<typeof AssetSchema>
export type WorkOrder = z.infer<typeof WorkOrderSchema>
export type Module = z.infer<typeof ModuleSchema>
export type CustomEntity = z.infer<typeof CustomEntitySchema>

// Database configuration
export interface DatabaseConfig {
  url: string
  anonKey: string
  serviceKey?: string
}

export * from "./supabase"