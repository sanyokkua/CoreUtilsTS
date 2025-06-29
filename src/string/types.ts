/**
 * Represents an empty string.
 * Useful as a constant for default string values.
 */
export const EMPTY: string = '';

/**
 * Represents a single space character.
 * Often used for string concatenation or formatting purposes.
 */
export const SPACE: string = ' ';
export const DOT = '.';
export const SLASH = '/';
export const DASH = '-';
export const UNDERSCORE = '_';

/**
 * Enum for commonly used line separators across different operating systems.
 * These values help standardize line breaks in multi-line strings.
 */
export enum LineSeparators {
    /** Windows line separator */
    WINDOWS = '\n\r',
    /** Classic Mac OS line separator */
    MACOS = '\r',
    /** Linux/Unix line separator */
    LINUX = '\n',
}

/**
 * Type representing a line separator.
 * It can be one of the defined LineSeparators enum values or any custom string.
 */
export type LineSeparator = LineSeparators | string;

/**
 * Type representing a Sorting direction
 */
export enum SortingTypes {
    ASC = 'ASCENDING',
    DSC = 'DESCENDING',
    ASC_IGN_CASE = 'ASCENDING IGNORE CASE',
    DSC_IGN_CASE = 'DESCENDING IGNORE CASE',
}

export enum StringCaseTypes {
    UNKNOWN = 'Unknown Case Type',
    LOWER_CASE_STRICT = `lowercasestrict`,
    UPPER_CASE_STRICT = `UPPERCASESTRICT`,
    SENTENCE_CASE = `Sentence case`,
    TITLE_CASE = `Title Case`,
    CAMEL_CASE = `camelCase`,
    PASCAL_CASE = `PascalCase`,
    SNAKE_CASE = `snake_case`,
    SCREAMING_SNAKE_CASE = `SCREAMING_SNAKE_CASE`,
    KEBAB_CASE = `kebab-case`,
    TRAIN_CASE = `Train-Case`,
    DOT_CASE = `dot.case`,
    SLASH_CASE = `slash/case`,
    COBOL_CASE = `COBOL-CASE`,
    LOWER_CASE = `lowercase`,
    UPPER_CASE = `UPPERCASE`,
}

export type Validator = (input: string) => boolean;

export interface TypeDetector {
    caseType: StringCaseTypes;
    validator: Validator;
}

export type DetermineStringCaseProps = {
    ignoreDigits?: boolean;
    ignoreSpecialChars?: boolean;
};
