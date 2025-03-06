import { ConsoleLogger, LibLogger, SilentLogger } from './types';

export const SilentLoggerInstance = new SilentLogger();
export const ConsoleLoggerInstance = new ConsoleLogger();

let logger: LibLogger = SilentLoggerInstance;

export function setLogger(libLoggerImpl: LibLogger): void {
    logger = libLoggerImpl;
}

export function getLogger(): LibLogger {
    return logger;
}
