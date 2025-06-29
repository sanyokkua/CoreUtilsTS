import {
    addPrefixIfMissing,
    addSuffixIfMissing,
    contains,
    decodeUrl,
    encodeUrl,
    endsWith,
    getDefaultStringOnNull,
    isBlankString,
    isEmptyString,
    isNotAlphanumeric,
    isNullOrBlankString,
    isString,
    joinStrings,
    removePrefixIfPresent,
    removeSuffixIfPresent,
    replaceSubstring,
    safeExtractText,
    slugifyString,
    splitString,
    startsWith,
} from '../../src/string/string-utils';
import { EMPTY } from '../../src/string/types';

describe('String Utilities', () => {
    describe('isString', () => {
        it('should return true for a valid string', () => {
            expect(isString('hello')).toBe(true);
        });

        it('should return false for null or undefined', () => {
            expect(isString(null)).toBe(false);
            expect(isString(undefined)).toBe(false);
        });

        it('should return false for non-string types', () => {
            expect(isString(123)).toBe(false);
            expect(isString({})).toBe(false);
            expect(isString([])).toBe(false);
        });
    });

    describe('isEmptyString', () => {
        it('should return true for an empty string', () => {
            expect(isEmptyString('')).toBe(true);
        });

        it('should return false for a blank string', () => {
            expect(isEmptyString('   ')).toBe(false);
            expect(isEmptyString('\n\t')).toBe(false);
        });

        it('should return false for a non-empty string', () => {
            expect(isEmptyString('hello')).toBe(false);
        });

        it('should return false for null or undefined', () => {
            expect(isEmptyString(null)).toBe(false);
            expect(isEmptyString(undefined)).toBe(false);
        });
    });

    describe('isBlankString', () => {
        it('should return true for an empty string', () => {
            expect(isBlankString('')).toBe(true);
        });

        it('should return true for a string with only whitespace', () => {
            expect(isBlankString('   ')).toBe(true);
            expect(isBlankString('\n\t')).toBe(true);
        });

        it('should return false for a non-blank string', () => {
            expect(isBlankString('hello')).toBe(false);
            expect(isBlankString(' hello ')).toBe(false);
        });
    });

    describe('isNullOrBlankString', () => {
        it('should return true for null or undefined', () => {
            expect(isNullOrBlankString(null)).toBe(true);
            expect(isNullOrBlankString(undefined)).toBe(true);
        });

        it('should return true for a blank string', () => {
            expect(isNullOrBlankString('')).toBe(true);
            expect(isNullOrBlankString('   ')).toBe(true);
        });

        it('should return false for a non-blank string', () => {
            expect(isNullOrBlankString('hello')).toBe(false);
        });
    });

    describe('startsWith', () => {
        it('should return true when the string starts with the provided prefix', () => {
            expect(startsWith('hello world', 'hello')).toBe(true);
        });

        it('should return false when the string does not start with the provided prefix', () => {
            expect(startsWith('hello world', 'world')).toBe(false);
        });

        it('should return true when checking for an empty prefix', () => {
            expect(startsWith('hello world', '')).toBe(true);
        });

        it('should return false when the input string is empty and prefix is non-empty', () => {
            expect(startsWith('', 'a')).toBe(false);
        });
    });

    describe('endsWith', () => {
        it('should return true when the string ends with the provided suffix', () => {
            expect(endsWith('hello world', 'world')).toBe(true);
        });

        it('should return false when the string does not end with the provided suffix', () => {
            expect(endsWith('hello world', 'hello')).toBe(false);
        });

        it('should return true when checking for an empty suffix', () => {
            expect(endsWith('hello world', '')).toBe(true);
        });

        it('should return false when the input string is empty and suffix is non-empty', () => {
            expect(endsWith('', 'a')).toBe(false);
        });
    });

    describe('contains', () => {
        it('should return true if the string contains the substring', () => {
            expect(contains('hello world', 'lo wo')).toBe(true);
            expect(contains('hello world', 'hello')).toBe(true);
            expect(contains('hello world', 'world')).toBe(true);
        });

        it('should return false if the string does not contain the substring', () => {
            expect(contains('hello world', 'test')).toBe(false);
        });

        it('should return true when searching for an empty substring', () => {
            expect(contains('hello world', '')).toBe(true);
        });

        it('should return true for an empty string when searching for an empty substring', () => {
            expect(contains('', '')).toBe(true);
        });
    });

    describe('splitString', () => {
        it('should split the string using the default separator (LINUX newline)', () => {
            expect(splitString('line1\nline2')).toEqual(['line1', 'line2']);
        });

        it('should split the string using a custom separator', () => {
            expect(splitString('a,b,c', ',')).toEqual(['a', 'b', 'c']);
        });

        it('should return an array with the original string if the separator is not found', () => {
            expect(splitString('abc', ',')).toEqual(['abc']);
        });

        it('should handle an empty string input', () => {
            expect(splitString('', ',')).toEqual(['']);
        });
    });

    describe('joinStrings', () => {
        it('should join an array of strings using the default join symbol (LINUX newline)', () => {
            expect(joinStrings(['a', 'b', 'c'])).toBe('a\nb\nc');
        });

        it('should join an array of strings using a custom join symbol', () => {
            expect(joinStrings(['a', 'b', 'c'], ',')).toBe('a,b,c');
        });

        it('should return an empty string when joining an empty array', () => {
            expect(joinStrings([])).toBe('');
        });
    });

    describe('addSuffixIfMissing', () => {
        it('should not add the suffix if it is already present', () => {
            expect(addSuffixIfMissing('hello', 'lo')).toBe('hello');
        });

        it('should add the suffix if it is missing', () => {
            expect(addSuffixIfMissing('hello', ' world')).toBe('hello world');
        });

        it('should not change the value when the suffix is empty', () => {
            expect(addSuffixIfMissing('hello', '')).toBe('hello');
        });
    });

    describe('addPrefixIfMissing', () => {
        it('should not add the prefix if it is already present', () => {
            expect(addPrefixIfMissing('hello world', 'hello ')).toBe('hello world');
        });

        it('should add the prefix if it is missing', () => {
            expect(addPrefixIfMissing('world', 'hello ')).toBe('hello world');
        });

        it('should not change the value when the prefix is empty', () => {
            expect(addPrefixIfMissing('world', '')).toBe('world');
        });
    });

    describe('removePrefixIfPresent', () => {
        it('should remove the prefix when present', () => {
            expect(removePrefixIfPresent('foobar', 'foo')).toBe('bar');
        });

        it('should not remove anything if the prefix is not present', () => {
            expect(removePrefixIfPresent('foobar', 'bar')).toBe('foobar');
        });

        it('should return the original string if the prefix is blank, null, or undefined', () => {
            expect(removePrefixIfPresent('foobar', '')).toBe('foobar');
            expect(removePrefixIfPresent('foobar', '   ')).toBe('foobar');
        });
    });

    describe('removeSuffixIfPresent', () => {
        it('should remove the suffix when present', () => {
            expect(removeSuffixIfPresent('foobar', 'bar')).toBe('foo');
        });

        it('should not remove anything if the suffix is not present', () => {
            expect(removeSuffixIfPresent('foobar', 'foo')).toBe('foobar');
        });

        it('should return the original string if the suffix is blank, null, or undefined', () => {
            expect(removeSuffixIfPresent('foobar', '')).toBe('foobar');
            expect(removeSuffixIfPresent('foobar', '   ')).toBe('foobar');
        });
    });

    describe('replaceSubstring', () => {
        it('should replace all occurrences of the substring', () => {
            expect(replaceSubstring('foofoo', 'foo', 'bar')).toBe('barbar');
            expect(replaceSubstring('abab', 'ab', 'cd')).toBe('cdcd');
        });

        it('should return the original string if the substring is not found', () => {
            expect(replaceSubstring('hello', 'test', 'world')).toBe('hello');
        });

        it('should handle replacing an empty substring (inserting the replacement between characters)', () => {
            // Note: Replacing an empty string inserts the replacement before, between, and after characters.
            expect(replaceSubstring('abc', '', '-')).toBe('-a-b-c-');
        });
    });

    describe('getDefaultOnNull', () => {
        it('should return the original value when it is not null or undefined', () => {
            expect(getDefaultStringOnNull('abc', 'default')).toBe('abc');
        });

        it('should return the default value when input is null', () => {
            expect(getDefaultStringOnNull(null, 'default')).toBe('default');
        });

        it('should return the default value when input is undefined', () => {
            expect(getDefaultStringOnNull(undefined, 'default')).toBe('default');
        });

        it('should return EMPTY as default when defaultValue is not provided', () => {
            expect(getDefaultStringOnNull(null)).toBe(EMPTY);
        });

        it('should return an empty string when value is an empty string', () => {
            expect(getDefaultStringOnNull('')).toBe('');
        });
    });
});

