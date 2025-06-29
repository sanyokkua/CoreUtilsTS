import { decodeBase64, encodeBase64, encodeBase64Url } from '../../string/encoding-utils';
import { IEncodingUtils } from './types';

/**
 * Implementation of IEncodingUtils interface providing base64 encoding and decoding functionality.
 * Utilizes js-base64 library for core operations.
 */
export class EncodingUtilsImpl implements IEncodingUtils {
    /**
     * Encodes a string using Base64 standard encoding.
     * @param input - String to be encoded
     * @returns Base64-encoded representation of the input
     */
    encodeBase64(input: string): string {
        return encodeBase64(input);
    }

    /**
     * Encodes a string using Base64 URL-safe variant, replacing + with - and / with _.
     * @param input - String to be encoded
     * @returns URL-safe Base64-encoded representation of the input
     */
    encodeBase64Url(input: string): string {
        return encodeBase64Url(input);
    }

    /**
     * Decodes a Base64-encoded string back to its original format.
     * Accepts both standard and URL-safe encoded strings.
     * @param input - The Base64-encoded string
     * @returns Original decoded string
     */
    decodeBase64(input: string): string {
        return decodeBase64(input);
    }
}
