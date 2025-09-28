# Contributing to Forge CMMS

Thank you for your interest in contributing to Forge CMMS! This document provides guidelines and information for contributors.

## 🚀 Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/forge.git
   cd forge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env.local
   # Configure your environment variables
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 📋 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow existing code formatting (Prettier configuration provided)
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### Commit Messages
Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` New features
- `fix:` Bug fixes  
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Build process or auxiliary tool changes

Example:
```
feat(assets): add asset search functionality
fix(work-orders): resolve date filtering issue
docs(readme): update installation instructions
```

### Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, tested code
   - Update documentation as needed
   - Add tests for new functionality

3. **Test your changes**
   ```bash
   npm run test
   npm run lint
   npm run type-check
   ```

4. **Submit a pull request**
   - Use a descriptive title
   - Provide a detailed description
   - Link any related issues
   - Request review from maintainers

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests
- Write unit tests for utilities and business logic
- Write integration tests for API endpoints
- Write component tests for React components
- Use descriptive test names

## 📦 Module Development

### Creating a New Module

1. **Use the CLI tool**
   ```bash
   npx @forge/cli module create my-module
   ```

2. **Module structure**
   ```
   modules/my-module/
   ├── package.json
   ├── src/
   │   ├── index.ts
   │   ├── components/
   │   └── services/
   └── README.md
   ```

3. **Module requirements**
   - Implement the `ForgeModule` interface
   - Include proper TypeScript types
   - Add comprehensive documentation
   - Include tests

### Module Guidelines
- Keep modules focused and cohesive
- Use the core API for data access
- Follow the established patterns
- Document all public interfaces

## 🐛 Bug Reports

When reporting bugs, please include:

- **Environment details** (Node.js version, browser, OS)
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Error messages** or logs

## 💡 Feature Requests

For feature requests:

- **Search existing issues** first
- **Describe the problem** you're trying to solve
- **Provide context** on how the feature would be used
- **Consider the scope** - is this core functionality or a module?

## 📖 Documentation

### Documentation Types
- **API documentation** in code comments
- **User guides** in the docs app
- **README files** for packages and modules
- **Inline comments** for complex logic

### Writing Documentation
- Use clear, concise language
- Include code examples
- Update docs when changing functionality
- Test documentation examples

## 🏗 Architecture Guidelines

### Package Structure
- **`packages/core`**: Core business logic
- **`packages/ui`**: Reusable UI components  
- **`packages/database`**: Database schemas and types
- **`packages/cli`**: Command-line tools
- **`apps/web`**: Main web application
- **`modules/*`**: Feature modules

### Design Patterns
- Use dependency injection where appropriate
- Implement proper error handling
- Follow SOLID principles
- Use TypeScript for type safety

## 📞 Getting Help

- **GitHub Discussions** for questions and ideas
- **GitHub Issues** for bugs and feature requests
- **Discord** (link coming soon) for real-time chat

## 📄 License

By contributing to Forge CMMS, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Forge CMMS! 🛠️