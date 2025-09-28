export interface CLICommand {
  name: string
  description: string
  action: (...args: any[]) => void | Promise<void>
}

export interface ModuleTemplate {
  name: string
  files: Record<string, string>
}

export class ForgeCliCore {
  static async createModule(name: string): Promise<void> {
    console.log(`Creating module: ${name}`)
    // Implementation would create module structure
  }

  static async listModules(): Promise<void> {
    console.log("Available modules:")
    // Implementation would list installed modules
  }
}

export * from "./commands/module"
export * from "./commands/dev"