/**
 * Extracts error details from any error value.
 *
 * The function returns a string in the format "ErrorType. Error message" based on these rules:
 * - If the error is `null`, returns "NullError. Received null".
 * - If the error is `undefined`, returns "UndefinedError. Received undefined".
 * - If the error is an instance of Error, uses its `name` and `message`.
 * - If the error is a string, treats it as the message and sets type to "StringError".
 * - If the error is an object with a `name` or `message` property, attempts to use them; if JSON.stringify fails (e.g. for circular objects), a fallback message is returned.
 * - For other types (number, boolean, symbol, function, bigint), their `typeof` is appended with "Error" and converted to a string.
 *
 * @param error - The error value to extract details from.
 * @returns A string containing the error type and error message.
 */
export function extractErrorDetails(error: unknown): string {
    let errorType: string = 'Unknown';
    let errorMessage: string;

    if (error === null) {
        errorType = 'NullError';
        errorMessage = 'Received null';
    } else if (error === undefined) {
        errorType = 'UndefinedError';
        errorMessage = 'Received undefined';
    } else if (error instanceof Error) {
        errorType = error.name || 'Error';
        errorMessage = error.message || 'No error message available';
    } else if (typeof error === 'string') {
        errorType = 'StringError';
        errorMessage = error;
    } else if (typeof error === 'object') {
        const errObj = error as Record<string, unknown>;
        // If the object contains a relevant name or message property, try to extract them.
        if ('name' in errObj || 'message' in errObj) {
            errorType = typeof errObj.name === 'string' && errObj.name.length > 0 ? String(errObj.name) : 'ObjectError';
            try {
                errorMessage = typeof errObj.message === 'string' ? errObj.message : JSON.stringify(error);
            } catch {
                errorMessage = 'No error message available';
            }
        } else {
            // For plain objects without name/message, simply JSON.stringify
            try {
                errorType = 'ObjectError';
                errorMessage = JSON.stringify(error);
            } catch {
                errorMessage = 'No error message available';
            }
        }
    } else {
        // For types like number, boolean, symbol, function, or bigint.
        errorType = typeof error + 'Error';
        try {
            // eslint-disable-next-line  @typescript-eslint/no-base-to-string
            errorMessage = error.toString();
        } catch {
            errorMessage = 'No error message available';
        }
    }
    return `${errorType}. ${errorMessage}`;
}
