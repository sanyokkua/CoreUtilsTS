import slugify from 'slugify';
import { extractErrorDetails } from '../error/error-utils';
import { getLogger } from '../logging/logger-utils';
import { isNullOrUndefined } from '../object/object-utils';
import { EMPTY, LineSeparator, LineSeparators } from './types';

const logger = getLogger();

/**
 * Determines if the given value is a string.
 *
 * @param value - The value to check.
 * @returns True if the value is a non-null, non-undefined string.
 */
export function isString(value: unknown): value is string {
    logger.debug(`Passed arguments to isString: ${safeExtractText(value)}`);
    return !isNullOrUndefined(value) && typeof value === 'string';
}

/**
 * Checks if the provided string is empty.
 *
 * @param str - The string to check (can be undefined or null).
 * @returns True if the string is not null/undefined and its length is 0.
 */
export function isEmptyString(str: undefined | null | string): boolean {
    logger.debug(`Passed arguments to isEmptyString: ${safeExtractText(str)}`);
    return !isNullOrUndefined(str) && str.length === 0;
}

/**
 * Checks if the provided string is blank (i.e., only whitespace characters).
 *
 * @param str - The string to check.
 * @returns True if the string is not null/undefined and its trimmed length is 0.
 */
export function isBlankString(str: string): boolean {
    logger.debug(`Passed arguments to isBlankString: ${safeExtractText(str)}`);
    return !isNullOrUndefined(str) && str.trim().length === 0;
}

/**
 * Determines if the given string value is null, undefined, or blank.
 *
 * @param value - The string to check (can be undefined or null).
 * @returns True if the string is either null, undefined, or blank.
 */
export function isNullOrBlankString(value: undefined | null | string): boolean {
    logger.debug(`Passed arguments to isNullOrBlankString: ${safeExtractText(value)}`);
    return isNullOrUndefined(value) || isBlankString(value);
}

/**
 * Checks if the input string starts with the specified value.
 *
 * @param inputString - The string to inspect.
 * @param value - The prefix to look for.
 * @returns True if inputString starts with the given value.
 */
export function startsWith(inputString: string, value: string): boolean {
    logger.debug(
        `Passed arguments to startsWith: in - ${safeExtractText(inputString)}, prefix - ${safeExtractText(value)}`,
    );
    return inputString.startsWith(value);
}

/**
 * Checks if the input string ends with the specified value.
 *
 * @param inputString - The string to inspect.
 * @param value - The suffix to look for.
 * @returns True if inputString ends with the given value.
 */
export function endsWith(inputString: string, value: string): boolean {
    logger.debug(
        `Passed arguments to endsWith: in - ${safeExtractText(inputString)}, suffix - ${safeExtractText(value)}`,
    );
    return inputString.endsWith(value);
}

/**
 * Determines if the input string contains the specified substring.
 *
 * @param inputString - The string to search within.
 * @param value - The substring to look for.
 * @returns True if inputString contains the given substring.
 */
export function contains(inputString: string, value: string): boolean {
    logger.debug(`Passed arguments to contains: in - ${safeExtractText(inputString)}, val - ${safeExtractText(value)}`);
    return inputString.includes(value);
}

/**
 * Splits the input string into an array of substrings using the specified separator.
 *
 * @param value - The string to split.
 * @param separator - The delimiter to use for splitting the string (defaults to Linux line separator).
 * @returns An array of substrings.
 */
export function splitString(value: string, separator: LineSeparator = LineSeparators.LINUX): string[] {
    logger.debug(
        `Passed arguments to splitString: in - ${safeExtractText(value)}, separator - ${safeExtractText(separator)}`,
    );
    return value.split(separator);
}

/**
 * Joins an array of strings into a single string using the specified join symbol.
 *
 * @param strings - The array of strings to join.
 * @param joinSymbol - The string to insert between each element (defaults to Linux line separator).
 * @returns A single concatenated string.
 */
export function joinStrings(strings: string[], joinSymbol: LineSeparator = LineSeparators.LINUX): string {
    logger.debug(
        `Passed arguments to joinStrings: in - ${safeExtractText(strings)}, separator - ${safeExtractText(joinSymbol)}`,
    );
    const filtered = strings.filter((s) => s.length > 0);
    return filtered.join(joinSymbol);
}

/**
 * Appends the given suffix to the string if it is not already present.
 *
 * @param value - The original string.
 * @param suffix - The suffix to add.
 * @returns The modified string with the suffix added if it was missing.
 */
export function addSuffixIfMissing(value: string, suffix: string): string {
    logger.debug(
        `Passed arguments to addSuffixIfMissing: in - ${safeExtractText(value)}, suffix - ${safeExtractText(suffix)}`,
    );
    return endsWith(value, suffix) ? value : value + suffix;
}

/**
 * Prepends the given prefix to the string if it is not already present.
 *
 * @param value - The original string.
 * @param prefix - The prefix to add.
 * @returns The modified string with the prefix added if it was missing.
 */
export function addPrefixIfMissing(value: string, prefix: string): string {
    logger.debug(
        `Passed arguments to addPrefixIfMissing: in - ${safeExtractText(value)}, prefix - ${safeExtractText(prefix)}`,
    );
    return startsWith(value, prefix) ? value : prefix + value;
}

/**
 * Removes the specified prefix from the original string if it is present.
 *
 * @param originalValue - The string from which to remove the prefix.
 * @param prefix - The prefix to remove.
 * @returns The string without the prefix if it was present; otherwise, the original string.
 */
export function removePrefixIfPresent(originalValue: string, prefix: string): string {
    logger.debug(
        `Passed arguments to removePrefixIfPresent: ${safeExtractText(originalValue)}, prefix - ${safeExtractText(prefix)}`,
    );
    if (isNullOrBlankString(prefix)) {
        return originalValue;
    }
    return startsWith(originalValue, prefix) ? originalValue.slice(prefix.length) : originalValue;
}

