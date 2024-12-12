import React, { useState, useEffect, useRef } from 'react';
import OpenAI from 'openai';
import { Terminal } from './components/Terminal';
import { TerminalPrompt } from './components/TerminalPrompt';
import { TerminalOutput } from './components/TerminalOutput';
import { TerminalHistory } from './types/terminal';
import { parseCommand, getHelpText, getSystemInfo, getManualText, sanitizeCommand } from './utils/terminalUtils';

const INITIAL_MESSAGE = `
Welcome to AI Terminal v1.0.0
Type 'help' to see available commands.
`.trim();

function App() {
  const [history, setHistory] = useState<TerminalHistory[]>([
    { command: '', output: INITIAL_MESSAGE }
  ]);
  const [input, setInput] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [theme, setTheme] = useState<'ubuntu' | 'matrix' | 'midnight'>('ubuntu');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  }, [history]);

  const handleCommand = async (input: string) => {
    const { command, args } = parseCommand(input);
    const sanitizedCommand = sanitizeCommand(command, args);
    
    setHistory(prev => [...prev, { command: sanitizedCommand, output: '', isLoading: true }]);
    setIsProcessing(true);

    try {
      let output = '';

      switch (command) {
        case 'help':
          output = getHelpText(args);
          break;

        case 'clear':
          setHistory([]);
          setIsProcessing(false);
          return;

        case 'about':
          output = 'AI Terminal v1.0.0\nA terminal-style interface for chatting with AI.';
          break;

        case 'setkey':
          if (!args) {
            output = 'Error: API key is required';
          } else {
            setApiKey(args);
            output = 'API key has been set successfully.';
          }
          break;

        case 'theme':
          if (['ubuntu', 'matrix', 'midnight'].includes(args)) {
            setTheme(args as 'ubuntu' | 'matrix' | 'midnight');
            output = `Theme changed to ${args}`;
          } else {
            output = 'Error: Invalid theme. Available themes: ubuntu, matrix, midnight';
          }
          break;

        case 'system':
          output = getSystemInfo();
          break;

        case 'man':
          output = args ? getManualText(args) : 'Error: Command name required';
          break;

        case 'chat':
          if (!apiKey) {
            output = 'Error: Please set your API key first using the setkey command.';
            break;
          }
          if (!args) {
            output = 'Error: Message is required';
            break;
          }

          try {
            const openai = new OpenAI({
              apiKey: apiKey,
              dangerouslyAllowBrowser: true
            });

            const completion = await openai.chat.completions.create({
              messages: [{ role: 'user', content: args }],
              model: 'gpt-3.5-turbo',
            });

            output = completion.choices[0]?.message?.content || 'No response from AI';
          } catch (error) {
            output = 'Error: Failed to communicate with AI. Please check your API key.';
          }
          break;

        default:
          output = `Command not found: ${command}\nType 'help' to see available commands.`;
      }

      setHistory(prev => 
        prev.map((entry, i) => 
          i === prev.length - 1 
            ? { ...entry, output, isLoading: false, isError: output.startsWith('Error') }
            : entry
        )
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Terminal theme={theme}>
      <div 
        ref={containerRef}
        className="h-[calc(100vh-8rem)] overflow-y-auto mb-4 cursor-text"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#4A4A4A transparent'
        }}
      >
        <TerminalOutput history={history} theme={theme} />
      </div>
      <TerminalPrompt
        value={input}
        onChange={setInput}
        onSubmit={handleCommand}
        disabled={isProcessing}
        theme={theme}
      />
    </Terminal>
  );
}

export default App;