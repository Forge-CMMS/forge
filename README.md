# Forge CMMS

🛠️ **Open-source CMMS that adapts to your needs** - build custom maintenance solutions with plug-and-play modules

Forge CMMS is an extensible maintenance management platform built with modern technologies, designed to grow with your organization's needs through a powerful module system.

## ✨ Features

- **🔧 Modular Architecture**: Plug-and-play modules for assets, work orders, and custom workflows
- **📊 Dynamic Data Tables**: Real-time data management with sorting, filtering, and pagination  
- **🏢 Multi-tenant Ready**: Complete tenant isolation with Row Level Security (RLS)
- **⚡ Real-time Sync**: Live updates across all connected clients using Supabase
- **🎨 Modern UI**: Beautiful, responsive interface built with Next.js and shadcn/ui
- **🔐 Secure Authentication**: Built-in auth with role-based permissions
- **📱 Mobile Responsive**: Works seamlessly on desktop, tablet, and mobile
- **🔄 Custom Entities**: Create custom data models without code changes
- **📈 Analytics Ready**: Built-in reporting and analytics capabilities

## 🏗 Architecture

Forge CMMS is built as a **Turborepo monorepo** with the following structure:

```
forge/
├── apps/
│   ├── web/              # Next.js frontend application
│   └── docs/             # Documentation site
├── packages/
│   ├── ui/               # Shared UI components (shadcn/ui)
│   ├── core/             # Core business logic
│   ├── database/         # Database schemas and types
│   └── cli/              # CLI tools for development
└── modules/
    ├── assets/           # Asset management module
    └── work-orders/      # Work order management module
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm 8+
- Supabase account (for database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Forge-CMMS/forge.git
   cd forge
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📦 Module System

Forge CMMS uses a powerful module system that allows you to extend functionality:

### Creating a Module

```typescript
import { ForgeModule } from "@forge/core"

export const CustomModule: ForgeModule = {
  id: "custom-module",
  name: "Custom Module", 
  version: "1.0.0",
  description: "A custom module for specific needs",
  entities: [
    {
      name: "CustomEntity",
      schema: CustomEntitySchema,
      permissions: {
        create: ["custom:create"],
        read: ["custom:read"],
        update: ["custom:update"], 
        delete: ["custom:delete"],
      },
    },
  ],
  initialize: async () => {
    console.log("Custom module initialized")
  },
}
```

### Registering a Module

```typescript
import { moduleRegistry } from "@forge/core"
import { CustomModule } from "./custom-module"

moduleRegistry.register(CustomModule)
await moduleRegistry.load("custom-module")
```

## 🛠 Core Modules

### Asset Management
- Track equipment, machinery, and facilities
- Hierarchical asset organization
- Maintenance history and scheduling
- Custom fields and categorization

### Work Order Management  
- Create and track maintenance requests
- Priority-based workflow
- Assignment and scheduling
- Time and cost tracking

## 🔐 Security & Multi-tenancy

- **Row Level Security (RLS)**: Complete data isolation between tenants
- **Role-based Access Control**: Granular permissions system
- **Secure Authentication**: Built on Supabase Auth
- **API Security**: Protected endpoints with proper authorization

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm test --filter=@forge/core

# Run e2e tests  
pnpm test:e2e
```

## 📝 Documentation

- [API Documentation](./docs/api.md)
- [Module Development Guide](./docs/modules.md)
- [Deployment Guide](./docs/deployment.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy with one click

### Docker

```bash
# Build the application
pnpm build

# Build Docker image
docker build -t forge-cmms .

# Run container
docker run -p 3000:3000 forge-cmms
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](./CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and documentation
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Turborepo](https://turbo.build/repo) - Monorepo build system
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

---

**Built with ❤️ by the Forge CMMS team**
