// Polyfill for window.crypto in Node environment.
// noinspection JSConstantReassignment
// eslint-disable-next-line
global.window = global as any;
// eslint-disable-next-line
if (!global.window.crypto) {
    // eslint-disable-next-line
    const { webcrypto } = require('crypto');
    // noinspection JSConstantReassignment
    // eslint-disable-next-line
    global.window.crypto = webcrypto;
}

import {
    decodeString,
    encodeString,
    encodeStringSha1,
    encodeStringSha256,
    encodeStringSha384,
    encodeStringSha512,
} from '../../src/string/encoding-utils'; // Adjust the import path as needed
import { Encodings } from '../../src/string/types';

describe('Hash Functions', () => {
    describe('SHA-1', () => {
        test('encodeStringSha1 returns correct hash for empty string', async () => {
            const hash = await encodeStringSha1('');
            expect(hash).toBe('da39a3ee5e6b4b0d3255bfef95601890afd80709');
        });

        test('encodeStringSha1 returns correct hash for "hello"', async () => {
            const hash = await encodeStringSha1('hello');
            expect(hash).toBe('aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d');
        });

        test('encodeStringSha1 returns the same hash for several calls with the same argument "hello"', async () => {
            const hash1 = await encodeStringSha1('hello');
            const hash2 = await encodeStringSha1('hello');
            const hash3 = await encodeStringSha1('hello');
            expect(hash1).toBe(hash2);
            expect(hash1).toBe(hash3);
        });
    });

    describe('SHA-256', () => {
        test('encodeStringSha256 returns correct hash for empty string', async () => {
            const hash = await encodeStringSha256('');
            expect(hash).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
        });

        test('encodeStringSha256 returns correct hash for "hello"', async () => {
            const hash = await encodeStringSha256('hello');
            expect(hash).toBe('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824');
        });

        test('encodeStringSha256 returns the same hash for several calls with the same argument "hello"', async () => {
            const hash1 = await encodeStringSha256('hello');
            const hash2 = await encodeStringSha256('hello');
            const hash3 = await encodeStringSha256('hello');
            expect(hash1).toBe(hash2);
            expect(hash1).toBe(hash3);
        });
    });

    describe('SHA-384', () => {
        test('encodeStringSha384 returns correct hash for empty string', async () => {
            const hash = await encodeStringSha384('');
            expect(hash).toBe(
                '38b060a751ac96384cd9327eb1b1e36a21fdb71114be07434c0cc7bf63f6e1da274edebfe76f65fbd51ad2f14898b95b',
            );
        });

        test('encodeStringSha384 returns correct hash for "hello"', async () => {
            const hash = await encodeStringSha384('hello');
            // Expected hash computed using a trusted tool
            expect(hash).toBe(
                '59e1748777448c69de6b800d7a33bbfb9ff1b463e44354c3553bcdb9c666fa90125a3c79f90397bdf5f6a13de828684f',
            );
        });

        test('encodeStringSha384 returns the same hash for several calls with the same argument "hello"', async () => {
            const hash1 = await encodeStringSha384('hello');
            const hash2 = await encodeStringSha384('hello');
            const hash3 = await encodeStringSha384('hello');
            expect(hash1).toBe(hash2);
            expect(hash1).toBe(hash3);
        });
    });

    describe('SHA-512', () => {
        test('encodeStringSha512 returns correct hash for empty string', async () => {
            const hash = await encodeStringSha512('');
            expect(hash).toBe(
                'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e',
            );
        });

        test('encodeStringSha512 returns correct hash for "hello"', async () => {
            const hash = await encodeStringSha512('hello');
            // Expected hash computed using a trusted tool (ensure this value matches your environment)
            expect(hash).toBe(
                '9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043',
            );
        });

        test('encodeStringSha512 returns the same hash for several calls with the same argument "hello"', async () => {
            const hash1 = await encodeStringSha512('hello');
            const hash2 = await encodeStringSha512('hello');
            const hash3 = await encodeStringSha512('hello');
            expect(hash1).toBe(hash2);
            expect(hash1).toBe(hash3);
        });
    });

    describe('Error Handling', () => {
        test('encodeStringSha1 throws error when crypto.subtle.digest fails', async () => {
            // Save original digest function
            // eslint-disable-next-line
            const originalDigest = window.crypto.subtle.digest;
            // Override digest to simulate an error
            window.crypto.subtle.digest = jest.fn(() => Promise.reject(new Error('Digest error')));

            await expect(encodeStringSha1('test')).rejects.toThrow('Digest error');

            // Restore original digest function
            window.crypto.subtle.digest = originalDigest;
        });
    });
});

describe('Base64 Encoding/Decoding', () => {
    describe('encodeString', () => {
        test('encodeString returns correct base64 string for given text using ASCII encoding', async () => {
            const encoded = await encodeString('hello', Encodings.BASE_64);
            expect(encoded).toBe('aGVsbG8=');
        });

        test('encodeString returns correct base64 string for empty string', async () => {
            const encoded = await encodeString('', Encodings.ASCII);
            expect(encoded).toBe('');
        });
    });

    describe('decodeString', () => {
        test('decodeString returns original text from a valid base64 string using default (BASE_64) encoding', async () => {
            const decoded = await decodeString('aGVsbG8=');
            expect(decoded).toBe('hello');
        });

        test('decodeString returns empty string for empty input', async () => {
            const decoded = await decodeString('', Encodings.BASE_64);
            expect(decoded).toBe('');
        });
    });

    describe('Encoding and Decoding Inversion', () => {
        test('encodeString and decodeString are inverses for text with UTF-8 encoding', async () => {
            const original = 'Testing 123';
            const encoded = await encodeString(original, Encodings.BASE_64);
            const decoded = await decodeString(encoded, Encodings.BASE_64);
            expect(decoded).toBe(original);
        });

        test('encodeString and decodeString handle non-ASCII characters using UTF-8 encoding', async () => {
            const original = '你好，世界'; // "Hello, World" in Chinese
            const encoded = await encodeString(original, Encodings.BASE_64);
            const decoded = await decodeString(encoded, Encodings.BASE_64);
            expect(decoded).toBe(original);
        });

        test('encodeString and decodeString for URL safe', async () => {
            const original = 'Testing String';
            const encodedNotSafe = await encodeString(original, Encodings.BASE_64);
            const encodedSafe = await encodeString(original, Encodings.BASE_64_URL);
            const decodedNotSafe = await decodeString(encodedNotSafe, Encodings.BASE_64);
            const decodedSafe = await decodeString(encodedSafe, Encodings.BASE_64);
            expect(decodedNotSafe).toBe(original);
            expect(decodedSafe).toBe(original);
            expect(encodedNotSafe).not.toBe(encodedSafe);
        });
    });
});
