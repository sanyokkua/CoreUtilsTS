import {
    capitalize,
    determineStringCase,
    swapCase,
    toCamelCase,
    toCobolCase,
    toDotCase,
    toKebabCase,
    toLowerCase,
    toLowerCaseStrict,
    toPascalCase,
    toScreamingSnakeCase,
    toSentenceCase,
    toSlashCase,
    toSnakeCase,
    toTitleCase,
    toTrainCase,
    toUpperCase,
    toUpperCaseStrict,
    uncapitalize,
} from '../../string/case-utils';
import { DetermineStringCaseProps, StringCaseTypes } from '../../string/types';
import { ICaseUtils } from './types';

/**
 * Implementation of ICaseUtils providing various string case conversion utilities.
 */
export class CaseUtilsImpl implements ICaseUtils {
    /**
     * Determines the specific case type of a given input string using optional ignore properties for digits and special characters.
     * @param input The string to analyze for case pattern matching.
     * @param props Optional configuration for case detection behavior. Default is empty object.
     */
    determineCase(input: string, props?: DetermineStringCaseProps): StringCaseTypes {
        return determineStringCase(input, props);
    }

    /**
     * Capitalizes the first character of a string and converts remaining characters to lowercase.
     */
    capitalize(input: string): string {
        return capitalize(input);
    }

    /**
     * Swaps all uppercase letters with their lowercase counterparts and vice versa in a given string.
     */
    swapCase(input: string): string {
        return swapCase(input);
    }

    /**
     * Converts the input to camelCase notation, where each token is transformed except the first character.
     */
    toCamelCase(input: string): string {
        return toCamelCase(input);
    }

    /**
     * Converts the input to COBOL case format, using uppercase letters and hyphen separators.
     */
    toCobolCase(input: string): string {
        return toCobolCase(input);
    }

    /**
     * Converts tokens to lowercase and joins them with dots for dot.case notation.
     */
    toDotCase(input: string): string {
        return toDotCase(input);
    }

    /**
     * Converts the input to kebab-case format using lowercase letters and hyphen separators.
     */
    toKebabCase(input: string): string {
        return toKebabCase(input);
    }

    /**
     * Returns a lower-cased version of the input string.
     */
    toLowerCase(input: string): string {
        return toLowerCase(input);
    }

    /**
     * Converts only letters in the input string to lowercase, excluding non-letter characters.
     */
    toLowerCaseStrict(input: string): string {
        return toLowerCaseStrict(input);
    }

    /**
     * Converts tokens to uppercase and joins them for PascalCase notation.
     */
    toPascalCase(input: string): string {
        return toPascalCase(input);
    }

    /**
     * Converts all characters in each token to uppercase and joins with underscores.
     */
    toScreamingSnakeCase(input: string): string {
        return toScreamingSnakeCase(input);
    }

    /**
     * Capitalizes the first letter of the input string and converts remaining letters to lowercase.
     */
    toSentenceCase(input: string): string {
        return toSentenceCase(input);
    }

    /**
     * Converts tokens to lowercase and joins them with slashes for slash.case notation.
     */
    toSlashCase(input: string): string {
        return toSlashCase(input);
    }

    /**
     * Converts the input to snake_case format using lowercase letters and underscore separators.
     */
    toSnakeCase(input: string): string {
        return toSnakeCase(input);
    }

    /**
     * Capitalizes the first letter of each token except the first one, which is lowercase.
     */
    toTitleCase(input: string): string {
        return toTitleCase(input);
    }

    /**
     * Converts tokens to uppercase and joins with hyphens for Train-Case notation.
     */
    toTrainCase(input: string): string {
        return toTrainCase(input);
    }

    /**
     * Returns an upper-cased version of the input string.
     */
    toUpperCase(input: string): string {
        return toUpperCase(input);
    }

    /**
     * Converts only letters in the input string to uppercase, excluding non-letter characters.
     */
    toUpperCaseStrict(input: string): string {
        return toUpperCaseStrict(input);
    }

    /**
     * Makes each character lowercase except for the first one which is converted to uppercase.
     */
    uncapitalize(input: string): string {
        return uncapitalize(input);
    }
}
