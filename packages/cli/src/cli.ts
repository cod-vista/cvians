#!/usr/bin/env node

import { Command } from 'commander'
import { installComponent } from './commands/add'
import { initProject } from './commands/init'

const program = new Command()

program
  .name('cvians')
  .description('CLI for installing Cvians UI components')
  .version('0.1.0')

program
  .command('init')
  .description('Initialize your project with Cvians UI')
  .option('-y, --yes', 'Skip confirmation prompts')
  .action(initProject)

program
  .command('add')
  .description('Add a Cvians UI component to your project')
  .argument('<component>', 'Component name to add')
  .option('-y, --yes', 'Skip confirmation prompts')
  .action(installComponent)

program.parse()