describe('safeExtractText', () => {
    it('should return "null" when input is null', () => {
        const result = safeExtractText(null);
        expect(result).toBe('null');
    });

    it('should return "undefined" when input is undefined', () => {
        const result = safeExtractText(undefined);
        expect(result).toBe('undefined');
    });

    it('should return the original string when input is a string', () => {
        const input = 'Hello, world!';
        const result = safeExtractText(input);
        expect(result).toBe(input);
    });

    it('should return string representation when input is a number', () => {
        expect(safeExtractText(123)).toBe('123');
        expect(safeExtractText(3.14)).toBe('3.14');
    });

    it('should return JSON stringified output when input is a plain object', () => {
        const obj = { a: 1, b: 'test' };
        const result = safeExtractText(obj);
        expect(result).toBe(JSON.stringify(obj));
    });

    it('should return JSON stringified output when input is an array', () => {
        const arr = [42, 'foo', false];
        const result = safeExtractText(arr);
        expect(result).toBe(JSON.stringify(arr));
    });

    it('should return fallback message when JSON.stringify throws due to circular reference', () => {
        // eslint-disable-next-line
        const circularObj: any = {};
        // eslint-disable-next-line
        circularObj.self = circularObj;
        const result = safeExtractText(circularObj);
        expect(result).toBe('');
    });

    it('should return fallback message when JSON.stringify throws because toJSON method fails', () => {
        const badObj = {
            toJSON: () => {
                throw new Error('toJSON failure');
            },
        };
        const result = safeExtractText(badObj);
        expect(result).toBe('');
    });

    it('should properly convert booleans using String conversion', () => {
        expect(safeExtractText(true)).toBe('true');
        expect(safeExtractText(false)).toBe('false');
    });

    it('should properly convert symbols using String conversion', () => {
        const sym = Symbol('test');
        expect(safeExtractText(sym)).toBe(String(sym));
    });

    it('should properly convert BigInt values using toString()', () => {
        const bigNum = BigInt('9007199254740991');
        expect(safeExtractText(bigNum)).toBe(bigNum.toString());
    });

    it('should return string representation for a normal function', () => {
        const func = function sampleFunc() {
            return 1;
        };
        // We expect the conversion to produce a string that includes "function"
        expect(safeExtractText(func)).toMatch(/function/i);
    });

    it('should return fallback message if String conversion of a function throws', () => {
        // eslint-disable-next-line
        const throwingFunc: any = function () {
            return 1;
        };
        // Override its toString method to throw an error
        // eslint-disable-next-line
        throwingFunc.toString = () => {
            throw new Error('Boom');
        };
        const result = safeExtractText(throwingFunc);
        expect(result).toBe('');
    });
});

