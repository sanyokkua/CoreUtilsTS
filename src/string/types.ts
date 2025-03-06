/**
 * Enum of supported cryptographic hash algorithms.
 * These values are typically used when performing hashing operations.
 */
export enum EncoderAlg {
    SHA_1 = 'SHA-1',
    SHA_256 = 'SHA-256',
    SHA_384 = 'SHA-384',
    SHA_512 = 'SHA-512',
}

/**
 * Enum of supported character encodings.
 * These values can be used when encoding or decoding text data.
 */
export enum Encodings {
    ASCII = 'ascii',
    UTF_8 = 'utf-8',
    UTF_16_LE = 'utf16le',
    UCS_2 = 'ucs2',
    BASE_64 = 'base64',
    BASE_64_URL = 'base64url',
    LATIN_1 = 'latin1',
    BINARY = 'binary',
    HEX = 'hex',
}

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
