export interface ILoggerConfig {
  enabled?: boolean;
  level?: LoggerLevel;
  inFile?: boolean;
}

export type LoggerLevel = 'info' | 'error' | 'warn' | 'debug' | 'verbose';
