import { md5 } from 'js-md5';

/**
 * Converts a binary buffer to its hexadecimal representation.
 *
 * @param buffer - The ArrayBuffer containing the binary data to convert.
 * @returns A string representing the hexadecimal values of the input buffer,
 *          with each byte formatted as two uppercase hex digits.
 */
function bufferToHex(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    return Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
}

/**
 * Computes a cryptographic hash of the given input using the specified algorithm.
 *
 * @param alg - The hashing algorithm to use ('SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512').
 * @param input
 * @return A Promise that resolves with the hexadecimal representation of the digest.
 */
function digest(alg: 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512', input: string): Promise<string> {
    const textEncoder = new TextEncoder();
    const data = textEncoder.encode(input);
    return crypto.subtle.digest(alg, data).then(bufferToHex);
}

/**
 * Computes the SHA-1 hash of a given input string.
 *
 * @param input - The string to be hashed.
 * @returns A promise resolving to a hexadecimal string representing the SHA-1 hash.
 */
export function encodeSHA1(input: string): Promise<string> {
    return digest('SHA-1', input);
}

/**
 * Computes a SHA-256 hash of the provided input string.
 *
 * @param input - The source text to be hashed
 * @returns A promise that resolves with the hexadecimal representation of the computed hash
 */
export function encodeSHA256(input: string): Promise<string> {
    return digest('SHA-256', input);
}

/**
 * Computes a SHA-384 hash of the given input text.
 * @param input The plain text to be hashed.
 * @returns A promise that resolves to a 96-character hexadecimal string representing the SHA-384 hash.
 */
export function encodeSHA384(input: string): Promise<string> {
    return digest('SHA-384', input);
}

/**
 * Calculates a SHA-512 hash of the provided input string asynchronously.
 *
 * @param input The text to be hashed.
 * @returns A Promise resolving to the hexadecimal representation of the hash.
 */
export function encodeSHA512(input: string): Promise<string> {
    return digest('SHA-512', input);
}

/**
 * @param input - The string to be encoded using MD5 algorithm.
 * @returns A promise resolving to an MD5 hash of the input string in hexadecimal format.
 */
export function encodeMD5(input: string): Promise<string> {
    return Promise.resolve(md5(input));
}
