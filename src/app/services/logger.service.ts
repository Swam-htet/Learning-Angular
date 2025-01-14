import { Injectable, InjectionToken } from '@angular/core'

// Interface for Logger
export interface ILogger {
  log(message: string): void
  error(message: string): void
  warn(message: string): void
}

// Injection token for Logger
export const LOGGER_TOKEN = new InjectionToken<ILogger>('Logger Service')

// Console Logger Implementation
@Injectable()
export class ConsoleLoggerService implements ILogger {
  log(message: string): void {
    console.log(`[LOG]: ${message}`)
  }

  error(message: string): void {
    console.error(`[ERROR]: ${message}`)
  }

  warn(message: string): void {
    console.warn(`[WARN]: ${message}`)
  }
}

// Production Logger Implementation
@Injectable()
export class ProductionLoggerService implements ILogger {
  log(message: string): void {
    // In production, we might want to send logs to a server
    // or handle them differently
    this.sendToServer('log', message)
  }

  error(message: string): void {
    this.sendToServer('error', message)
  }

  warn(message: string): void {
    this.sendToServer('warn', message)
  }

  private sendToServer(level: string, message: string): void {
    // Simulate sending to server
    console.log(`[PRODUCTION ${level.toUpperCase()}]: ${message}`)
  }
}

// Development Logger Implementation
@Injectable()
export class DevelopmentLoggerService implements ILogger {
  log(message: string): void {
    console.log(`[DEV LOG 🟢]: ${message}`)
  }

  error(message: string): void {
    console.error(`[DEV ERROR 🔴]: ${message}`)
  }

  warn(message: string): void {
    console.warn(`[DEV WARN 🟡]: ${message}`)
  }
}
