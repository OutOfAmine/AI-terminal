export type Command = {
  name: string;
  description: string;
  usage?: string;
};

export type TerminalHistory = {
  command: string;
  output: string;
  isError?: boolean;
  isLoading?: boolean;
};