describe('isNotAlphanumeric', () => {
    test.each([
        { input: '', expected: true },
        { input: '     ', expected: true },
        { input: '!', expected: true },
        { input: '@', expected: true },
        { input: '@#$%^&*()', expected: true },
        { input: '[]', expected: true },
        { input: '{}', expected: true },
        { input: ',?', expected: true },
        { input: '?', expected: true },
        { input: "'", expected: true },
        { input: "   '   ", expected: true },
        { input: 'Word', expected: false },
        { input: '123456', expected: false },
        { input: '0', expected: false },
        { input: 'a', expected: false },
        { input: '   a   ', expected: true },
        { input: 'Text@', expected: true },
        { input: '@Text@', expected: true },
    ])('should return "$expected" for "$input"', ({ input, expected }) => {
        expect(isNotAlphanumeric(input)).toBe(expected);
    });
});

describe('slugifyString', () => {
    test.each([
        { input: '', expected: '' },
        { input: 'Some text', expected: 'Some-text' },
    ])('should return "$expected" for "$input"', ({ input, expected }) => {
        expect(slugifyString(input)).toBe(expected);
    });
});

describe('encodeUrl', () => {
    test.each([
        { input: '', expected: '' },
        { input: 'https://some.domain.com/hello?world', expected: 'https%3A%2F%2Fsome.domain.com%2Fhello%3Fworld' },
    ])('should return "$expected" for "$input"', ({ input, expected }) => {
        expect(encodeUrl(input)).toBe(expected);
    });
});

describe('decodeUrl', () => {
    test.each([
        { input: '', expected: '' },
        { input: 'https%3A%2F%2Fsome.domain.com%2Fhello%3Fworld', expected: 'https://some.domain.com/hello?world' },
    ])('should return "$expected" for "$input"', ({ input, expected }) => {
        expect(decodeUrl(input)).toBe(expected);
    });
});
