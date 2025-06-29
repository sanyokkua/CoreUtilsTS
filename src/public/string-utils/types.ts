import { removeDuplicates, shuffleLines, sortLines, splitLines, splitStringIntoLines } from '../../string/line-utils';
import { DetermineStringCaseProps, LineSeparator, StringCaseTypes } from '../../string/types';

/**
 * Utility class for converting strings to various cases.
 */
export interface ICaseUtils {
    /**
     * Determines the case of a given string based on specified properties.
     *
     * @param input - The input string to evaluate.
     * @param props - Optional properties that may influence the determination of the string's case.
     * @returns A value representing the determined case type.
     */
    determineCase(input: string, props?: DetermineStringCaseProps): StringCaseTypes;

    /**
     * Converts a string to lowercase.
     *
     * @param input - The string to convert.
     * @returns The string converted to lowercase.
     */
    toLowerCase(input: string): string;

    /**
     * Converts a string to uppercase.
     *
     * @param input - The string to convert.
     * @returns The string converted to uppercase.
     */
    toUpperCase(input: string): string;

    /**
     * Converts a string to lowercase strictly, handling edge cases.
     *
     * @param input - The string to convert.
     * @returns The string converted to lowercase in a strict manner.
     */
    toLowerCaseStrict(input: string): string;

    /**
     * Converts a string to uppercase strictly, handling edge cases.
     *
     * @param input - The string to convert.
     * @returns The string converted to uppercase in a strict manner.
     */
    toUpperCaseStrict(input: string): string;

    /**
     * Converts a string to sentence case.
     *
     * @param input - The string to convert.
     * @returns The string converted to sentence case.
     */
    toSentenceCase(input: string): string;

    /**
     * Converts a string to title case.
     *
     * @param input - The string to convert.
     * @returns The string converted to title case.
     */
    toTitleCase(input: string): string;

    /**
     * Converts a string to camel case.
     *
     * @param input - The string to convert.
     * @returns The string converted to camel case.
     */
    toCamelCase(input: string): string;

    /**
     * Converts a string to Pascal case.
     *
     * @param input - The string to convert.
     * @returns The string converted to Pascal case.
     */
    toPascalCase(input: string): string;

    /**
     * Converts a string to snake case.
     *
     * @param input - The string to convert.
     * @returns The string converted to snake case.
     */
    toSnakeCase(input: string): string;

    /**
     * Converts a string to screaming snake case.
     *
     * @param input - The string to convert.
     * @returns The string converted to screaming snake case.
     */
    toScreamingSnakeCase(input: string): string;

    /**
     * Converts a string to kebab case.
     *
     * @param input - The string to convert.
     * @returns The string converted to kebab case.
     */
    toKebabCase(input: string): string;

    /**
     * Converts a string to COBOL case.
     *
     * @param input - The string to convert.
     * @returns The string converted to COBOL case.
     */
    toCobolCase(input: string): string;

    /**
     * Converts a string to train case.
     *
     * @param input - The string to convert.
     * @returns The string converted to train case.
     */
    toTrainCase(input: string): string;

    /**
     * Converts a string to dot case.
     *
     * @param input - The string to convert.
     * @returns The string converted to dot case.
     */
    toDotCase(input: string): string;

    /**
     * Converts a string to slash case.
     *
     * @param input - The string to convert.
     * @returns The string converted to slash case.
     */
    toSlashCase(input: string): string;

    /**
     * Swaps the case of each character in the string.
     *
     * @param input - The string to process.
     * @returns A new string with swapped case for each character.
     */
    swapCase(input: string): string;

    /**
     * Capitalizes the first letter of a string.
     *
     * @param input - The string to capitalize.
     * @returns A new string with the first letter capitalized.
     */
    capitalize(input: string): string;

    /**
     * Uncapitalizes the first letter of a string.
     *
     * @param input - The string to uncapitalize.
     * @returns A new string with the first letter uncapitalized.
     */
    uncapitalize(input: string): string;
}

/**
 * Interface defining utility functions for line manipulation.
 */
export interface ILineUtils {
    /**
     * Splits a string by the provided splitter and returns an array of trimmed, non-empty substrings.
     *
     * @param data - The input string to split.
     * @param splitter - The delimiter as a string or RegExp.
     * @returns An array of non-empty, trimmed substrings.
     */
    splitStringIntoLines: typeof splitStringIntoLines;

    /**
     * Splits the input string into lines using common line break characters.
     *
     * @param data - The input string.
     * @returns An array of non-empty, trimmed lines.
     */
    splitLines: typeof splitLines;

    /**
     * Sorts an array of strings according to the provided sorting type.
     *
     * @param arr - The array of strings to sort.
     * @param sortType - The sorting type to use (defaults to ascending).
     * @returns A new sorted array.
     */
    sortLines: typeof sortLines;

