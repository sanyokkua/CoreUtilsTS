import { getLogger } from '../logging/logger-utils';
import { safeExtractText } from '../string/string-utils';

const logger = getLogger();

/**
 * Type guard that checks if a value is strictly null
 * @param value - The value to check
 * @returns True if the value is exactly null, false otherwise
 */
export function isNull(value: unknown): value is null {
    logger.debug(`Passed argument to isNull: ${safeExtractText(value)}`);
    return value === null;
}

/**
 * Type guard that checks if a value is strictly undefined
 * @param value - The value to check
 * @returns True if the value is exactly undefined, false otherwise
 */
export function isUndefined(value: unknown): value is undefined {
    logger.debug(`Passed argument to isUndefined: ${safeExtractText(value)}`);
    return value === undefined;
}

/**
 * Type guard that checks if a value is null or undefined
 * @param value - The value to check
 * @returns True if the value is null or undefined, false otherwise
 */
export function isNullOrUndefined(value: unknown): value is null | undefined {
    logger.debug(`Passed argument to isNullOrUndefined: ${safeExtractText(value)}`);
    return isNull(value) || isUndefined(value);
}

/**
 * Returns a default value when the input is null or undefined
 * @param value - The value to check
 * @param defaultValue - The default value to return if the input is null/undefined
 * @returns The original value if not null/undefined, otherwise the default value
 */
export function getDefaultOnNull(value: unknown, defaultValue: unknown): unknown {
    logger.debug(
        `Passed arguments to getDefaultOnNull: value - ${safeExtractText(value)}, default - ${safeExtractText(defaultValue)}`,
    );
    return isNullOrUndefined(value) ? defaultValue : value;
}

/**
 * Checks if a value is an empty array or null/undefined
 * @param value - The value to check (accepts undefined, null, or array)
 * @returns True if the value is null, undefined, or an empty array
 */
export function isEmptyArray(value: undefined | null | unknown[]): boolean {
    logger.debug(`Passed arguments to isEmptyArray: ${safeExtractText(value)}`);
    return value === undefined || value === null || value.length === 0;
}
