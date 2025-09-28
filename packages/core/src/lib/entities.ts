import { z } from "zod"

// Dynamic entity system for extensible data models
export interface EntityField {
  name: string
  type: "string" | "number" | "boolean" | "date" | "select" | "multiselect" | "text"
  label: string
  required?: boolean
  options?: string[] // for select/multiselect
  validation?: z.ZodSchema<any>
  display?: {
    order?: number
    width?: string
    hidden?: boolean
    readonly?: boolean
  }
}

export interface EntityDefinition {
  id: string
  name: string
  slug: string
  description?: string
  module_id: string
  fields: EntityField[]
  permissions?: {
    create?: string[]
    read?: string[]
    update?: string[]
    delete?: string[]
  }
  display_config?: {
    list_fields?: string[]
    detail_fields?: string[]
    search_fields?: string[]
    sort_field?: string
    sort_direction?: "asc" | "desc"
  }
}

export class EntityService {
  private static entities: Map<string, EntityDefinition> = new Map()

  static register(entity: EntityDefinition): void {
    this.entities.set(entity.slug, entity)
  }

  static get(slug: string): EntityDefinition | undefined {
    return this.entities.get(slug)
  }

  static getAll(): EntityDefinition[] {
    return Array.from(this.entities.values())
  }

  static getByModule(moduleId: string): EntityDefinition[] {
    return Array.from(this.entities.values()).filter(
      entity => entity.module_id === moduleId
    )
  }

  static createZodSchema(fields: EntityField[]): z.ZodSchema<any> {
    const shape: Record<string, z.ZodSchema<any>> = {}

    for (const field of fields) {
      let schema: z.ZodSchema<any>

      switch (field.type) {
        case "string":
          schema = z.string()
          break
        case "number":
          schema = z.number()
          break
        case "boolean":
          schema = z.boolean()
          break
        case "date":
          schema = z.string().datetime()
          break
        case "select":
          schema = field.options ? z.enum(field.options as [string, ...string[]]) : z.string()
          break
        case "multiselect":
          schema = z.array(z.string())
          break
        case "text":
          schema = z.string()
          break
        default:
          schema = z.string()
      }

      if (!field.required) {
        schema = schema.optional()
      }

      if (field.validation) {
        schema = schema.and(field.validation)
      }

      shape[field.name] = schema
    }

    return z.object(shape)
  }

  static validateData(entitySlug: string, data: any): { success: boolean; errors?: string[] } {
    const entity = this.get(entitySlug)
    if (!entity) {
      return { success: false, errors: ["Entity not found"] }
    }

    try {
      const schema = this.createZodSchema(entity.fields)
      schema.parse(data)
      return { success: true }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          success: false,
          errors: error.errors.map(err => `${err.path.join(".")}: ${err.message}`)
        }
      }
      return { success: false, errors: ["Validation failed"] }
    }
  }
}