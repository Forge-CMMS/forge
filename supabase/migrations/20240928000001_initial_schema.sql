-- Enable RLS and create tenant system
-- Create extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tenants table
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

-- Create RLS policy for tenants
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;

-- Create users table (extends auth.users)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'manager', 'technician', 'viewer')),
    department TEXT,
    phone TEXT,
    is_active BOOLEAN DEFAULT true
);

-- Create RLS policy for users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy for users to only see users in their tenant
CREATE POLICY "Users can only see users in their tenant" ON users
    FOR ALL USING (tenant_id = (
        SELECT tenant_id FROM users WHERE id = auth.uid()
    ));

-- Create assets table
CREATE TABLE IF NOT EXISTS assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    asset_number TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('active', 'inactive', 'maintenance', 'retired')),
    purchase_date TIMESTAMPTZ,
    warranty_expiry TIMESTAMPTZ,
    cost DECIMAL(10,2),
    manufacturer TEXT,
    model TEXT,
    serial_number TEXT,
    parent_asset_id UUID REFERENCES assets(id) ON DELETE SET NULL,
    custom_fields JSONB DEFAULT '{}'::jsonb
);

-- Create unique constraint for asset_number per tenant
CREATE UNIQUE INDEX assets_tenant_asset_number_idx ON assets (tenant_id, asset_number);

-- Create RLS policy for assets
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;

-- Create policy for assets to only show assets in their tenant
CREATE POLICY "Assets can only be seen by users in their tenant" ON assets
    FOR ALL USING (tenant_id = (
        SELECT tenant_id FROM users WHERE id = auth.uid()
    ));

-- Create work_orders table
CREATE TABLE IF NOT EXISTS work_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    work_order_number TEXT NOT NULL,
    priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    status TEXT NOT NULL CHECK (status IN ('open', 'in_progress', 'on_hold', 'completed', 'cancelled')),
    type TEXT NOT NULL CHECK (type IN ('preventive', 'corrective', 'emergency', 'inspection')),
    asset_id UUID NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    requested_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    due_date TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    estimated_hours DECIMAL(5,2),
    actual_hours DECIMAL(5,2),
    cost DECIMAL(10,2),
    notes TEXT,
    custom_fields JSONB DEFAULT '{}'::jsonb
);

-- Create unique constraint for work_order_number per tenant
CREATE UNIQUE INDEX work_orders_tenant_number_idx ON work_orders (tenant_id, work_order_number);

-- Create RLS policy for work_orders
ALTER TABLE work_orders ENABLE ROW LEVEL SECURITY;

-- Create policy for work_orders to only show work orders in their tenant
CREATE POLICY "Work orders can only be seen by users in their tenant" ON work_orders
    FOR ALL USING (tenant_id = (
        SELECT tenant_id FROM users WHERE id = auth.uid()
    ));

-- Create modules table for dynamic module management
CREATE TABLE IF NOT EXISTS modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    version TEXT NOT NULL,
    description TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    config JSONB DEFAULT '{}'::jsonb,
    permissions TEXT[] DEFAULT '{}'::text[]
);

-- Create unique constraint for module slug per tenant
CREATE UNIQUE INDEX modules_tenant_slug_idx ON modules (tenant_id, slug);

-- Create RLS policy for modules
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;

-- Create policy for modules to only show modules in their tenant
CREATE POLICY "Modules can only be seen by users in their tenant" ON modules
    FOR ALL USING (tenant_id = (
        SELECT tenant_id FROM users WHERE id = auth.uid()
    ));

-- Create custom_entities table for dynamic entity management
CREATE TABLE IF NOT EXISTS custom_entities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
    schema JSONB NOT NULL,
    permissions JSONB DEFAULT '{}'::jsonb,
    display_config JSONB DEFAULT '{}'::jsonb
);

-- Create unique constraint for custom entity slug per tenant
CREATE UNIQUE INDEX custom_entities_tenant_slug_idx ON custom_entities (tenant_id, slug);

-- Create RLS policy for custom_entities
ALTER TABLE custom_entities ENABLE ROW LEVEL SECURITY;

-- Create policy for custom_entities to only show entities in their tenant
CREATE POLICY "Custom entities can only be seen by users in their tenant" ON custom_entities
    FOR ALL USING (tenant_id = (
        SELECT tenant_id FROM users WHERE id = auth.uid()
    ));

-- Create update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON tenants 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assets_updated_at BEFORE UPDATE ON assets 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_work_orders_updated_at BEFORE UPDATE ON work_orders 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_modules_updated_at BEFORE UPDATE ON modules 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_custom_entities_updated_at BEFORE UPDATE ON custom_entities 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();