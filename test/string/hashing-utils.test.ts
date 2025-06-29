import { HashingUtilsImpl } from '../../src/public/string-utils/hashing-utils';

describe('EncodingUtilsImpl (real implementations)', () => {
    const utils = new HashingUtilsImpl();
    const sample = 'The quick brown fox jumps over the lazy dog';

    it.each([
        ['SHA1', () => utils.encodeSHA1(sample)],
        ['SHA256', () => utils.encodeSHA256(sample)],
        ['SHA384', () => utils.encodeSHA384(sample)],
        ['SHA512', () => utils.encodeSHA512(sample)],
        ['MD5', () => utils.encodeMD5(sample)],
    ])('encode%s returns a non-empty hex string', async (_name, fn) => {
        const result = await fn();
        expect(typeof result).toBe('string');
        expect(result).toMatch(/^[0-9a-f]+$/);
        expect(result.length).toBeGreaterThan(0);
    });
});
