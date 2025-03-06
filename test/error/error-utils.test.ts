import { extractErrorDetails } from '../../src/error/error-utils'; // Adjust the path as needed

describe('extractErrorDetails', () => {
    it('should extract details from an Error instance', () => {
        const error = new Error('Test error');
        error.name = 'CustomError';
        const result = extractErrorDetails(error);
        expect(result).toBe('CustomError. Test error');
    });

    it('should extract details from a string error', () => {
        const error = 'Something went wrong';
        const result = extractErrorDetails(error);
        expect(result).toBe('StringError. Something went wrong');
    });

    it('should extract details from a number error', () => {
        const error = 42;
        const result = extractErrorDetails(error);
        expect(result).toBe('numberError. 42');
    });

    it('should extract details from a boolean error', () => {
        const error = false;
        const result = extractErrorDetails(error);
        expect(result).toBe('booleanError. false');
    });

    it('should extract details from a symbol error', () => {
        const sym = Symbol('foo');
        const result = extractErrorDetails(sym);
        expect(result).toBe(`symbolError. ${String(sym)}`);
    });

    it('should extract details from a bigint error', () => {
        const error = BigInt(100);
        const result = extractErrorDetails(error);
        expect(result).toBe('bigintError. 100');
    });

    it('should extract details from a null error', () => {
        const error = null;
        const result = extractErrorDetails(error);
        expect(result).toBe('NullError. Received null');
    });

    it('should extract details from an undefined error', () => {
        const error = undefined;
        const result = extractErrorDetails(error);
        expect(result).toBe('UndefinedError. Received undefined');
    });

    it('should extract details from an object error with name and message', () => {
        const error = { name: 'MyError', message: 'Something went wrong' };
        const result = extractErrorDetails(error);
        expect(result).toBe('MyError. Something went wrong');
    });

    it('should extract details from an object error without name/message properties', () => {
        const error = { foo: 'bar' };
        const result = extractErrorDetails(error);
        expect(result).toBe('ObjectError. {"foo":"bar"}');
    });

    it('should handle an object error with non-string message property', () => {
        const error = { message: 123 };
        // Since `message` is not a string we fallback to JSON.stringify(error)
        const result = extractErrorDetails(error);
        expect(result).toBe('ObjectError. {"message":123}');
    });

    it('should handle a circular object error by returning a fallback message', () => {
        // eslint-disable-next-line   @typescript-eslint/no-explicit-any
        const error: any = { name: 'CircularError' };
        // eslint-disable-next-line
        error.message = error; // Create a circular reference
        const result = extractErrorDetails(error);
        expect(result).toBe('CircularError. No error message available');
    });

    it('should extract details from a normal function error', () => {
        function dummyFunc() {
            return 1;
        }
        const result = extractErrorDetails(dummyFunc);
        // We expect the type to be "functionError" and the message to be the function's string representation.
        expect(result.startsWith('functionError.')).toBe(true);
    });

    it('should handle a function error whose toString method throws', () => {
        const func = function () {
            return 1;
        };
        func.toString = () => {
            throw new Error('toString failure');
        };
        const result = extractErrorDetails(func);
        expect(result).toBe('functionError. No error message available');
    });
});
