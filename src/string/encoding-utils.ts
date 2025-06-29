import { Base64 } from 'js-base64';

/**
 * Encodes a string using Base64 encoding.
 * @param input - The string to be encoded.
 * @returns A Base64-encoded string representation of the input.
 */
export function encodeBase64(input: string): string {
    return Base64.encode(input);
}

/**
 * Encodes a UTF-8 string to base64url format, suitable for URL-safe encoding of binary data.
 * This method uses the Base64 class from the `base64-js` library to ensure consistent encoding across environments.
 *
 * @param input The string to encode. Must be in UTF-8 format.
 * @returns A base64url-encoded string without padding characters ('=').
 */
export function encodeBase64Url(input: string): string {
    return Base64.encodeURL(input);
}

/**
 * Decodes a base64 encoded string to its original value.
 * @param input - The base64 encoded string to be decoded.
 * @return The decoded string representation of the provided base64 input.
 */
export function decodeBase64(input: string): string {
    return Base64.decode(input);
}
