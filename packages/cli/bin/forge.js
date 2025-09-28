#!/usr/bin/env node
const { program } = require('commander');

program
  .name('forge')
  .description('Forge CMMS CLI - Tools for managing your maintenance platform')
  .version('0.1.0');

program
  .command('module')
  .description('Module management commands')
  .option('-l, --list', 'List all modules')
  .option('-c, --create <name>', 'Create a new module')
  .action((options) => {
    if (options.list) {
      console.log('📦 Available modules:');
      console.log('  - assets: Asset Management');
      console.log('  - work-orders: Work Order Management');
    } else if (options.create) {
      console.log(`🚀 Creating module: ${options.create}`);
      console.log('Module creation functionality coming soon!');
    }
  });

program
  .command('dev')
  .description('Start development server')
  .action(() => {
    console.log('🔥 Starting Forge CMMS development server...');
    console.log('Run "npm run dev" in the apps/web directory to start the development server.');
  });

program
  .command('build')
  .description('Build the application')
  .action(() => {
    console.log('🔨 Building Forge CMMS...');
    console.log('Run "npm run build" to build the application.');
  });

program.parse();