/**
 * Removes the specified suffix from the original string if it is present.
 *
 * @param originalValue - The string from which to remove the suffix.
 * @param suffix - The suffix to remove.
 * @returns The string without the suffix if it was present; otherwise, the original string.
 */
export function removeSuffixIfPresent(originalValue: string, suffix: string): string {
    logger.debug(
        `Passed arguments to removeSuffixIfPresent: ${safeExtractText(originalValue)}, suffix - ${safeExtractText(suffix)}`,
    );
    if (isNullOrBlankString(suffix)) {
        return originalValue;
    }
    return endsWith(originalValue, suffix) ? originalValue.slice(0, -suffix.length) : originalValue;
}

/**
 * Replaces all occurrences of a substring within a string with a new value.
 *
 * @param originalString - The string in which to replace occurrences.
 * @param substringToReplace - The substring to be replaced.
 * @param replacementValue - The value to replace each occurrence with.
 * @returns The string with all occurrences replaced.
 */
export function replaceSubstring(originalString: string, substringToReplace: string, replacementValue: string): string {
    logger.debug(
        `Passed arguments to replaceSubstring: ${safeExtractText(originalString)}, substring - ${safeExtractText(substringToReplace)} replacement - ${safeExtractText(replacementValue)}`,
    );
    return originalString.replace(new RegExp(substringToReplace, 'g'), replacementValue);
}

/**
 * Returns a default value if the provided value is null or undefined.
 *
 * @param value - The string value to check.
 * @param defaultValue - The default string to return if the value is null or undefined (defaults to EMPTY).
 * @returns The original string if it is not null/undefined; otherwise, the default value.
 */
export function getDefaultStringOnNull(value: string | null | undefined, defaultValue: string = EMPTY): string {
    logger.debug(
        `Passed arguments to getDefaultOnNull: ${safeExtractText(value)}, defaultValue - ${safeExtractText(defaultValue)}`,
    );
    if (isNullOrUndefined(value)) {
        return defaultValue;
    }
    return value;
}

/**
 * Safely extracts text from an unknown value.
 *
 * Rules:
 * - If the value is null, returns the string "null".
 * - If the value is undefined, returns the string "undefined".
 * - If the value is a string, returns the original string.
 * - If the value is a number, returns its string representation.
 * - If the value is an object, attempts to JSON.stringify it.
 *    If JSON.stringify throws, returns a fallback message.
 * - For any other type (e.g., boolean, function, symbol, bigint),
 *    attempts to coerce it to string.
 *
 * @param value - The value from which to extract text.
 * @returns The extracted text representation.
 */
export function safeExtractText(value: unknown): string {
    if (value === null) {
        return 'null';
    }

    if (value === undefined) {
        return 'undefined';
    }

    if (typeof value === 'string') {
        return value;
    }

    if (typeof value === 'number') {
        return value.toString();
    }

    if (typeof value === 'object') {
        try {
            return JSON.stringify(value);
        } catch (e) {
            const errMsg = extractErrorDetails(e);
            logger.warning(errMsg);
            return '';
        }
    }

    // For other types such as boolean, function, symbol, or bigint,
    // attempt a simple conversion.
    try {
        // eslint-disable-next-line  @typescript-eslint/no-base-to-string
        return String(value);
    } catch (e) {
        const errMsg = extractErrorDetails(e);
        logger.warning(errMsg);
        return '';
    }
}

/**
 * Converts a string into a slug format.
 *
 * @param value - The string to be slugified.
 * @param separator - The separator to use between words. Defaults to `'-'`.
 * @param lower - Whether to convert the string to lowercase. Defaults to `false`.
 * @param locale - The locale used for transformations. Defaults to `'en'`.
 * @returns The slugified string.
 */
export function slugifyString(
    value: string,
    separator?: string,
    lower: boolean = false,
    locale: string = 'en',
): string {
    return slugify(value, {
        replacement: separator ?? '-',
        remove: undefined,
        lower: lower,
        strict: false,
        locale: locale,
        trim: true,
    });
}

/**
 * Encodes a string to be used in a URI component.
 * Replaces certain characters with their UTF-8 escape sequences.
 * Example: "a b" -> "a%20b"
 *
 * @param value The string to encode.
 * @returns The encoded string.
 */
export function encodeUrl(value: string): string {
    try {
        return encodeURIComponent(value);
    } catch (e) {
        logger.error('Error encoding URI component:', e);
        throw e;
    }
}

/**
 * Decodes a string that has been URI component encoded.
 * Replaces UTF-8 escape sequences with their corresponding characters.
 * Example: "a%20b" -> "a b"
 *
 * @param value The encoded string to decode.
 * @returns The decoded string.
 */
export function decodeUrl(value: string): string {
    try {
        return decodeURIComponent(value);
    } catch (e) {
        logger.error('Error decoding URI component:', e);
        throw e;
    }
}

/**
 * Determines if the provided input contains non-alphanumeric characters.
 *
 * @param input The string to check for alphanumeric validity.
 * @returns A boolean indicating whether the input contains non-alphanumeric characters (true) or not (false).
 */
export function isNotAlphanumeric(input: string): boolean {
    return !isAlphanumeric(input);
}

/**
 * Determines whether the given input contains only letters and numbers.
 *
 * @param input The string to check for alphanumeric characters.
 * @returns `true` if the input contains only alphanumeric characters; otherwise, `false`.
 */
export function isAlphanumeric(input: string): boolean {
    if (input.trim().length == 0) {
        return false;
    }
    return /^[\p{L}\p{N}]+$/u.test(input);
}
