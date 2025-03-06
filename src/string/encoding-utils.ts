import { getLogger } from '../logging/logger-utils';
import { EncoderAlg, Encodings } from './types';

const logger = getLogger();

/**
 * Hashes the given text using the specified cryptographic algorithm.
 * Internally, the function encodes the text as UTF-8, computes its digest via the Web Crypto API,
 * converts the resulting ArrayBuffer into a hexadecimal string, and returns that string.
 *
 * @param text - The text to be hashed.
 * @param shaAlg - The hashing algorithm to use (e.g. EncoderAlg.SHA_1, EncoderAlg.SHA_256, etc.).
 * @returns A Promise that resolves to the hexadecimal representation of the hash.
 */
async function encodeStringWithAlg(text: string, shaAlg: string): Promise<string> {
    logger.info(`Encoding "${text}" with Alg: ${shaAlg}`);
    const textEncoder = new TextEncoder();
    const msgUint8: Uint8Array = textEncoder.encode(text); // Encode text as a UTF-8 Uint8Array
    const hashBuffer: ArrayBuffer = await window.crypto.subtle.digest(shaAlg, msgUint8); // Hash the message
    const hashArray: number[] = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // Convert bytes to hex string
}

/**
 * Computes the SHA-1 hash of the provided text.
 *
 * @param text - The text to be hashed.
 * @returns A Promise that resolves to the hexadecimal SHA-1 hash of the text.
 */
export async function encodeStringSha1(text: string): Promise<string> {
    logger.info(`Encoding "${text}" to SHA1`);
    return encodeStringWithAlg(text, EncoderAlg.SHA_1);
}

/**
 * Computes the SHA-256 hash of the provided text.
 *
 * @param text - The text to be hashed.
 * @returns A Promise that resolves to the hexadecimal SHA-256 hash of the text.
 */
export async function encodeStringSha256(text: string): Promise<string> {
    logger.info(`Encoding "${text}" to SHA256`);
    return encodeStringWithAlg(text, EncoderAlg.SHA_256);
}

/**
 * Computes the SHA-384 hash of the provided text.
 *
 * @param text - The text to be hashed.
 * @returns A Promise that resolves to the hexadecimal SHA-384 hash of the text.
 */
export async function encodeStringSha384(text: string): Promise<string> {
    logger.info(`Encoding "${text}" to SHA384`);
    return encodeStringWithAlg(text, EncoderAlg.SHA_384);
}

/**
 * Computes the SHA-512 hash of the provided text.
 *
 * @param text - The text to be hashed.
 * @returns A Promise that resolves to the hexadecimal SHA-512 hash of the text.
 */
export async function encodeStringSha512(text: string): Promise<string> {
    logger.info(`Encoding "${text}" to SHA512`);
    return encodeStringWithAlg(text, EncoderAlg.SHA_512);
}

/**
 * Encodes a given text into a different encoding format.
 * By default, the function converts the text from UTF-8 to a Base64-encoded string.
 * Note: This implementation uses the Node.js Buffer API.
 *
 * @param text - The text to encode.
 * @param encoding - The target encoding format (defaults to Encodings.BASE_64).
 * @returns A Promise that resolves to the encoded string.
 */
// eslint-disable-next-line
export async function encodeString(text: string, encoding: Encodings = Encodings.BASE_64): Promise<string> {
    logger.info(`Encoding "${text}" to ${encoding}`);
    return Buffer.from(text, Encodings.UTF_8).toString(encoding);
}

/**
 * Decodes a string from a given encoding back to UTF-8.
 * By default, it decodes a Base64-encoded string back to its original text.
 * Note: This implementation uses the Node.js Buffer API.
 *
 * @param text - The encoded string to decode.
 * @param encoding - The encoding of the input string (defaults to Encodings.BASE_64).
 * @returns A Promise that resolves to the decoded UTF-8 string.
 */
// eslint-disable-next-line
export async function decodeString(text: string, encoding: Encodings = Encodings.BASE_64): Promise<string> {
    logger.info(`Decoding "${text}" to ${encoding}`);
    return Buffer.from(text, encoding).toString(Encodings.UTF_8);
}
