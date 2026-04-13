type LogLevel = 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  userId?: string;
  action?: string;
  metadata?: Record<string, unknown>;
  timestamp: string;
  traceId?: string;
}

const isTestMode = process.env.ARE_E_TEST_MODE === 'true';

export function log(entry: Omit<LogEntry, 'timestamp'>) {
  const full: LogEntry = { ...entry, timestamp: new Date().toISOString() };

  if (entry.level === 'error') {
    console.error(JSON.stringify(full));
    // In production, Sentry is initialized via sentry.server.config.ts
    // and will automatically capture unhandled errors.
    // For explicit captures: call captureError() below.
  } else if (entry.level === 'warn') {
    console.warn(JSON.stringify(full));
  } else {
    // In prod these go to Vercel's log drain → SIEM
    console.log(JSON.stringify(full));
  }
}

export function logInfo(
  message: string,
  meta?: Omit<LogEntry, 'level' | 'message' | 'timestamp'>
) {
  log({ level: 'info', message, ...meta });
}

export function logWarn(
  message: string,
  meta?: Omit<LogEntry, 'level' | 'message' | 'timestamp'>
) {
  log({ level: 'warn', message, ...meta });
}

export function logError(
  message: string,
  meta?: Omit<LogEntry, 'level' | 'message' | 'timestamp'>
) {
  log({ level: 'error', message, ...meta });
}

/** Suppress logs in test mode unless explicitly verbose */
export function logDebug(
  message: string,
  meta?: Omit<LogEntry, 'level' | 'message' | 'timestamp'>
) {
  if (!isTestMode) {
    log({ level: 'info', message: `[DEBUG] ${message}`, ...meta });
  }
}
