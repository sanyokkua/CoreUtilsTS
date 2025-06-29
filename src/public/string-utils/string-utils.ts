import {
    addPrefixIfMissing,
    addSuffixIfMissing,
    contains,
    decodeUrl,
    encodeUrl,
    endsWith,
    getDefaultStringOnNull,
    isAlphanumeric,
    isBlankString,
    isEmptyString,
    isNotAlphanumeric,
    isNullOrBlankString,
    isString,
    joinStrings,
    removePrefixIfPresent,
    removeSuffixIfPresent,
    replaceSubstring,
    safeExtractText,
    slugifyString,
    splitString,
    startsWith,
} from '../../string/string-utils';
import { EMPTY, LineSeparator, LineSeparators } from '../../string/types';
import { IStringUtils } from './types';

/**
 * Implementation of string utility functions.
 */
export class StringUtilsImpl implements IStringUtils {
    /**
     * Determines if the given value is a string.
     *
     * @param value - The value to check.
     * @returns True if the value is a non-null, non-undefined string.
     */
    isString(value: unknown): value is string {
        return isString(value);
    }

    /**
     * Checks if the provided string is empty.
     *
     * @param str - The string to check (can be undefined or null).
     * @returns True if the string is not null/undefined and its length is 0.
     */
    isEmptyString(str: undefined | null | string): boolean {
        return isEmptyString(str);
    }

    /**
     * Checks if the provided string is blank (i.e., only whitespace characters).
     *
     * @param str - The string to check.
     * @returns True if the string is not null/undefined and its trimmed length is 0.
     */
    isBlankString(str: string): boolean {
        return isBlankString(str);
    }

    /**
     * Determines if the given string value is null, undefined, or blank.
     *
     * @param value - The string to check (can be undefined or null).
     * @returns True if the string is either null, undefined, or blank.
     */
    isNullOrBlankString(value: undefined | null | string): boolean {
        return isNullOrBlankString(value);
    }

    /**
     * Checks if the input string starts with the specified value.
     *
     * @param inputString - The string to inspect.
     * @param value - The prefix to look for.
     * @returns True if inputString starts with the given value.
     */
    startsWith(inputString: string, value: string): boolean {
        return startsWith(inputString, value);
    }

    /**
     * Checks if the input string ends with the specified value.
     *
     * @param inputString - The string to inspect.
     * @param value - The suffix to look for.
     * @returns True if inputString ends with the given value.
     */
    endsWith(inputString: string, value: string): boolean {
        return endsWith(inputString, value);
    }

    /**
     * Determines if the input string contains the specified substring.
     *
     * @param inputString - The string to search within.
     * @param value - The substring to look for.
     * @returns True if inputString contains the given substring.
     */
    contains(inputString: string, value: string): boolean {
        return contains(inputString, value);
    }

    /**
     * Splits the input string into an array of substrings using the specified separator.
     *
     * @param value - The string to split.
     * @param separator - The delimiter to use for splitting the string (defaults to Linux line separator).
     * @returns An array of substrings.
     */
    splitString(value: string, separator: LineSeparator = LineSeparators.LINUX): string[] {
        return splitString(value, separator);
    }

    /**
     * Joins an array of strings into a single string using the specified join symbol.
     *
     * @param strings - The array of strings to join.
     * @param joinSymbol - The string to insert between each element (defaults to Linux line separator).
     * @returns A single concatenated string.
     */
    joinStrings(strings: string[], joinSymbol: LineSeparator = LineSeparators.LINUX): string {
        return joinStrings(strings, joinSymbol);
    }

    /**
     * Adds a suffix if it doesn't already exist on the value.
     *
     * @param value - The original string.
     * @param suffix - The suffix to append if missing.
     * @returns The modified or original string with the suffix added.
     */
    addSuffixIfMissing(value: string, suffix: string): string {
        return addSuffixIfMissing(value, suffix);
    }

    /**
     * Adds a prefix if it doesn't already exist on the value.
     *
     * @param value - The original string.
     * @param prefix - The prefix to prepend if missing.
     * @returns The modified or original string with the prefix added.
     */
    addPrefixIfMissing(value: string, prefix: string): string {
        return addPrefixIfMissing(value, prefix);
    }

    /**
     * Removes a prefix if it's present at the beginning of the value.
     *
     * @param originalValue - The original string.
     * @param prefix - The prefix to remove.
     * @returns A new string with the prefix removed if present.
     */
    removePrefixIfPresent(originalValue: string, prefix: string): string {
        return removePrefixIfPresent(originalValue, prefix);
    }

    /**
     * Removes a suffix if it's present at the end of the value.
     *
     * @param originalValue - The original string.
     * @param suffix - The suffix to remove.
     * @returns A new string with the suffix removed if present.
     */
    removeSuffixIfPresent(originalValue: string, suffix: string): string {
        return removeSuffixIfPresent(originalValue, suffix);
    }

    /**
     * Replaces a substring within the original string with another value.
     *
     * @param originalString - The original string to modify.
     * @param substringToReplace - The substring to find and replace.
     * @param replacementValue - The new substring to use as replacement.
     * @returns A new string with all occurrences of substring replaced by replacementValue.
     */
    replaceSubstring(originalString: string, substringToReplace: string, replacementValue: string): string {
        return replaceSubstring(originalString, substringToReplace, replacementValue);
    }

    /**
     * Returns the provided value or a default empty string if it's null/undefined.
     *
     * @param value - The value to check and possibly return.
     * @param defaultValue - The fallback value (defaults to an empty string).
     * @returns The non-null, non-undefined string from the input parameter.
     */
    getDefaultStringOnNull(value: string | null | undefined, defaultValue: string = EMPTY): string {
        return getDefaultStringOnNull(value, defaultValue);
    }

    /**
     * Safely extracts text from an unknown value by converting it to a string if possible.
     *
     * @param value - The value whose content is being checked or converted.
     * @returns A string representation of the provided parameter.
     */
    safeExtractText(value: unknown): string {
        return safeExtractText(value);
    }

    /**
     * Converts the input text into a URL-friendly slug format.
     *
     * @param value - The original string to convert.
     * @param separator - Custom delimiter character for joining words (defaults to hyphen).
     * @param lower - Whether the output should be in lowercase (default false).
     * @param locale - Language/locale settings for international characters (default 'en').
     * @returns A slugified version of the input string.
     */
    slugifyString(value: string, separator?: string, lower: boolean = false, locale: string = 'en'): string {
        return slugifyString(value, separator, lower, locale);
    }

    /**
     * URL-encodes a given text using standard encoding rules.
     *
     * @param value - The original string to encode.
     * @returns A URL-encoded representation of the input string.
     */
    encodeUrl(value: string): string {
        return encodeUrl(value);
    }

    /**
     * Decodes a URL-encoded text back into its original form.
     *
     * @param value - The encoded string to decode.
     * @returns The decoded version of the provided parameter.
     */
    decodeUrl(value: string): string {
        return decodeUrl(value);
    }

    /**
     * Checks if a given string contains any non-alphanumeric characters (not letters or numbers).
     *
     * @param input - The string to check for special characters.
     * @returns True if the string has at least one character that's not alphanumeric, false otherwise.
     */
    isNotAlphanumeric(input: string): boolean {
        return isNotAlphanumeric(input);
    }

    /**
     * Checks if a given string contains only letters and numbers (alphanumeric).
     *
     * @param input - The string to check for alphanumeric characters.
     * @returns True if the string has no special characters besides letters and numbers, false otherwise.
     */
    isAlphanumeric(input: string): boolean {
        return isAlphanumeric(input);
    }
}
