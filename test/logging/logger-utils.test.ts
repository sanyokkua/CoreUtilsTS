import { ConsoleLoggerInstance, getLogger, setLogger, SilentLoggerInstance } from '../../src/logging/logger-utils';

import { ConsoleLogger, LibLogger, SilentLogger } from '../../src/logging/types';

// Mock implementation for testing custom loggers
class MockLogger implements LibLogger {
    info = jest.fn();
    warning = jest.fn();
    error = jest.fn();
    debug = jest.fn();
}

describe('Logger Configuration', () => {
    // Store original module state for restoration
    let originalLogger: LibLogger;

    beforeAll(() => {
        originalLogger = getLogger();
    });

    beforeEach(() => {
        // Reset to default state before each test
        setLogger(SilentLoggerInstance);
    });

    afterAll(() => {
        // Restore original state after all tests
        setLogger(originalLogger);
    });

    describe('getLogger()', () => {
        it('should return SilentLoggerInstance by default', () => {
            const result = getLogger();
            expect(result).toBe(SilentLoggerInstance);
        });

        it('should return current logger instance after changes', () => {
            setLogger(ConsoleLoggerInstance);
            expect(getLogger()).toBe(ConsoleLoggerInstance);
        });
    });

    describe('setLogger()', () => {
        it('should change the active logger implementation', () => {
            const mockLogger = new MockLogger();

            setLogger(mockLogger);
            expect(getLogger()).toBe(mockLogger);

            setLogger(ConsoleLoggerInstance);
            expect(getLogger()).toBe(ConsoleLoggerInstance);
        });

        it('should handle different logger implementations', () => {
            const testCases: LibLogger[] = [
                ConsoleLoggerInstance,
                new MockLogger(),
                {
                    info: jest.fn(),
                    warning: jest.fn(),
                    error: jest.fn(),
                    debug: jest.fn(),
                },
            ];

            testCases.forEach((testLogger) => {
                setLogger(testLogger);
                expect(getLogger()).toBe(testLogger);
            });
        });
    });

    describe('Logger Instances', () => {
        it('should maintain separate instances', () => {
            expect(SilentLoggerInstance).not.toBe(ConsoleLoggerInstance);
        });

        it('should create new SilentLoggerInstance when imported', () => {
            const newSilentLogger = new SilentLogger();
            expect(newSilentLogger).toBeInstanceOf(SilentLogger);
            expect(newSilentLogger).not.toBe(SilentLoggerInstance);
        });

        it('should create new ConsoleLoggerInstance when imported', () => {
            const newConsoleLogger = new ConsoleLogger();
            expect(newConsoleLogger).toBeInstanceOf(ConsoleLogger);
            expect(newConsoleLogger).not.toBe(ConsoleLoggerInstance);
        });
    });
});
