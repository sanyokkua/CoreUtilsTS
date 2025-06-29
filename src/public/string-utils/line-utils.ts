import { removeDuplicates, shuffleLines, sortLines, splitLines, splitStringIntoLines } from '../../string/line-utils';
import { SortingTypes } from '../../string/types';
import { ILineUtils } from './types';

/**
 * A class implementing utilities for manipulating lines of text.
 */
export class LineUtilsImpl implements ILineUtils {
    /**
     * Splits a string into lines using the provided splitter and trims whitespace from each line.
     *
     * @param data - The input string to split (can be null or undefined).
     * @param splitter - Regular expression or string delimiter for splitting.
     */
    splitStringIntoLines = (data: string | null | undefined, splitter: RegExp | string): string[] => {
        return splitStringIntoLines(data, splitter);
    };

    /**
     * Splits a string into lines using common line break characters and trims each line.
     *
     * @param data - The input string to split (can be null or undefined).
     */
    splitLines = (data: string | null | undefined): string[] => {
        return splitLines(data);
    };

    /**
     * Sorts an array of strings based on the specified sorting type.
     *
     * @param arr - Array of strings to sort (can be null or undefined).
     * @param sortType - Sorting direction and case sensitivity setting (default: ASC).
     */
    sortLines = (arr: string[] | null | undefined, sortType: SortingTypes = SortingTypes.ASC): string[] => {
        return sortLines(arr, sortType);
    };

    /**
     * Shuffles an array of strings using the Fisher-Yates algorithm.
     *
     * @param arr - Array of strings to shuffle (can be null or undefined).
     */
    shuffleLines = (arr: string[] | null | undefined): string[] => {
        return shuffleLines(arr);
    };

    /**
     * Removes duplicate entries from an array of strings with optional case-insensitive comparison.
     *
     * @param strings - Array of strings to deduplicate (can be null or undefined).
     * @param ignoreCase - Whether to treat strings as equal regardless of case (default: false).
     */
    removeDuplicates = (strings: string[] | null | undefined, ignoreCase: boolean = false): string[] => {
        return removeDuplicates(strings, ignoreCase);
    };
}
