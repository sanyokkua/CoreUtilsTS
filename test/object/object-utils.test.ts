import { getDefaultOnNull, isEmptyArray, isNull, isNullOrUndefined, isUndefined } from '../../src/object/object-utils';

describe('Object Utilities', () => {
    describe('isNull', () => {
        it('should return true when the value is null', () => {
            expect(isNull(null)).toBe(true);
        });

        it('should return false when the value is undefined', () => {
            expect(isNull(undefined)).toBe(false);
        });

        it('should return false for any non-null value', () => {
            expect(isNull('test')).toBe(false);
            expect(isNull(0)).toBe(false);
            expect(isNull({})).toBe(false);
            expect(isNull([])).toBe(false);
        });
    });

    describe('isUndefined', () => {
        it('should return true when the value is undefined', () => {
            expect(isUndefined(undefined)).toBe(true);
        });

        it('should return false when the value is null', () => {
            expect(isUndefined(null)).toBe(false);
        });

        it('should return false for any non-undefined value', () => {
            expect(isUndefined('test')).toBe(false);
            expect(isUndefined(0)).toBe(false);
            expect(isUndefined({})).toBe(false);
            expect(isUndefined([])).toBe(false);
        });
    });

    describe('isNullOrUndefined', () => {
        it('should return true when the value is null', () => {
            expect(isNullOrUndefined(null)).toBe(true);
        });

        it('should return true when the value is undefined', () => {
            expect(isNullOrUndefined(undefined)).toBe(true);
        });

        it('should return false for any non-nullish value', () => {
            expect(isNullOrUndefined('test')).toBe(false);
            expect(isNullOrUndefined(0)).toBe(false);
            expect(isNullOrUndefined({})).toBe(false);
            expect(isNullOrUndefined([])).toBe(false);
        });
    });

    describe('getDefaultOnNull', () => {
        it('should return the default value when input is null', () => {
            expect(getDefaultOnNull(null, 'default')).toBe('default');
        });

        it('should return the default value when input is undefined', () => {
            expect(getDefaultOnNull(undefined, 'default')).toBe('default');
        });

        it('should return the original value when it is not null or undefined', () => {
            expect(getDefaultOnNull('value', 'default')).toBe('value');
            expect(getDefaultOnNull(123, 'default')).toBe(123);
            expect(getDefaultOnNull([], 'default')).toEqual([]);
        });
    });

    describe('isEmptyArray', () => {
        it('should return true when the value is undefined', () => {
            expect(isEmptyArray(undefined)).toBe(true);
        });

        it('should return true when the value is null', () => {
            expect(isEmptyArray(null)).toBe(true);
        });

        it('should return true for an empty array', () => {
            expect(isEmptyArray([])).toBe(true);
        });

        it('should return false for a non-empty array', () => {
            expect(isEmptyArray([1])).toBe(false);
            expect(isEmptyArray(['a', 'b'])).toBe(false);
            expect(isEmptyArray([null])).toBe(false); // Even if element is null, array length > 0
        });
    });
});
