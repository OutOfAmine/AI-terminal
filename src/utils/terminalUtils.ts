import { COMMANDS } from '../config/commands';

export const parseCommand = (input: string) => {
  const [command, ...args] = input.trim().split(' ');
  return { command: command.toLowerCase(), args: args.join(' ') };
};

export const sanitizeCommand = (command: string, args: string): string => {
  // Hide API key in command history
  if (command === 'setkey' && args) {
    return `${command} [API KEY]`;
  }
  return `${command} ${args}`.trim();
};

export const getManualText = (command: string) => {
  const cmd = COMMANDS[command];
  if (!cmd) return `No manual entry for ${command}`;

  return `
NAME
    ${cmd.name} - ${cmd.description}

SYNOPSIS
    ${cmd.usage}

DESCRIPTION
    ${cmd.description}
    
${cmd.examples ? `EXAMPLES
    ${cmd.examples.join('\n    ')}` : ''}

SEE ALSO
    help(1), ${Object.keys(COMMANDS).filter(c => c !== command).join('(1), ')}(1)
`.trim();
};

export const getSystemInfo = () => `
SYSTEM INFORMATION
-----------------
Terminal: AI Terminal v1.0.0
Runtime: Node.js
Theme: Ubuntu
Window Manager: Web Browser
Shell: AI Shell
Uptime: ${Math.floor(performance.now() / 1000)}s

CAPABILITIES
-----------
✓ OpenAI Integration
✓ Command History
✓ Manual Pages
✓ Theme Support
✓ Auto-completion
`.trim();

export const getHelpText = (command?: string) => {
  if (command && COMMANDS[command]) {
    return getManualText(command);
  }

  return `
Available commands:
${Object.values(COMMANDS)
  .map((cmd) => `  ${cmd.name.padEnd(12)} ${cmd.description}`)
  .join('\n')}

For detailed information about a command, try:
  - help <command>  : Quick help
  - man <command>   : Detailed manual

Special keys:
  ↑/↓  : Navigate command history
  Tab  : Auto-complete commands
  Ctrl+L: Clear screen
  Ctrl+C: Cancel current operation

Examples:
  help chat     : Show help for chat command
  chat hello    : Start chatting with AI
  theme matrix  : Change terminal theme
`.trim();
};