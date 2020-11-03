export interface ILoggerConfig {
  level?: LoggerLevel;
}

export type LoggerLevel = 'info' | 'error' | 'warn' | 'debug' | 'verbose';