    /**
     * Randomizes the order of strings in an array using the Fisher–Yates shuffle.
     *
     * @param arr - The array of strings to shuffle.
     * @returns A new array with strings in randomized order.
     */
    shuffleLines: typeof shuffleLines;

    /**
     * Removes duplicate strings from an array.
     *
     * @param strings - The array of strings to process.
     * @param ignoreCase - Whether to treat strings as equal irrespective of case (defaults to false).
     * @returns A new array with duplicates removed.
     */
    removeDuplicates: typeof removeDuplicates;
}

/**
 * Utility class for performing common string operations.
 */
export interface IStringUtils {
    /**
     * Checks if the provided value is of type string.
     *
     * @param value - The value to check.
     * @returns A boolean indicating whether the value is a string.
     */
    isString(value: unknown): value is string;

    /**
     * Checks if the given input is an empty string.
     *
     * @param str - The input to check, which can be undefined, null, or a string.
     * @returns A boolean indicating whether the input is an empty string.
     */
    isEmptyString(str: undefined | null | string): boolean;

    /**
     * Checks if the provided string is blank (i.e., empty or consists only of whitespace).
     *
     * @param str - The string to check.
     * @returns `true` if the string is blank, otherwise `false`.
     */
    isBlankString(str: string): boolean;

    /**
     * Checks if the provided value is `null`, `undefined`, or a blank string (containing only whitespace).
     *
     * @param value - The value to check.
     * @returns `true` if the value is `null`, `undefined`, or a blank string; otherwise, `false`.
     */
    isNullOrBlankString(value: undefined | null | string): boolean;

    /**
     * Checks if the input string starts with the specified value.
     *
     * @param inputString - The string to be checked.
     * @param value - The prefix value to compare against the start of the input string.
     * @returns A boolean indicating whether the input string starts with the given value.
     */
    startsWith(inputString: string, value: string): boolean;

    /**
     * Checks if the given input string ends with the specified value.
     *
     * @param inputString - The string to be checked.
     * @param value - The substring to look for at the end of the input string.
     * @returns Returns true if `inputString` ends with `value`, otherwise false.
     */
    endsWith(inputString: string, value: string): boolean;

    /**
     * Checks if the specified input string contains the given value.
     *
     * @param inputString - The string to search within.
     * @param value - The substring or character to look for in the input string.
     * @returns A boolean indicating whether the input string contains the value.
     */
    contains(inputString: string, value: string): boolean;

    /**
     * Splits a string into an array of substrings based on the specified separator.
     *
     * @param value - The string to be split.
     * @param separator - Optional line separator. If not provided, defaults to newline characters.
     * @returns An array of substrings after splitting the input string.
     */
    splitString(value: string, separator?: LineSeparator): string[];

    /**
     * Joins an array of strings into a single string, separated by a specified symbol.
     *
     * @param strings - The array of strings to be joined.
     * @param joinSymbol - Optional. The symbol used to separate the strings. Defaults to `LineSeparator.NEW_LINE`.
     * @returns A single string with the input strings joined by the specified symbol.
     */
    joinStrings(strings: string[], joinSymbol?: LineSeparator): string;

    /**
     * Adds a specified suffix to a given string if it does not already end with that suffix.
     *
     * @param value - The string to which the suffix will be added if missing.
     * @param suffix - The suffix to add to the string.
     * @returns The original string with the suffix added, or the original string if it already ends with the suffix.
     */
    addSuffixIfMissing(value: string, suffix: string): string;

    /**
     * Adds a specified prefix to a given string value if it does not already start with that prefix.
     *
     * @param value - The original string to which the prefix may be added.
     * @param prefix - The prefix to add if it is missing from the value.
     * @returns The modified string with the prefix added, if necessary.
     */
    addPrefixIfMissing(value: string, prefix: string): string;

    /**
     * Removes the specified prefix from the beginning of the given value if it is present.
     *
     * @param originalValue - The string from which to remove the prefix.
     * @param prefix - The prefix to check for and remove.
     * @returns The modified string with the prefix removed, or the original string if the prefix was not found.
     */
    removePrefixIfPresent(originalValue: string, prefix: string): string;

    /**
     * Removes the specified suffix from the end of a string if it is present.
     *
     * @param originalValue - The original string from which to remove the suffix.
     * @param suffix - The suffix to check for and remove from the original string.
     * @returns The modified string with the suffix removed, or the original string if the suffix was not present.
     */
    removeSuffixIfPresent(originalValue: string, suffix: string): string;

