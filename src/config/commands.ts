import { Command } from '../types/terminal';

export const COMMANDS: Record<string, Command> = {
  help: {
    name: 'help',
    description: 'Show available commands and documentation',
    usage: 'help [command]',
    examples: ['help', 'help chat'],
  },
  clear: {
    name: 'clear',
    description: 'Clear terminal screen',
    usage: 'clear',
  },
  chat: {
    name: 'chat',
    description: 'Start a chat with AI assistant',
    usage: 'chat <message>',
    examples: ['chat Hello, how are you?', 'chat What is React?'],
  },
  setkey: {
    name: 'setkey',
    description: 'Set OpenAI API key for authentication',
    usage: 'setkey <your-api-key>',
    examples: ['setkey sk-...'],
  },
  about: {
    name: 'about',
    description: 'Show information about the terminal',
    usage: 'about',
  },
  theme: {
    name: 'theme',
    description: 'Change terminal color theme',
    usage: 'theme <name>',
    examples: ['theme ubuntu', 'theme matrix', 'theme midnight'],
  },
  history: {
    name: 'history',
    description: 'Show command history',
    usage: 'history',
  },
  system: {
    name: 'system',
    description: 'Display system information',
    usage: 'system',
  },
  man: {
    name: 'man',
    description: 'Display manual for a command',
    usage: 'man <command>',
    examples: ['man chat', 'man setkey'],
  },
};