import { getLogger } from '../logging/logger-utils';
import { isEmptyArray } from '../object/object-utils';
import { isNullOrBlankString, safeExtractText } from './string-utils';
import { SortingTypes } from './types';

const logger = getLogger();

/**
 * Splits a string by the provided splitter and returns an array of trimmed, non-empty substrings.
 *
 * @param data - The input string to split.
 * @param splitter - The delimiter as a string or RegExp.
 * @returns An array of non-empty, trimmed substrings.
 * @throws Error if splitter is null or undefined.
 */
export function splitStringIntoLines(data: string | null | undefined, splitter: RegExp | string): string[] {
    if (isNullOrBlankString(data) || typeof data !== 'string') {
        logger.info(`No data to split`);
        return [];
    }
    if (!splitter) {
        logger.error(`Splitter must present`);
        throw new Error('Splitter is null or undefined');
    }
    logger.debug(`Text to split: ${data}`);

    return data
        .split(splitter)
        .filter((part: string) => part.trim().length > 0)
        .map((part) => part.trim());
}

/**
 * Splits the input string into lines using common line break characters.
 *
 * @param data - The input string.
 * @returns An array of non-empty, trimmed lines.
 */
export function splitLines(data: string | null | undefined): string[] {
    const lineSeparator: RegExp = /[\r\n]+/;
    return splitStringIntoLines(data, lineSeparator);
}

/**
 * Sorts an array of strings according to the provided sorting type.
 *
 * @param arr - The array of strings to sort.
 * @param sortType - The sorting type to use (defaults to ascending).
 * @returns A new sorted array.
 */
export function sortLines(arr: string[] | null | undefined, sortType: SortingTypes = SortingTypes.ASC): string[] {
    if (isEmptyArray(arr) || !Array.isArray(arr)) {
        logger.info(`Passed arguments to sortStrings is not valid. [] will be returned`);
        return [];
    }
    logger.info(`SortingType is: ${sortType}`);

    const copy = arr.slice();
    const isDescending = sortType === SortingTypes.DSC || sortType === SortingTypes.DSC_IGN_CASE;
    const ignoreCase = sortType === SortingTypes.ASC_IGN_CASE || sortType === SortingTypes.DSC_IGN_CASE;
    return copy.sort((a, b) => {
        const aVal = ignoreCase ? a.toLowerCase() : a;
        const bVal = ignoreCase ? b.toLowerCase() : b;
        if (aVal > bVal) {
            return isDescending ? -1 : 1;
        }
        if (aVal < bVal) {
            return isDescending ? 1 : -1;
        }
        return 0;
    });
}

/**
 * Randomizes the order of strings in an array using the Fisher–Yates shuffle.
 *
 * @param arr - The array of strings to shuffle.
 * @returns A new array with strings in randomized order.
 */
export function shuffleLines(arr: string[] | null | undefined): string[] {
    if (isEmptyArray(arr) || !Array.isArray(arr)) {
        logger.info(`Passed arguments to shuffleStrings is not valid. [] will be returned`);
        return [];
    }
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

/**
 * Removes duplicate strings from an array.
 *
 * @param strings - The array of strings to process.
 * @param ignoreCase - Whether to treat strings as equal irrespective of case (defaults to false).
 * @returns A new array with duplicates removed.
 */
export function removeDuplicates(strings: string[] | null | undefined, ignoreCase: boolean = false): string[] {
    if (isEmptyArray(strings) || !Array.isArray(strings)) {
        logger.info(`Passed arguments to removeDuplicates is not valid. [] will be returned`);
        return [];
    }
    logger.info(`Removing duplicates with ignoringCase: ${safeExtractText(ignoreCase)}`);

    const seen = new Set<string>();
    return strings.filter((item) => {
        const key = ignoreCase ? item.toLowerCase() : item;
        if (seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    });
}
