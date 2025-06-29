import { EncodingUtilsImpl } from '../../src/public/string-utils/encoding-utils';

describe('EncodingUtilsImpl (Base64 real implementations)', () => {
    const utils = new EncodingUtilsImpl();

    it.each<[string, string, string, string, string]>([
        // [case name,        input,               expectedBase64,       expectedBase64Url,    expectedDecoded]
        ['empty', '', '', '', ''],
        ['ascii', 'abc', 'YWJj', 'YWJj', 'abc'],
        ['needs padding', 'abcde', 'YWJjZGU=', 'YWJjZGU', 'abcde'],
        ['symbols', 'foo+bar/', 'Zm9vK2Jhci8=', 'Zm9vK2Jhci8', 'foo+bar/'],
        ['unicode', '✓ à la mode', '4pyTIMOgIGxhIG1vZGU=', '4pyTIMOgIGxhIG1vZGU', '✓ à la mode'],
    ])(
        '%s: encodeBase64 → Base64, encodeBase64Url → URL-safe, decodeBase64 → original',
        (_case, input, expB64, expB64Url, expDecoded) => {
            // real Base64
            expect(utils.encodeBase64(input)).toBe(expB64);

            // URL-safe Base64 (no padding, + → –, / → _)
            expect(utils.encodeBase64Url(input)).toBe(expB64Url);

            // decode both the padded and unpadded forms
            expect(utils.decodeBase64(expB64)).toBe(expDecoded);
            expect(utils.decodeBase64(expB64Url)).toBe(expDecoded);
        },
    );
});