    /**
     * Replaces all occurrences of a specified substring within a given string with a new value.
     *
     * @param originalString - The string in which to search and replace substrings.
     * @param substringToReplace - The substring that will be replaced.
     * @param replacementValue - The string that will replace the old substring.
     * @returns A new string with all instances of the specified substring replaced by the replacement value.
     */
    replaceSubstring(originalString: string, substringToReplace: string, replacementValue: string): string;

    /**
     * Returns a default string if the input value is null or undefined.
     * If no default value is provided, returns an empty string by default.
     *
     * @param value - The input string which may be null or undefined.
     * @param defaultValue - An optional string to return if the input value is null or undefined.
     * @returns The input value if it's a string, otherwise the default value or an empty string.
     */
    getDefaultStringOnNull(value: string | null | undefined, defaultValue?: string): string;

    /**
     * Safely extracts text from a given value.
     * Converts the input to a string if possible; otherwise, returns an empty string.
     *
     * @param value - The input from which to extract text.
     * @returns A string representation of the input or an empty string if conversion fails.
     */
    safeExtractText(value: unknown): string;

    /**
     * Converts a given string into a URL-friendly slug.
     * Replaces spaces and special characters with a specified separator.
     * Can convert the string to lowercase if specified.
     *
     * @param value - The original string to be converted.
     * @param separator - The character used to replace spaces and special characters. Defaults to '-'.
     * @param lower - Indicates whether the resulting slug should be in lowercase. Defaults to false.
     * @param locale - The locale to use for locale-sensitive transformations. Uses default locale if not provided.
     *
     * @returns A string that is URL-friendly, with spaces and special characters replaced by the separator.
     */
    slugifyString(value: string, separator?: string, lower?: boolean, locale?: string): string;

    /**
     * Encodes a URL by replacing each instance of certain characters with their corresponding UTF-8 entities.
     *
     * @param value - The URL to be encoded.
     * @returns The encoded URL as a string.
     */
    encodeUrl(value: string): string;

    /**
     * Decodes a URL-encoded string back to its original form.
     *
     * @param value - The URL-encoded string to be decoded.
     * @return The decoded string with special characters converted to their original representation.
     */
    decodeUrl(value: string): string;

    /**
     * Determines if the provided input string contains any non-alphanumeric characters.
     *
     * @param input - The string to be checked for alphanumeric content.
     * @returns A boolean indicating whether the input string contains any non-alphanumeric characters.
     */
    isNotAlphanumeric(input: string): boolean;

    /**
     * Checks if the given string is alphanumeric, containing only letters and numbers.
     *
     * @param input - The string to be checked.
     * @returns `true` if the string is alphanumeric, otherwise `false`.
     */
    isAlphanumeric(input: string): boolean;
}

/**
 * Interface for encoding and decoding utilities.
 */
export interface IEncodingUtils {
    /**
     * Encodes a given string into Base64 format.
     * @param input - The string to be encoded.
     * @returns The Base64 encoded string.
     */
    encodeBase64(input: string): string;

    /**
     * Encodes a given string into Base64 URL format.
     * @param input - The string to be encoded.
     * @returns The Base64 URL encoded string.
     */
    encodeBase64Url(input: string): string;

    /**
     * Decodes a Base64 encoded string back to its original form.
     * @param input - The Base64 encoded string to be decoded.
     * @returns The original decoded string.
     */
    decodeBase64(input: string): string;
}

/**
 * Encodes the input string using SHA-1 hashing algorithm.
 *
 * @param input - The input string to be hashed.
 * @returns A promise resolving with the encoded hash value as a hexadecimal string.
 */
export interface IHashingUtils {
    encodeSHA1(input: string): Promise<string>;
}

/**
 * Encodes the input string using SHA-256 hashing algorithm.
 *
 * @param input - The input string to be hashed.
 * @returns A promise resolving with the encoded hash value as a hexadecimal string.
 */
export interface IHashingUtils {
    encodeSHA256(input: string): Promise<string>;
}

/**
 * Encodes the input string using SHA-384 hashing algorithm.
 *
 * @param input - The input string to be hashed.
 * @returns A promise resolving with the encoded hash value as a hexadecimal string.
 */
export interface IHashingUtils {
    encodeSHA384(input: string): Promise<string>;
}

/**
 * Encodes the input string using SHA-512 hashing algorithm.
 *
 * @param input - The input string to be hashed.
 * @returns A promise resolving with the encoded hash value as a hexadecimal string.
 */
export interface IHashingUtils {
    encodeSHA512(input: string): Promise<string>;
}

/**
 * Encodes the input string using MD5 hashing algorithm.
 *
 * @param input - The input string to be hashed.
 * @returns A promise resolving with the encoded hash value as a hexadecimal string.
 */
export interface IHashingUtils {
    encodeMD5(input: string): Promise<string>;
}
