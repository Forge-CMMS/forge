# Forge CMMS Plugin System

## Overview

The Forge CMMS plugin system provides a dynamic, extensible architecture for adding custom functionality through modules and plugins. The system supports hot-loading, permission-based access control, and graceful error handling.

## Architecture

### Core Components

#### 1. Plugin Registry (`packages/core/src/registry/`)
- **PluginRegistry**: Manages plugin lifecycle, dependencies, and loading
- **Plugin Interface**: Defines structure for UI hooks and content
- **Permission Integration**: Respects user permissions for feature access

#### 2. Dynamic UI Components (`packages/ui/src/layout/`)
- **DynamicTabs**: Renders plugin-contributed tabs in main content area
- **DynamicSidebar**: Displays collapsible plugin panels
- **DynamicNavigation**: Shows plugin-contributed menu items
- **DynamicContentRouter**: Routes to plugin main content pages
- **PluginErrorBoundary**: Handles plugin failures gracefully
- **PluginSuspense**: Provides loading states for lazy-loaded plugins

#### 3. State Management
- **usePluginStore**: Zustand-based store for plugin state coordination
- **Real-time updates**: Automatic UI updates when plugins load/unload

## Plugin Structure

```typescript
interface Plugin {
  id: string
  name: string
  version: string
  description?: string
  dependencies?: string[]
  
  // UI Integration Points
  tabs?: TabDefinition[]
  sidebarPanels?: PanelDefinition[]
  navigationItems?: NavItem[]
  mainContent?: ContentDefinition[]
  
  // Lifecycle hooks
  initialize?: () => Promise<void>
  cleanup?: () => Promise<void>
}
```

### UI Integration Points

#### Tabs (Main Content Area)
```typescript
{
  id: 'my-tab',
  label: 'My Feature',
  icon: MyIcon,
  component: MyTabComponent,
  permissions: ['feature:read']
}
```

#### Sidebar Panels
```typescript
{
  id: 'my-panel',
  title: 'Quick Actions',
  icon: ActionIcon,
  component: MyPanelComponent,
  collapsible: true,
  defaultCollapsed: false,
  permissions: ['feature:read']
}
```

#### Navigation Items
```typescript
{
  id: 'my-nav',
  label: 'My Module',
  icon: NavIcon,
  url: '/my-module',
  permissions: ['feature:read']
}
```

#### Main Content Routes
```typescript
{
  id: 'my-content',
  path: '/my-module',
  component: MyMainComponent,
  permissions: ['feature:read']
}
```

## Creating a Plugin

### 1. Define Plugin Structure

```typescript
// my-plugin/src/plugin.ts
import * as React from 'react'
import type { Plugin } from '@forge/core'

const MyComponent = React.lazy(() => import('./components/MyComponent'))

export const MyPlugin: Plugin = {
  id: 'my-plugin',
  name: 'My Plugin',
  version: '1.0.0',
  description: 'Custom functionality for my needs',
  
  tabs: [{
    id: 'my-tab',
    label: 'My Tab',
    component: MyComponent,
    permissions: ['my-plugin:read']
  }],
  
  initialize: async () => {
    console.log('My plugin initialized')
  }
}
```

### 2. Register Plugin

```typescript
// app initialization
import { pluginRegistry } from '@forge/core'
import { MyPlugin } from './my-plugin'

// Register plugin
pluginRegistry.register(MyPlugin)

// Load plugin
await pluginRegistry.load('my-plugin')
```

### 3. Use Dynamic Components

```tsx
// In your layout
import { DynamicTabs, DynamicSidebar } from '@forge/ui/layout'

function MyLayout() {
  const userPermissions = useUserPermissions()
  
  return (
    <div className="layout">
      <DynamicTabs userPermissions={userPermissions} />
      <DynamicSidebar userPermissions={userPermissions} />
    </div>
  )
}
```

## Permission System

Plugins integrate with the existing permission system:

```typescript
// User permissions structure
const userPermissions = {
  user_id: "user-123",
  tenant_id: "tenant-123", 
  roles: ["manager"],
  direct_permissions: ["inventory:read", "asset:create"]
}

// Plugin with permissions
{
  id: 'secure-feature',
  tabs: [{
    // Only shown to users with these permissions
    permissions: ['inventory:read', 'admin']
  }]
}
```

## Error Handling

The system provides robust error handling:

- **Plugin Load Failures**: Plugins that fail to load don't crash the app
- **Component Errors**: Error boundaries catch and display plugin failures
- **Dependency Issues**: Clear error messages for missing dependencies
- **Permission Denials**: Graceful handling of insufficient permissions

## Hot Module Loading

During development, plugins can be dynamically loaded:

```javascript
// In browser console (development only)
window.pluginRegistry.register(newPlugin)
await window.pluginRegistry.load('new-plugin')
```

## Example Plugins

### Dashboard Plugin
- Overview tab with metrics
- Quick analytics sidebar panel
- Main dashboard navigation

### Assets Plugin  
- Asset management tab
- Configuration sidebar panel
- Assets navigation item

### Work Orders Plugin
- Work orders tab with status overview
- Statistics sidebar panel
- Work orders navigation

### Inventory Management Plugin (Module)
- Complete inventory management system
- Multiple components and views
- Settings and statistics panels

## Best Practices

1. **Lazy Loading**: Use `React.lazy()` for plugin components
2. **Error Boundaries**: Always wrap plugin content in error boundaries
3. **Permissions**: Define clear permission requirements
4. **Dependencies**: Declare plugin dependencies explicitly
5. **Cleanup**: Implement cleanup methods for proper resource management
6. **Testing**: Test plugins in isolation and with permission variations

## Development Workflow

1. Create plugin definition with UI hooks
2. Implement components with lazy loading
3. Register plugin in development environment
4. Test with different permission sets
5. Handle error scenarios
6. Add to production plugin registry

## Future Extensions

- Plugin marketplace integration
- Remote plugin loading
- Plugin configuration UI
- Analytics and monitoring
- Version management
- Automated dependency resolution