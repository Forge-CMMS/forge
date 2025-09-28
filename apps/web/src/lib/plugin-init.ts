import { pluginRegistry } from '@forge/core'

// Example plugins - in a real app these would be loaded from modules
import { createDashboardPlugin } from './plugins/dashboard-plugin'
import { createAssetsPlugin } from './plugins/assets-plugin'
import { createWorkOrdersPlugin } from './plugins/work-orders-plugin'

// Initialize and register default plugins
export async function initializePlugins() {
  try {
    console.log('Initializing default plugins...')
    
    // Register core plugins
    pluginRegistry.register(createDashboardPlugin())
    pluginRegistry.register(createAssetsPlugin())
    pluginRegistry.register(createWorkOrdersPlugin())
    
    // In a real application, you might load plugins from:
    // - A plugin directory
    // - A database
    // - Remote URLs
    // - Package registry
    
    console.log('Plugins registered successfully')
  } catch (error) {
    console.error('Failed to initialize plugins:', error)
  }
}

// Hot reload support for development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).pluginRegistry = pluginRegistry
}