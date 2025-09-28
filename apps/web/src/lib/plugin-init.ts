import { pluginRegistry } from '@forge/core'

// Import example plugins
import { createDashboardPlugin } from './plugins/dashboard-plugin'
import { createAssetsPlugin } from './plugins/assets-plugin'
import { createWorkOrdersPlugin } from './plugins/work-orders-plugin'

// In a real app, you might also dynamically load plugins from modules:
// import { InventoryPlugin } from '../../modules/inventory-management'

// Initialize and register default plugins
export async function initializePlugins() {
  try {
    console.log('Initializing default plugins...')
    
    // Register core plugins
    pluginRegistry.register(createDashboardPlugin())
    pluginRegistry.register(createAssetsPlugin())
    pluginRegistry.register(createWorkOrdersPlugin())
    
    // Example: Register additional module plugins
    // pluginRegistry.register(InventoryPlugin)
    
    // Load all registered plugins
    const plugins = pluginRegistry.getAllPlugins()
    for (const plugin of plugins) {
      try {
        await pluginRegistry.load(plugin.id)
        console.log(`✓ Loaded plugin: ${plugin.name}`)
      } catch (error) {
        console.warn(`⚠ Failed to load plugin ${plugin.id}:`, error)
      }
    }
    
    console.log(`✓ Plugin system initialized with ${plugins.length} plugins`)
  } catch (error) {
    console.error('❌ Failed to initialize plugins:', error)
    throw error
  }
}

// Hot reload support for development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  ;(window as any).pluginRegistry = pluginRegistry
  ;(window as any).reinitializePlugins = initializePlugins
}