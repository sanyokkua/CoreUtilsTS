import {
    capitalize,
    determineStringCase,
    isCamelCase,
    isCobolCase,
    isDotCase,
    isKebabCase,
    isLowerCase,
    isLowerCaseStrict,
    isPascalCase,
    isScreamingSnakeCase,
    isSentenceCase,
    isSlashCase,
    isSnakeCase,
    isTitleCase,
    isTrainCase,
    isUpperCase,
    isUpperCaseStrict,
    swapCase,
    toCamelCase,
    toCobolCase,
    toDotCase,
    toKebabCase,
    toLowerCase,
    toLowerCaseStrict,
    toPascalCase,
    toScreamingSnakeCase,
    toSentenceCase,
    toSlashCase,
    toSnakeCase,
    toTitleCase,
    toTrainCase,
    toUpperCase,
    toUpperCaseStrict,
    uncapitalize,
} from '../../src/string/case-utils';
import { StringCaseTypes } from '../../src/string/types';

describe('String case validation functions', () => {
    describe('isLowerCaseStrict', () => {
        test.each([
            { input: '', expected: false },
            { input: '   ', expected: false },
            { input: 'hello', expected: true },
            { input: 'helloworld', expected: true },
            { input: 'héllo', expected: true }, // Latin with diacritic is lowercase letter
            { input: 'привіт', expected: true }, // Cyrillic lowercase
            { input: 'hello123', expected: false }, // digits not allowed
            { input: 'hello_world', expected: false },
            { input: 'Hello', expected: false },
            { input: 'HELLO', expected: false },
            { input: 'hello-world', expected: false },
        ])('returns $expected for "$input"', ({ input, expected }) => {
            expect(isLowerCaseStrict(input)).toBe(expected);
        });
    });

    describe('isUpperCaseStrict', () => {
        test.each([
            { input: '', expected: false },
            { input: '   ', expected: false },
            { input: 'HELLO', expected: true },
            { input: 'APIKEY', expected: true },
            { input: 'ПРИВІТ', expected: true }, // Cyrillic uppercase
            { input: 'HELLO123', expected: false }, // digits disallowed
            { input: 'HELLO_WORLD', expected: false },
            { input: 'Hello', expected: false },
            { input: 'hello', expected: false },
        ])('returns $expected for "$input"', ({ input, expected }) => {
            expect(isUpperCaseStrict(input)).toBe(expected);
        });
    });

    describe('isLowerCase', () => {
        test.each([
            { input: '', expected: false },
            { input: '   ', expected: false },
            { input: 'hello', expected: true },
            { input: 'hello world', expected: true },
            { input: 'hello123', expected: true },
            { input: 'héllo-world!', expected: true }, // punctuation allowed
            { input: 'Привіт світ', expected: false }, // uppercase Cyrillic
            { input: 'Hello', expected: false },
        ])('returns $expected for "$input"', ({ input, expected }) => {
            expect(isLowerCase(input)).toBe(expected);
        });
    });

    describe('isUpperCase', () => {
        test.each([
            { input: '', expected: false },
            { input: '   ', expected: false },
            { input: 'HELLO', expected: true },
            { input: 'HELLO WORLD', expected: true },
            { input: 'HELLO123', expected: true },
            { input: 'HELLO-WORLD!', expected: true },
            { input: 'привіт світ', expected: false }, // lowercase Cyrillic
            { input: 'Hello', expected: false },
        ])('returns $expected for "$input"', ({ input, expected }) => {
            expect(isUpperCase(input)).toBe(expected);
        });
    });

    describe('isSentenceCase', () => {
        test.each([
            { input: '', expected: false },
            { input: '   ', expected: false },
            { input: 'H', expected: false }, // single char invalid (length <2)
            { input: 'Hi', expected: true },
            { input: 'Hello world', expected: true },
            { input: 'Hello World', expected: false }, // second word uppercase
            { input: 'Привіт світ', expected: true }, // Cyrillic
            { input: 'Привіт Світ', expected: false },
            { input: 'Hello  world', expected: false }, // double space
            { input: ' Hello world', expected: false }, // leading space
            { input: 'Hello world ', expected: true }, // trailing space
            { input: 'Hello123 test', expected: true },
        ])('returns $expected for "$input"', ({ input, expected }) => {
            expect(isSentenceCase(input)).toBe(expected);
        });
    });

    describe('isTitleCase', () => {
        test.each([
            { input: '', expected: false },
            { input: 'hello world', expected: false },
            { input: 'Hello World', expected: true },
            { input: 'My Variable Name', expected: true },
            { input: 'Welcome To The Jungle 5th Time', expected: true },
            { input: 'Data-driven Approach', expected: false },
            { input: 'Привіт Світ', expected: true },
            { input: 'Привіт світ', expected: false },
            { input: 'Hello  World', expected: false },
        ])('returns $expected for "$input"', ({ input, expected }) => {
            expect(isTitleCase(input)).toBe(expected);
        });
    });

    describe('isCamelCase', () => {
        test.each([
            { input: '', expected: false },
            { input: 'helloWorld', expected: true },
            { input: 'myVariableName', expected: true },
            { input: 'thisIsATest234', expected: true },
            { input: 'HelloWorld', expected: false },
            { input: 'hello_world', expected: false },
            { input: 'привітСвіт', expected: true }, // Cyrillic
            { input: 'hello2World', expected: true },
            { input: '2helloWorld', expected: false },
        ])('returns $expected for "$input"', ({ input, expected }) => {
            expect(isCamelCase(input)).toBe(expected);
        });
    });

    describe('isPascalCase', () => {
        test.each([
            { input: '', expected: false },
            { input: 'HelloWorld', expected: true },
            { input: 'MyClassName2', expected: true },
            { input: 'UserAccountController', expected: true },
            { input: 'apiV2Handler', expected: false },
            { input: 'ПривітСвіт', expected: true }, // Cyrillic
            { input: '2ApiClass', expected: false },
        ])('returns $expected for "$input"', ({ input, expected }) => {
            expect(isPascalCase(input)).toBe(expected);
        });
    });

    describe('isSnakeCase', () => {
        test.each([
            { input: '', expected: false },
            { input: 'hello_world', expected: true },
            { input: 'my_variable_name', expected: true },
            { input: 'test_case_number_4', expected: true },
            { input: 'var_1_value', expected: true },
            { input: 'Hello_world', expected: false },
            { input: 'hello__world', expected: false },
            { input: 'hello-world', expected: false },
            { input: 'привіт_світ', expected: true },
        ])('returns $expected for "$input"', ({ input, expected }) => {
            expect(isSnakeCase(input)).toBe(expected);
        });
    });

    describe('isScreamingSnakeCase', () => {
        test.each([
            { input: '', expected: false },
            { input: 'HELLO_WORLD', expected: true },
            { input: 'MAX_BUFFER_SIZE', expected: true },
            { input: 'VERSION_2', expected: true },
            { input: 'hello_WORLD', expected: false },
            { input: 'HELLO__WORLD', expected: false },
            { input: 'Привіт_Світ', expected: false },
        ])('returns $expected for "$input"', ({ input, expected }) => {
            expect(isScreamingSnakeCase(input)).toBe(expected);
        });
    });

    describe('isKebabCase', () => {
        test.each([
            { input: '', expected: false },
            { input: 'hello-world', expected: true },
            { input: 'my-variable-name', expected: true },
            { input: 'long-url-path-2', expected: true },
            { input: 'Hello-World', expected: false },
            { input: 'hello--world', expected: false },
            { input: 'привіт-світ', expected: true },
        ])('returns $expected for "$input"', ({ input, expected }) => {
            expect(isKebabCase(input)).toBe(expected);
        });
    });

    describe('isCobolCase', () => {
        test.each([
            { input: '', expected: false },
            { input: 'HELLO-WORLD', expected: true },
            { input: 'MAX-RECORD-LENGTH', expected: true },
            { input: 'REPLACE-ALL-10-OCCURRENCES', expected: true },
            { input: 'hello-WORLD', expected: false },
            { input: 'HELLO--WORLD', expected: false },
            { input: 'ПРИВІТ-СВІТ', expected: true },
        ])('returns $expected for "$input"', ({ input, expected }) => {
            expect(isCobolCase(input)).toBe(expected);
        });
    });

    describe('isTrainCase', () => {
        test.each([
            { input: '', expected: false },
            { input: 'Hello-World', expected: true },
            { input: 'My-Variable-2-Name', expected: true },
            { input: 'Test-Case-Generator', expected: true },
            { input: 'hello-World', expected: false },
            { input: 'Hello--World', expected: false },
            { input: 'Привіт-Світ', expected: true },
        ])('returns $expected for "$input"', ({ input, expected }) => {
            expect(isTrainCase(input)).toBe(expected);
        });
    });

    describe('isDotCase', () => {
        test.each([
            { input: '', expected: false },
            { input: 'hello.world', expected: true },
            { input: 'config.file.name', expected: true },
            { input: 'module.submodule.function.2', expected: true },
            { input: 'hello..world', expected: false },
            { input: 'Hello.world', expected: false },
            { input: 'привіт.світ', expected: true },
        ])('returns $expected for "$input"', ({ input, expected }) => {
            expect(isDotCase(input)).toBe(expected);
        });
    });

    describe('isSlashCase', () => {
        test.each([
            { input: '', expected: false },
            { input: 'hello/world', expected: true },
            { input: 'user/profile/2', expected: true },
            { input: 'docs/api/reference', expected: true },
            { input: 'hello//world', expected: false },
            { input: 'Hello/world', expected: false },
            { input: 'привіт/світ', expected: true },
        ])('returns $expected for "$input"', ({ input, expected }) => {
            expect(isSlashCase(input)).toBe(expected);
        });
    });

    describe('determineStringCase parametrized', () => {
        const cases = [
            // Basic empty and non-alpha
            { input: '', expected: StringCaseTypes.UNKNOWN, props: {} },
            { input: '   ', expected: StringCaseTypes.UNKNOWN, props: {} },
            { input: '@#$%^&*', expected: StringCaseTypes.UNKNOWN, props: {} },
            { input: ' !', expected: StringCaseTypes.UNKNOWN, props: { ignoreSpecialChars: true } },
            // // Strict lowercase/uppercase
            { input: 'helloworld', expected: StringCaseTypes.LOWER_CASE_STRICT, props: {} },
            { input: 'HELLOWORLD', expected: StringCaseTypes.UPPER_CASE_STRICT, props: {} },
            // Loose lowercase/uppercase
            { input: 'hello world!', expected: StringCaseTypes.LOWER_CASE, props: {} },
            { input: 'hello world!', expected: StringCaseTypes.LOWER_CASE, props: { ignoreSpecialChars: true } },
            { input: 'HELLO WORLD!', expected: StringCaseTypes.UPPER_CASE, props: {} },
            { input: 'HELLO WORLD!', expected: StringCaseTypes.UPPER_CASE, props: { ignoreSpecialChars: true } },
            // Sentence vs Title
            { input: 'Hello world', expected: StringCaseTypes.SENTENCE_CASE, props: {} },
            { input: 'Hello World', expected: StringCaseTypes.TITLE_CASE, props: {} },
            { input: 'Привіт світ', expected: StringCaseTypes.SENTENCE_CASE, props: {} },
            { input: 'Привіт Світ', expected: StringCaseTypes.TITLE_CASE, props: {} },
            // // Camel vs Pascal
            { input: 'helloWorld', expected: StringCaseTypes.CAMEL_CASE, props: {} },
            { input: 'HelloWorld', expected: StringCaseTypes.PASCAL_CASE, props: {} },
            { input: 'привітСвіт', expected: StringCaseTypes.CAMEL_CASE, props: {} },
            { input: 'ПривітСвіт', expected: StringCaseTypes.PASCAL_CASE, props: {} },
            // // Snake, screaming snake
            { input: 'hello_world', expected: StringCaseTypes.SNAKE_CASE, props: {} },
            { input: 'HELLO_WORLD', expected: StringCaseTypes.SCREAMING_SNAKE_CASE, props: {} },
            // // Kebab, COBOL, Train
            { input: 'hello-world', expected: StringCaseTypes.KEBAB_CASE, props: {} },
            { input: 'HELLO-WORLD', expected: StringCaseTypes.COBOL_CASE, props: {} },
            { input: 'Hello-World', expected: StringCaseTypes.TRAIN_CASE, props: {} },
            // // Dot, Slash
            { input: 'a.b.c', expected: StringCaseTypes.DOT_CASE, props: {} },
            { input: 'a/b/c', expected: StringCaseTypes.SLASH_CASE, props: {} },
            // Mixed with digits without ignore
            { input: 'hello123world', expected: StringCaseTypes.CAMEL_CASE, props: {} },
            { input: 'hello123world', expected: StringCaseTypes.LOWER_CASE_STRICT, props: { ignoreDigits: true } },
            { input: 'Camel123Case', expected: StringCaseTypes.PASCAL_CASE, props: {} },
            { input: 'Camel123Case', expected: StringCaseTypes.PASCAL_CASE, props: { ignoreDigits: true } },
            // // With ignoreDigits
            { input: 'hello123world', expected: StringCaseTypes.LOWER_CASE_STRICT, props: { ignoreDigits: true } },
            { input: 'HELLO123WORLD', expected: StringCaseTypes.UPPER_CASE_STRICT, props: { ignoreDigits: true } },
            // With ignoreSpecialChars
            { input: 'Hello,World!', expected: StringCaseTypes.PASCAL_CASE, props: { ignoreSpecialChars: true } },
            { input: 'Hello,World!', expected: StringCaseTypes.UNKNOWN, props: { ignoreSpecialChars: false } },
            { input: 'hello_world-test', expected: StringCaseTypes.UNKNOWN, props: { ignoreSpecialChars: true } },
            { input: 'hello_world-test', expected: StringCaseTypes.UNKNOWN, props: { ignoreSpecialChars: false } },
            // Combined ignore
            {
                input: 'HELLO@WORLD123',
                expected: StringCaseTypes.UPPER_CASE_STRICT,
                props: { ignoreDigits: true, ignoreSpecialChars: true },
            },
            {
                input: 'hello@world123',
                expected: StringCaseTypes.LOWER_CASE_STRICT,
                props: { ignoreDigits: true, ignoreSpecialChars: true },
            },
            {
                input: 'Hello@World123',
                expected: StringCaseTypes.PASCAL_CASE,
                props: { ignoreDigits: true, ignoreSpecialChars: true },
            },
        ];

        test.each(cases)('$input with props $props should be $expected', ({ input, expected, props }) => {
            expect(determineStringCase(input, props)).toBe(expected);
        });
    });

    describe('Case transformer functions', () => {
        describe('toLowerCase', () => {
            test.each([
                { input: 'Hello WORLD', expected: 'hello world' },
                { input: 'ПрИвІт', expected: 'привіт' },
                { input: '123ABC', expected: '123abc' },
                { input: 'ABC_123', expected: 'abc_123' },
            ])('"%s" -> "%s"', ({ input, expected }) => {
                expect(toLowerCase(input)).toBe(expected);
            });
        });

        describe('toUpperCase', () => {
            test.each([
                { input: 'Hello world', expected: 'HELLO WORLD' },
                { input: 'ПрИвІт', expected: 'ПРИВІТ' },
                { input: '123abc', expected: '123ABC' },
                { input: '123_abc', expected: '123_ABC' },
            ])('"%s" -> "%s"', ({ input, expected }) => {
                expect(toUpperCase(input)).toBe(expected);
            });
        });

        describe('toLowerCaseStrict', () => {
            test.each([
                { input: 'Hello WORLD!123', expected: 'helloworld' },
                { input: 'ПрИ,В і -т!', expected: 'привіт' },
                { input: '123', expected: '' },
            ])('"%s" -> "%s"', ({ input, expected }) => {
                expect(toLowerCaseStrict(input)).toBe(expected);
            });
        });

        describe('toUpperCaseStrict', () => {
            test.each([
                { input: 'Hello world!123', expected: 'HELLOWORLD' },
                { input: 'привіт-світ', expected: 'ПРИВІТСВІТ' },
                { input: '123', expected: '' },
            ])('"%s" -> "%s"', ({ input, expected }) => {
                expect(toUpperCaseStrict(input)).toBe(expected);
            });
        });

        describe('toSentenceCase', () => {
            test.each([
                { input: 'hello WORLD_foo', expected: 'Hello world foo' },
                { input: 'ПрИвіт-світ', expected: 'Пр ивіт світ' },
                { input: 'ПрИвіт-світ123', expected: 'Пр ивіт світ123' },
                { input: '', expected: '' },
            ])('"%s" -> "%s"', ({ input, expected }) => {
                expect(toSentenceCase(input)).toBe(expected);
            });
        });

        describe('toTitleCase', () => {
            test.each([
                { input: 'hello world foo', expected: 'Hello World Foo' },
                { input: 'привіт-світ', expected: 'Привіт Світ' },
                { input: '', expected: '' },
            ])('"%s" -> "%s"', ({ input, expected }) => {
                expect(toTitleCase(input)).toBe(expected);
            });
        });

        describe('toCamelCase', () => {
            test.each([
                { input: 'hello world foo', expected: 'helloWorldFoo' },
                { input: 'Привіт-світ тест', expected: 'привітСвітТест' },
                { input: 'FOO_bar-baz', expected: 'fooBarBaz' },
            ])('"%s" -> "%s"', ({ input, expected }) => {
                expect(toCamelCase(input)).toBe(expected);
            });
        });

        describe('toPascalCase', () => {
            test.each([
                { input: 'hello world foo', expected: 'HelloWorldFoo' },
                { input: 'привіт-світ test', expected: 'ПривітСвітTest' },
                { input: 'foo_bar-baz', expected: 'FooBarBaz' },
            ])('"%s" -> "%s"', ({ input, expected }) => {
                expect(toPascalCase(input)).toBe(expected);
            });
        });

        describe('toSnakeCase', () => {
            test.each([
                { input: 'helloWorld Foo', expected: 'hello_world_foo' },
                { input: 'Привіт-світ Тест', expected: 'привіт_світ_тест' },
                { input: 'Foo-BarBaz', expected: 'foo_bar_baz' },
            ])('"%s" -> "%s"', ({ input, expected }) => {
                expect(toSnakeCase(input)).toBe(expected);
            });
        });

        describe('toScreamingSnakeCase', () => {
            test.each([
                { input: 'helloWorld Foo', expected: 'HELLO_WORLD_FOO' },
                { input: 'Привіт-світ тест', expected: 'ПРИВІТ_СВІТ_ТЕСТ' },
                { input: 'foo-barBaz', expected: 'FOO_BAR_BAZ' },
            ])('"%s" -> "%s"', ({ input, expected }) => {
                expect(toScreamingSnakeCase(input)).toBe(expected);
            });
        });

        describe('toKebabCase', () => {
            test.each([
                { input: 'helloWorld Foo', expected: 'hello-world-foo' },
                { input: 'Привіт_світ Тест', expected: 'привіт-світ-тест' },
                { input: 'FooBar baz', expected: 'foo-bar-baz' },
            ])('"%s" -> "%s"', ({ input, expected }) => {
                expect(toKebabCase(input)).toBe(expected);
            });
        });

        describe('toCobolCase', () => {
            test.each([
                { input: 'helloWorld Foo', expected: 'HELLO-WORLD-FOO' },
                { input: 'Привіт світ_тест', expected: 'ПРИВІТ-СВІТ-ТЕСТ' },
                { input: 'fooBarBaz', expected: 'FOO-BAR-BAZ' },
            ])('"%s" -> "%s"', ({ input, expected }) => {
                expect(toCobolCase(input)).toBe(expected);
            });
        });

        describe('toTrainCase', () => {
            test.each([
                { input: 'helloWorld foo', expected: 'Hello-World-Foo' },
                { input: 'привіт-світтест', expected: 'Привіт-Світтест' },
                { input: 'foo_barBaz', expected: 'Foo-Bar-Baz' },
            ])('"%s" -> "%s"', ({ input, expected }) => {
                expect(toTrainCase(input)).toBe(expected);
            });
        });

        describe('toDotCase', () => {
            test.each([
                { input: 'helloWorld Foo', expected: 'hello.world.foo' },
                { input: 'Привіт світ', expected: 'привіт.світ' },
                { input: 'fooBarBaz', expected: 'foo.bar.baz' },
            ])('"%s" -> "%s"', ({ input, expected }) => {
                expect(toDotCase(input)).toBe(expected);
            });
        });

        describe('toSlashCase', () => {
            test.each([
                { input: 'helloWorld Foo', expected: 'hello/world/foo' },
                { input: 'Привіт-світ тест', expected: 'привіт/світ/тест' },
                { input: 'fooBar_baz', expected: 'foo/bar/baz' },
            ])('"%s" -> "%s"', ({ input, expected }) => {
                expect(toSlashCase(input)).toBe(expected);
            });
        });

        describe('swapCase', () => {
            test.each([
                { input: 'Hello World!', expected: 'hELLO wORLD!' },
                { input: 'ПрИВіТ', expected: 'пРивІт' },
                { input: '123abcDEF', expected: '123ABCdef' },
            ])('"%s" -> "%s"', ({ input, expected }) => {
                expect(swapCase(input)).toBe(expected);
            });
        });

        describe('capitalize', () => {
            test.each([
                { input: 'hello world', expected: 'Hello world' },
                { input: 'Привіт', expected: 'Привіт' },
                { input: '', expected: '' },
            ])('"%s" -> "%s"', ({ input, expected }) => {
                expect(capitalize(input)).toBe(expected);
            });
        });

        describe('uncapitalize', () => {
            test.each([
                { input: 'Hello World', expected: 'hello World' },
                { input: 'Привіт', expected: 'привіт' },
                { input: '', expected: '' },
            ])('"%s" -> "%s"', ({ input, expected }) => {
                expect(uncapitalize(input)).toBe(expected);
            });
        });
    });
});
