"use client"

import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { pluginRegistry } from '@forge/core'
import type { Plugin, PluginState } from '@forge/core'

interface PluginStoreState {
  // Plugin registry state
  plugins: Plugin[]
  loadedPlugins: string[]
  enabledPlugins: string[]
  
  // UI state
  activeTab?: string
  collapsedPanels: Set<string>
  
  // Actions
  loadPlugin: (pluginId: string) => Promise<void>
  unloadPlugin: (pluginId: string) => Promise<void>
  enablePlugin: (pluginId: string) => void
  disablePlugin: (pluginId: string) => void
  setActiveTab: (tabId: string) => void
  togglePanel: (panelId: string) => void
  refreshPlugins: () => void
}

export const usePluginStore = create<PluginStoreState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    plugins: [],
    loadedPlugins: [],
    enabledPlugins: [],
    collapsedPanels: new Set(),

    // Actions
    loadPlugin: async (pluginId: string) => {
      try {
        await pluginRegistry.load(pluginId)
        const loadedPlugins = pluginRegistry.getLoadedPlugins().map(p => p.id)
        set({ loadedPlugins })
      } catch (error) {
        console.error(`Failed to load plugin ${pluginId}:`, error)
      }
    },

    unloadPlugin: async (pluginId: string) => {
      try {
        await pluginRegistry.unload(pluginId)
        const loadedPlugins = pluginRegistry.getLoadedPlugins().map(p => p.id)
        set({ loadedPlugins })
      } catch (error) {
        console.error(`Failed to unload plugin ${pluginId}:`, error)
      }
    },

    enablePlugin: (pluginId: string) => {
      pluginRegistry.setEnabled(pluginId, true)
      const enabledPlugins = pluginRegistry.getEnabledPlugins().map(p => p.id)
      set({ enabledPlugins })
    },

    disablePlugin: (pluginId: string) => {
      pluginRegistry.setEnabled(pluginId, false)
      const enabledPlugins = pluginRegistry.getEnabledPlugins().map(p => p.id)
      set({ enabledPlugins })
    },

    setActiveTab: (tabId: string) => {
      set({ activeTab: tabId })
    },

    togglePanel: (panelId: string) => {
      const { collapsedPanels } = get()
      const newCollapsed = new Set(collapsedPanels)
      
      if (newCollapsed.has(panelId)) {
        newCollapsed.delete(panelId)
      } else {
        newCollapsed.add(panelId)
      }
      
      set({ collapsedPanels: newCollapsed })
    },

    refreshPlugins: () => {
      const plugins = pluginRegistry.getAllPlugins()
      const loadedPlugins = pluginRegistry.getLoadedPlugins().map(p => p.id)
      const enabledPlugins = pluginRegistry.getEnabledPlugins().map(p => p.id)
      
      set({ 
        plugins,
        loadedPlugins,
        enabledPlugins 
      })
    },
  }))
)

// Initialize store with current plugin data
usePluginStore.getState().refreshPlugins()

// Subscribe to plugin registry changes
pluginRegistry.subscribe(() => {
  usePluginStore.getState().refreshPlugins()
})