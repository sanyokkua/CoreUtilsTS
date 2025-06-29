import { encodeMD5, encodeSHA1, encodeSHA256, encodeSHA384, encodeSHA512 } from '../../string/hashing-utils';
import { IHashingUtils } from './types';

/**
 * Implementation of IHashingUtils providing various hashing algorithms.
 */
export class HashingUtilsImpl implements IHashingUtils {
    /**
     * Encodes the input string using SHA-1 hashing algorithm.
     *
     * @param input - The string to hash
     * @returns A promise that resolves with the SHA-1 hash as a hexadecimal string
     */
    encodeSHA1(input: string): Promise<string> {
        return encodeSHA1(input);
    }

    /**
     * Encodes the input string using SHA-256 hashing algorithm.
     *
     * @param input - The string to hash
     * @returns A promise that resolves with the SHA-256 hash as a hexadecimal string
     */
    encodeSHA256(input: string): Promise<string> {
        return encodeSHA256(input);
    }

    /**
     * Encodes the input string using SHA-384 hashing algorithm.
     *
     * @param input - The string to hash
     * @returns A promise that resolves with the SHA-384 hash as a hexadecimal string
     */
    encodeSHA384(input: string): Promise<string> {
        return encodeSHA384(input);
    }

    /**
     * Encodes the input string using SHA-512 hashing algorithm.
     *
     * @param input - The string to hash
     * @returns A promise that resolves with the SHA-512 hash as a hexadecimal string
     */
    encodeSHA512(input: string): Promise<string> {
        return encodeSHA512(input);
    }

    /**
     * Encodes the input string using MD5 hashing algorithm.
     *
     * @param input - The string to hash
     * @returns A promise that resolves with the MD5 hash as a hexadecimal string
     */
    encodeMD5(input: string): Promise<string> {
        return encodeMD5(input);
    }
}
