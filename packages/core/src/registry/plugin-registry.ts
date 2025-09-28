import { PermissionService, type UserPermissions } from '../lib/permissions'
import type { Plugin, PluginState, TabDefinition, PanelDefinition, NavItem, ContentDefinition } from './types'

export class PluginRegistry {
  private plugins: Map<string, Plugin> = new Map()
  private pluginStates: Map<string, PluginState> = new Map()
  private loadedPlugins: Set<string> = new Set()
  private subscribers: Set<(plugins: Plugin[]) => void> = new Set()

  /**
   * Register a plugin with the registry
   */
  register(plugin: Plugin): void {
    this.plugins.set(plugin.id, plugin)
    this.pluginStates.set(plugin.id, {
      loaded: false,
      enabled: true,
    })
    this.notifySubscribers()
  }

  /**
   * Unregister a plugin from the registry
   */
  unregister(pluginId: string): void {
    const plugin = this.plugins.get(pluginId)
    if (plugin) {
      // Clean up if plugin has cleanup method
      if (plugin.cleanup) {
        plugin.cleanup().catch(console.error)
      }
    }
    
    this.plugins.delete(pluginId)
    this.pluginStates.delete(pluginId)
    this.loadedPlugins.delete(pluginId)
    this.notifySubscribers()
  }

  /**
   * Load a plugin (lazy loading with dependency resolution)
   */
  async load(pluginId: string): Promise<void> {
    if (this.loadedPlugins.has(pluginId)) {
      return
    }

    const plugin = this.plugins.get(pluginId)
    if (!plugin) {
      throw new Error(`Plugin ${pluginId} not found`)
    }

    const state = this.pluginStates.get(pluginId)!
    
    try {
      // Check dependencies
      if (plugin.dependencies) {
        for (const dep of plugin.dependencies) {
          if (!this.loadedPlugins.has(dep)) {
            await this.load(dep)
          }
        }
      }

      // Initialize plugin
      if (plugin.initialize) {
        await plugin.initialize()
      }

      this.loadedPlugins.add(pluginId)
      this.pluginStates.set(pluginId, {
        ...state,
        loaded: true,
        error: undefined,
      })
    } catch (error) {
      this.pluginStates.set(pluginId, {
        ...state,
        loaded: false,
        error: error as Error,
      })
      throw error
    }

    this.notifySubscribers()
  }

  /**
   * Unload a plugin
   */
  async unload(pluginId: string): Promise<void> {
    const plugin = this.plugins.get(pluginId)
    if (plugin && plugin.cleanup) {
      await plugin.cleanup()
    }

    this.loadedPlugins.delete(pluginId)
    const state = this.pluginStates.get(pluginId)
    if (state) {
      this.pluginStates.set(pluginId, {
        ...state,
        loaded: false,
      })
    }
    this.notifySubscribers()
  }

  /**
   * Enable/disable a plugin
   */
  setEnabled(pluginId: string, enabled: boolean): void {
    const state = this.pluginStates.get(pluginId)
    if (state) {
      this.pluginStates.set(pluginId, {
        ...state,
        enabled,
      })
      this.notifySubscribers()
    }
  }

  /**
   * Get all registered plugins
   */
  getAllPlugins(): Plugin[] {
    return Array.from(this.plugins.values())
  }

  /**
   * Get loaded plugins only
   */
  getLoadedPlugins(): Plugin[] {
    return Array.from(this.loadedPlugins)
      .map(id => this.plugins.get(id))
      .filter((plugin): plugin is Plugin => Boolean(plugin))
  }

  /**
   * Get enabled plugins only
   */
  getEnabledPlugins(): Plugin[] {
    return Array.from(this.plugins.values())
      .filter(plugin => {
        const state = this.pluginStates.get(plugin.id)
        return state?.enabled && state?.loaded
      })
  }

  /**
   * Get plugin by ID
   */
  getPlugin(pluginId: string): Plugin | undefined {
    return this.plugins.get(pluginId)
  }

  /**
   * Get plugin state
   */
  getPluginState(pluginId: string): PluginState | undefined {
    return this.pluginStates.get(pluginId)
  }

  /**
   * Get all tabs from enabled plugins
   */
  getTabs(userPermissions?: UserPermissions): TabDefinition[] {
    const tabs: TabDefinition[] = []
    
    for (const plugin of this.getEnabledPlugins()) {
      if (plugin.tabs) {
        const allowedTabs = plugin.tabs.filter(tab => 
          this.hasPermission(tab.permissions, userPermissions)
        )
        tabs.push(...allowedTabs)
      }
    }
    
    return tabs
  }

  /**
   * Get all sidebar panels from enabled plugins
   */
  getSidebarPanels(userPermissions?: UserPermissions): PanelDefinition[] {
    const panels: PanelDefinition[] = []
    
    for (const plugin of this.getEnabledPlugins()) {
      if (plugin.sidebarPanels) {
        const allowedPanels = plugin.sidebarPanels.filter(panel => 
          this.hasPermission(panel.permissions, userPermissions)
        )
        panels.push(...allowedPanels)
      }
    }
    
    return panels
  }

  /**
   * Get all navigation items from enabled plugins
   */
  getNavigationItems(userPermissions?: UserPermissions): NavItem[] {
    const navItems: NavItem[] = []
    
    for (const plugin of this.getEnabledPlugins()) {
      if (plugin.navigationItems) {
        const allowedNavItems = plugin.navigationItems.filter(item => 
          this.hasPermission(item.permissions, userPermissions)
        )
        navItems.push(...allowedNavItems)
      }
    }
    
    return navItems
  }

  /**
   * Get all main content routes from enabled plugins
   */
  getMainContent(userPermissions?: UserPermissions): ContentDefinition[] {
    const content: ContentDefinition[] = []
    
    for (const plugin of this.getEnabledPlugins()) {
      if (plugin.mainContent) {
        const allowedContent = plugin.mainContent.filter(item => 
          this.hasPermission(item.permissions, userPermissions)
        )
        content.push(...allowedContent)
      }
    }
    
    return content
  }

  /**
   * Subscribe to plugin registry changes
   */
  subscribe(callback: (plugins: Plugin[]) => void): () => void {
    this.subscribers.add(callback)
    return () => {
      this.subscribers.delete(callback)
    }
  }

  /**
   * Check if user has required permissions
   */
  private hasPermission(requiredPermissions?: string[], userPermissions?: UserPermissions): boolean {
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true
    }
    
    if (!userPermissions) {
      return false
    }

    return PermissionService.checkMultiplePermissions(
      userPermissions,
      requiredPermissions,
      userPermissions.tenant_id,
      false // requireAll = false, so any permission is sufficient
    )
  }

  /**
   * Notify all subscribers of changes
   */
  private notifySubscribers(): void {
    const plugins = this.getAllPlugins()
    this.subscribers.forEach(callback => callback(plugins))
  }
}

// Global plugin registry instance
export const pluginRegistry = new PluginRegistry()