// Permission system for multi-tenant access control
export interface Permission {
  id: string
  name: string
  description: string
  resource: string
  action: string
}

export interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  tenant_id: string
}

export interface UserPermissions {
  user_id: string
  tenant_id: string
  roles: string[]
  direct_permissions: string[]
}

export class PermissionService {
  static hasPermission(
    userPermissions: UserPermissions,
    requiredPermission: string,
    resourceTenantId?: string
  ): boolean {
    // Check tenant isolation
    if (resourceTenantId && resourceTenantId !== userPermissions.tenant_id) {
      return false
    }

    // Check direct permissions
    if (userPermissions.direct_permissions.includes(requiredPermission)) {
      return true
    }

    // Admin always has access within their tenant
    if (userPermissions.roles.includes("admin")) {
      return true
    }

    // Check role-based permissions (this would be expanded with actual role data)
    return false
  }

  static checkMultiplePermissions(
    userPermissions: UserPermissions,
    requiredPermissions: string[],
    resourceTenantId?: string,
    requireAll: boolean = false
  ): boolean {
    if (requireAll) {
      return requiredPermissions.every(permission =>
        this.hasPermission(userPermissions, permission, resourceTenantId)
      )
    } else {
      return requiredPermissions.some(permission =>
        this.hasPermission(userPermissions, permission, resourceTenantId)
      )
    }
  }
}

// Row Level Security helpers
export class RLSService {
  static getTenantFilter(tenantId: string): string {
    return `tenant_id = '${tenantId}'`
  }

  static getUserFilter(userId: string, tenantId: string): string {
    return `(tenant_id = '${tenantId}' AND (created_by = '${userId}' OR assigned_to = '${userId}' OR is_public = true))`
  }

  static getPermissionFilter(
    userId: string,
    tenantId: string,
    resource: string,
    action: string
  ): string {
    // This would integrate with actual permission checks
    return `tenant_id = '${tenantId}'`
  }
}