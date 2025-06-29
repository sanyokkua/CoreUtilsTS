/**
 * Interface defining utility methods for object-related operations.
 */
export interface IObjectUtils {
    /**
     * Type guard to check if a given value is strictly null.
     * @param value The value to test against being null
     */
    isNull(value: unknown): value is null;

    /**
     * Type guard to check if a given value is undefined.
     * @param value The value to test for undefined state
     */
    isUndefined(value: unknown): value is undefined;

    /**
     * Combines `isNull` and `isUndefined` type guards to check for null or undefined values.
     * @param value The value under evaluation
     */
    isNullOrUndefined(value: unknown): value is null | undefined;

    /**
     * Returns a default value when an input parameter evaluates as null or undefined.
     * @param value The value being evaluated against default
     * @param defaultValue The fallback value if `value` is not set
     */
    getDefaultOnNull(value: unknown, defaultValue: unknown): unknown;

    /**
     * Checks whether a given value is an empty array or falls into null/undefined categories.
     * @param value The potential empty array to test against being empty
     * @returns Boolean indicating if the input matches any of the emptiness conditions
     */
    isEmptyArray(value: undefined | null | unknown[]): boolean;
}
