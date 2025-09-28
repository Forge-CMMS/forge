// Module Registry System
export interface ForgeModule {
  id: string
  name: string
  version: string
  description: string
  dependencies?: string[]
  initialize?: () => Promise<void>
  routes?: ModuleRoute[]
  entities?: ModuleEntity[]
}

export interface ModuleRoute {
  path: string
  component: any // Component type - can be React.ComponentType or any other framework
  permissions?: string[]
}

export interface ModuleEntity {
  name: string
  schema: any // Zod schema
  permissions?: EntityPermissions
}

export interface EntityPermissions {
  create?: string[]
  read?: string[]
  update?: string[]
  delete?: string[]
}

class ModuleRegistry {
  private modules: Map<string, ForgeModule> = new Map()
  private loadedModules: Set<string> = new Set()

  register(module: ForgeModule): void {
    this.modules.set(module.id, module)
  }

  async load(moduleId: string): Promise<void> {
    const module = this.modules.get(moduleId)
    if (!module) {
      throw new Error(`Module ${moduleId} not found`)
    }

    // Check dependencies
    if (module.dependencies) {
      for (const dep of module.dependencies) {
        if (!this.loadedModules.has(dep)) {
          await this.load(dep)
        }
      }
    }

    // Initialize module
    if (module.initialize) {
      await module.initialize()
    }

    this.loadedModules.add(moduleId)
  }

  getModule(moduleId: string): ForgeModule | undefined {
    return this.modules.get(moduleId)
  }

  getLoadedModules(): ForgeModule[] {
    return Array.from(this.loadedModules)
      .map(id => this.modules.get(id))
      .filter((module): module is ForgeModule => Boolean(module))
  }

  getAllModules(): ForgeModule[] {
    return Array.from(this.modules.values())
  }
}

export const moduleRegistry = new ModuleRegistry()

// Core entities
export * from "./modules/assets"
export * from "./modules/work-orders"
export * from "./lib/permissions"
export * from "./lib/entities"