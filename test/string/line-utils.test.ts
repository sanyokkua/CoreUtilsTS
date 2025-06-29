import {
    removeDuplicates,
    shuffleLines,
    sortLines,
    splitLines,
    splitStringIntoLines,
} from '../../src/string/line-utils';
import { SortingTypes } from '../../src/string/types';

describe('splitString', () => {
    it('should return an empty array when input is null, undefined, or an empty string', () => {
        expect(splitStringIntoLines(null, ',')).toEqual([]);
        expect(splitStringIntoLines(undefined, ',')).toEqual([]);
        expect(splitStringIntoLines('', ',')).toEqual([]);
    });

    it('should throw an error if splitter is null or undefined', () => {
        // eslint-disable-next-line
        expect(() => splitStringIntoLines('a,b,c', null as any)).toThrow('Splitter is null or undefined');
        // eslint-disable-next-line
        expect(() => splitStringIntoLines('a,b,c', undefined as any)).toThrow('Splitter is null or undefined');
    });

    it('should split the string by the provided delimiter', () => {
        const input = 'apple, banana, cherry';
        const result = splitStringIntoLines(input, ',');
        expect(result).toEqual(['apple', 'banana', 'cherry']);
    });

    it('should trim each part and filter out empty strings', () => {
        const input = '  dog , ,  cat ,   bird  ';
        const result = splitStringIntoLines(input, ',');
        expect(result).toEqual(['dog', 'cat', 'bird']);
    });
});

describe('splitLines', () => {
    it('should return an empty array when input is null, undefined, or an empty string', () => {
        expect(splitLines(null)).toEqual([]);
        expect(splitLines(undefined)).toEqual([]);
        expect(splitLines('')).toEqual([]);
    });

    it('should split the string into lines using common line breaks', () => {
        const input = 'line1\nline2\rline3\r\nline4';
        const result = splitLines(input);
        expect(result).toEqual(['line1', 'line2', 'line3', 'line4']);
    });

    it('should trim lines and filter out empty lines', () => {
        const input = '  line1  \n\n  line2 \r\n   \r line3  ';
        const result = splitLines(input);
        expect(result).toEqual(['line1', 'line2', 'line3']);
    });
});

describe('sortStrings', () => {
    it('should return an empty array when input is null, undefined, or empty', () => {
        expect(sortLines(null)).toEqual([]);
        expect(sortLines(undefined)).toEqual([]);
        expect(sortLines([])).toEqual([]);
    });

    it('should return a copy of the array when there is only one element', () => {
        const input = ['single'];
        expect(sortLines(input)).toEqual(['single']);
    });

    it('should sort strings in ascending order by default (case-sensitive)', () => {
        const input = ['banana', 'apple', 'cherry', 'apple'];
        const result = sortLines(input);
        expect(result).toEqual(['apple', 'apple', 'banana', 'cherry']);
    });

    it('should sort strings in descending order', () => {
        const input = ['banana', 'apple', 'cherry'];
        const result = sortLines(input, SortingTypes.DSC);
        expect(result).toEqual(['cherry', 'banana', 'apple']);
    });

    it('should sort strings in ascending order ignoring case', () => {
        const input = ['banana', 'Apple', 'cherry'];
        const result = sortLines(input, SortingTypes.ASC_IGN_CASE);
        expect(result).toEqual(['Apple', 'banana', 'cherry']);
    });

    it('should sort strings in descending order ignoring case', () => {
        const input = ['banana', 'Apple', 'cherry'];
        const result = sortLines(input, SortingTypes.DSC_IGN_CASE);
        expect(result).toEqual(['cherry', 'banana', 'Apple']);
    });
});

describe('shuffleStrings', () => {
    it('should return an empty array when input is null, undefined, or empty', () => {
        expect(shuffleLines(null)).toEqual([]);
        expect(shuffleLines(undefined)).toEqual([]);
        expect(shuffleLines([])).toEqual([]);
    });

    it('should return a copy of the array when there is only one element', () => {
        const input = ['only'];
        expect(shuffleLines(input)).toEqual(['only']);
    });

    it('should return a permutation of the original array', () => {
        const input = ['a', 'b', 'c', 'd', 'e'];
        const shuffled = shuffleLines(input);
        // Ensure all elements exist (order can vary)
        expect(shuffled.sort()).toEqual(input.sort());
    });

    it('should likely produce different orders on subsequent shuffles', () => {
        const input = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const shuffled1 = shuffleLines(input);
        const shuffled2 = shuffleLines(input);
        // Although it's possible to have the same order, it's extremely unlikely for a large array.
        expect(JSON.stringify(shuffled1)).not.toEqual(JSON.stringify(shuffled2));
    });
});

describe('removeDuplicates', () => {
    it('should return an empty array when input is null, undefined, or empty', () => {
        expect(removeDuplicates(null)).toEqual([]);
        expect(removeDuplicates(undefined)).toEqual([]);
        expect(removeDuplicates([])).toEqual([]);
    });

    it('should return the same array when there is only one element', () => {
        const input = ['single'];
        expect(removeDuplicates(input)).toEqual(['single']);
    });

    it('should remove duplicate strings in a case-sensitive manner by default', () => {
        const input = ['a', 'b', 'a', 'c', 'B'];
        const result = removeDuplicates(input);
        expect(result).toEqual(['a', 'b', 'c', 'B']);
    });

    it('should remove duplicate strings ignoring case when specified', () => {
        const input = ['a', 'A', 'b', 'B', 'a'];
        const result = removeDuplicates(input, true);
        // Only the first occurrence is kept
        expect(result).toEqual(['a', 'b']);
    });

    it('should maintain the order of the first occurrences', () => {
        const input = ['b', 'a', 'B', 'a', 'c', 'C'];
        const result = removeDuplicates(input, true);
        expect(result).toEqual(['b', 'a', 'c']);
    });
});
