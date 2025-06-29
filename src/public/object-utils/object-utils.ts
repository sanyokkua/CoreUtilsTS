import { getDefaultOnNull, isEmptyArray, isNull, isNullOrUndefined, isUndefined } from '../../object/object-utils';
import { IObjectUtils } from './types';

/**
 * Implementation class for object utility functions.
 * Provides concrete implementations of type guards and value checks.
 */
export class ObjectUtilsImpl implements IObjectUtils {
    /**
     * Checks if a value is strictly null using the `isNull` function.
     * @param value The value to check
     * @returns True if the value is exactly null, false otherwise
     */
    isNull(value: unknown) {
        return isNull(value);
    }

    /**
     * Checks if a value is undefined using the `isUndefined` function.
     * @param value The value to check
     * @returns True if the value is undefined, false otherwise
     */
    isUndefined(value: unknown) {
        return isUndefined(value);
    }

    /**
     * Combines null and undefined checks with logging for debugging purposes.
     * @param value The value under evaluation
     * @returns True if the value is either null or undefined, false otherwise
     */
    isNullOrUndefined(value: unknown) {
        return isNullOrUndefined(value);
    }

    /**
     * Returns a default value when an input evaluates as null/undefined using `getDefaultOnNull`.
     * Logs inputs before returning the result.
     * @param value The value being evaluated
     * @param defaultValue The fallback if evaluation fails
     * @returns Either the original value or provided default
     */
    getDefaultOnNull(value: unknown, defaultValue: unknown): unknown {
        return getDefaultOnNull(value, defaultValue);
    }

    /**
     * Determines if a value is an empty array using `isEmptyArray`.
     * Also handles null and undefined cases before checking array length.
     * @param value The potential array to check
     * @returns True if the value represents an empty state (null/undefined or empty array), false otherwise
     */
    isEmptyArray(value: undefined | null | unknown[]): boolean {
        return isEmptyArray(value);
    }
}
