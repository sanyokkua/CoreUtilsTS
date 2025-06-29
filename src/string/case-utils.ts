import { isBlankString, isNotAlphanumeric, isNullOrBlankString } from './string-utils';
import { DASH, DetermineStringCaseProps, DOT, SLASH, SPACE, StringCaseTypes, TypeDetector, UNDERSCORE } from './types';

/**
 * Checks whether a string contains only Unicode lowercase letters, with no digits or separators.
 *
 * @param input - The string to check for strict lowercase characters.
 * @returns `true` if the input consists solely of Unicode lowercase letters; otherwise, `false`.
 */
export function isLowerCaseStrict(input: string): boolean {
    // Only Unicode lowercase letters, no digits or separators
    if (isNullOrBlankString(input)) {
        return false;
    }
    // \p{Ll} matches any lowercase letter in Unicode
    const reg = /^\p{Ll}+$/u;
    return reg.test(input);
}

/**
 * Determines whether a string consists exclusively of uppercase Unicode letters.
 *
 * @param input The string to check for strictly uppercase content.
 * @returns true if the entire string contains only uppercase letters; false otherwise.
 */
export function isUpperCaseStrict(input: string): boolean {
    // Only Unicode uppercase letters, no digits or separators
    if (isNullOrBlankString(input)) {
        return false;
    }
    // \p{Lu} matches any uppercase letter in Unicode
    const reg = /^\p{Lu}+$/u;
    return reg.test(input);
}

/**
 * Determines whether the given string consists exclusively of lowercase letters,
 * ignoring any non-letter characters such as digits, spaces, or punctuation.
 *
 * @param input - The string to check for lowercase-only content.
 * @returns `true` if all alphabetic characters in the string are lowercase;
 * otherwise returns `false`.
 */
export function isLowerCase(input: string): boolean {
    // All letters lowercase; may include digits, spaces, punctuation
    if (isNullOrBlankString(input)) {
        return false;
    }
    // Compare with its lowercase form
    return input === input.toLowerCase();
}

/**
 * Checks if the entire input string consists solely of uppercase Latin alphabet letters.
 *
 * @param input The string to check for all-uppercase characters. Non-alphabetic
 *              characters (digits, spaces, punctuation) are allowed.
 * @returns True if the input contains only uppercase letters; false otherwise.
 */
export function isUpperCase(input: string): boolean {
    // All letters uppercase; may include digits, spaces, punctuation
    if (isNullOrBlankString(input)) {
        return false;
    }
    // Compare with its uppercase form
    return input === input.toUpperCase();
}

/**
 * Determines if a string follows sentence case formatting rules.
 * Sentence case requires the first character to be uppercase, followed by lowercase letters or digits,
 * with words separated by single spaces. Leading/trailing whitespace is ignored.
 *
 * @param input The string to check for sentence case formatting.
 * @returns True if the input matches sentence case format, false otherwise.
 */
export function isSentenceCase(input: string): boolean {
    // First letter uppercase, words separated by single spaces, rest lowercase or digits
    if (isNullOrBlankString(input)) {
        return false;
    }
    if (isNotAlphanumeric(input[0]) || input.length < 2) {
        return false;
    }
    // Words: first word begins with uppercase letter
    const reg = /^\p{Lu}[\p{Ll}\p{Nd}]*(?: [\p{Ll}\p{Nd}]+)*$/u;
    return reg.test(input.trim());
}

/**
 * Checks if a string is in title case format.
 * Every word must start with an uppercase letter, followed by lowercase letters or digits,
 * separated by spaces. Returns false for empty strings.
 *
 * @param input - The string to check.
 * @returns True if the string conforms to title case rules, false otherwise.
 */
export function isTitleCase(input: string): boolean {
    // Every word starts uppercase, subsequent letters lowercase or digits, spaces in between
    if (isNullOrBlankString(input)) {
        return false;
    }
    const reg = /^\p{Lu}[\p{Ll}\p{Nd}]*(?: [\p{Lu}\p{Nd}][\p{Ll}\p{Nd}]*)*$/u;
    return reg.test(input);
}

/**
 * Determines if a string is in camelCase format.
 *
 * A valid camelCase string must:
 * - Start with lowercase letter(s)
 * - Contain subsequent words starting with uppercase letters or digits
 * - Have no separators between words (e.g., underscores, hyphens)
 * - Follow Unicode case rules for alphabetic characters
 *
 * @param input The string to validate.
 */
export function isCamelCase(input: string): boolean {
    // First word lowercase, subsequent words start uppercase or digit, no separators
    if (isNullOrBlankString(input)) {
        return false;
    }
    const reg = /^[\p{Ll}]+(?:[\p{Lu}\p{Nd}][\p{Ll}\p{Nd}]*)*$/u;
    return reg.test(input);
}

/**
 * Determines if a string follows PascalCase naming convention.
 * Words must start with an uppercase letter, followed by lowercase letters or digits,
 * with no separators. E.g., "HelloWorld", "APIVersion".
 *
 * @param input - The string to check for PascalCase format.
 * @returns True if the input is in PascalCase, false otherwise.
 */
export function isPascalCase(input: string): boolean {
    // Each word starts uppercase, no separators, letters/digits after
    if (isNullOrBlankString(input)) {
        return false;
    }
    const reg = /^[\p{Lu}][\p{Ll}\p{Nd}]*(?:[\p{Lu}][\p{Ll}\p{Nd}]*)*$/u;
    return reg.test(input);
}

/**
 * Checks if a string is in snake_case format.
 *
 * @param input - The string to validate.
 * @returns `true` if the string is formatted as snake case, otherwise `false`.
 */
export function isSnakeCase(input: string): boolean {
    // lowercase words, digits allowed, separated by single underscore
    if (isNullOrBlankString(input)) {
        return false;
    }
    // first char must be lowercase letter
    const reg = /^[\p{Ll}][\p{Ll}\p{Nd}]*(?:_[\p{Ll}\p{Nd}]+)*$/u;
    return reg.test(input);
}

/**
 * Validates if the given string follows the "Screaming Snake Case" convention.
 * A valid Screaming Snake Case must consist of uppercase letters and digits,
 * separated by single underscore characters, starting with an uppercase letter.
 *
 * @param input - The string to check for Screaming Snake Case format.
 * @returns `true` if the input follows the Screaming Snake Case pattern; otherwise `false`.
 */
export function isScreamingSnakeCase(input: string): boolean {
    // UPPERCASE words, digits allowed, separated by single underscore
    if (isNullOrBlankString(input)) {
        return false;
    }
    const reg = /^[\p{Lu}][\p{Lu}\p{Nd}]*(?:_[\p{Lu}\p{Nd}]+)*$/u;
    return reg.test(input);
}

/**
 * Determines if a string is in kebab-case format.
 *
 * A valid kebab-case string consists of lowercase letters and digits,
 * with hyphens separating words, and no other special characters.
 *
 * @param input - The string to check for kebab-case pattern.
 * @returns `true` if the string matches kebab-case pattern; otherwise `false`.
 */
export function isKebabCase(input: string): boolean {
    // lowercase words, digits allowed, separated by single hyphen
    if (isNullOrBlankString(input)) {
        return false;
    }
    const reg = /^[\p{Ll}][\p{Ll}\p{Nd}]*(?:-[\p{Ll}\p{Nd}]+)*$/u;
    return reg.test(input);
}

/**
 * Determines if a string follows Cobol naming conventions.
 *
 * @param input The string to check for Cobol case format.
 * @returns true if the input matches Cobol's uppercase-with-hyphens pattern; false otherwise.
 */
export function isCobolCase(input: string): boolean {
    // UPPERCASE words, digits allowed, separated by single hyphen
    if (isNullOrBlankString(input)) {
        return false;
    }
    const reg = /^[\p{Lu}][\p{Lu}\p{Nd}]*(?:-[\p{Lu}\p{Nd}]+)*$/u;
    return reg.test(input);
}

/**
 * Checks if the input string matches a "Train Case" format where each word starts with an uppercase letter,
 * followed by lowercase letters and/or digits, separated by hyphens.
 *
 * @param input - The string to validate against Train Case pattern.
 * @returns `true` if the string is in Train Case format; otherwise, `false`.
 */
export function isTrainCase(input: string): boolean {
    // Each word starts uppercase, digits lowercase mix allowed, separated by hyphens
    if (isNullOrBlankString(input)) {
        return false;
    }
    const reg = /^[\p{Lu}\p{Nd}][\p{Ll}\p{Nd}]*(?:-[\p{Lu}\p{Nd}][\p{Ll}\p{Nd}]*)*$/u;
    return reg.test(input);
}

/**
 * Determines if a string follows the dot-case format, which consists of lowercase words
 * separated by dots with only letters and numbers allowed.
 *
 * @param input - The string to check for dot-case format compliance.
 * @returns true if the input matches the dot-case pattern; false otherwise.
 */
export function isDotCase(input: string): boolean {
    // lowercase words, digits allowed, separated by dots
    if (isNullOrBlankString(input)) {
        return false;
    }
    const reg = /^[\p{Ll}][\p{Ll}\p{Nd}]*(?:\.[\p{Ll}\p{Nd}]+)*$/u;
    return reg.test(input);
}

/**
 * Validates if the input string matches the slash-case naming pattern.
 * Consists of lowercase words or digits, separated by forward slashes.
 *
 * @param input - The string to validate for slash-case format.
 * @returns `true` if the string follows the slash-case pattern; otherwise, `false`.
 */
export function isSlashCase(input: string): boolean {
    // lowercase words, digits allowed, separated by forward slashes
    if (isNullOrBlankString(input)) {
        return false;
    }
    const reg = /^[\p{Ll}][\p{Ll}\p{Nd}]*(?:\/[\p{Ll}\p{Nd}]+)*$/u;
    return reg.test(input);
}

/**
 * Sanitizes an input string according to specified properties.
 * Removes extra whitespace and optional digits or special characters based on props.
 *
 * @param input - The string value to be sanitized.
 * @param props - Properties controlling sanitization behavior.
 * @returns A sanitized version of the input string with controlled character set.
 */
function sanitizeInputValue(input: string, props: DetermineStringCaseProps): string {
    const { ignoreDigits = false, ignoreSpecialChars = false } = props;
    let sanitized = input.trim();
    if (ignoreDigits) {
        sanitized = sanitized.replace(/\p{Nd}/gu, '');
    }
    if (ignoreSpecialChars) {
        // Keep only letters, digits, and common delimiters
        const DELIMS = [SPACE, `\\${DOT}`, SLASH, DASH, UNDERSCORE];
        const pattern = `[^\\p{L}\\p{Nd}${DELIMS.join('')}]`;
        sanitized = sanitized.replace(new RegExp(pattern, 'gu'), '');
        ['@', '#', '$', '%', '^', '&', '*', '{', '}', ':', '|', '?', '>', '<'].forEach((char) => {
            sanitized = sanitized.replace(char, '');
        });
    }

    return sanitized.trim(); // remove spaces after sanitization
}

/**
 * Creates an array of string case detectors.
 * Each detector validates a specific case type using its associated validator function.
 *
 * @returns An array containing all available string case validators.
 */
function createDetectors(): TypeDetector[] {
    return [
        {
            caseType: StringCaseTypes.LOWER_CASE_STRICT,
            validator: isLowerCaseStrict,
        },
        {
            caseType: StringCaseTypes.UPPER_CASE_STRICT,
            validator: isUpperCaseStrict,
        },
        {
            caseType: StringCaseTypes.SENTENCE_CASE,
            validator: isSentenceCase,
        },
        {
            caseType: StringCaseTypes.TITLE_CASE,
            validator: isTitleCase,
        },
        {
            caseType: StringCaseTypes.CAMEL_CASE,
            validator: isCamelCase,
        },
        {
            caseType: StringCaseTypes.PASCAL_CASE,
            validator: isPascalCase,
        },
        {
            caseType: StringCaseTypes.SNAKE_CASE,
            validator: isSnakeCase,
        },
        {
            caseType: StringCaseTypes.SCREAMING_SNAKE_CASE,
            validator: isScreamingSnakeCase,
        },
        {
            caseType: StringCaseTypes.KEBAB_CASE,
            validator: isKebabCase,
        },
        {
            caseType: StringCaseTypes.TRAIN_CASE,
            validator: isTrainCase,
        },
        {
            caseType: StringCaseTypes.DOT_CASE,
            validator: isDotCase,
        },
        {
            caseType: StringCaseTypes.SLASH_CASE,
            validator: isSlashCase,
        },
        {
            caseType: StringCaseTypes.COBOL_CASE,
            validator: isCobolCase,
        },
        {
            caseType: StringCaseTypes.LOWER_CASE,
            validator: isLowerCase,
        },
        {
            caseType: StringCaseTypes.UPPER_CASE,
            validator: isUpperCase,
        },
    ];
}

/**
 * Determines the string case type based on the input string and provided options.
 * Analyzes alphanumeric patterns and special characters to identify various cases like title,
 * sentence, camel, pascal, kebab, snake, screaming snake, cobol, dot, slash, train, or lower/upper case.
 *
 * @param input The string value to analyze for its case type
 * @param props Options for case detection including `ignoreSpecialChars`
 * @returns A StringCaseTypes enum value representing the detected case pattern,
 *          or UNKNOWN if the pattern cannot be identified or matches multiple cases
 */
export function determineStringCase(input: string, props: DetermineStringCaseProps = {}): StringCaseTypes {
    if (isBlankString(input)) {
        return StringCaseTypes.UNKNOWN;
    }

    // Quick reject: if entirely non-alphanumeric and user didn't ask us to ignore special
    if (isNotAlphanumeric(input)) {
        const DELIMS = [SPACE, DOT, SLASH, DASH, UNDERSCORE];
        let hasDelim = 0;
        for (const delim of DELIMS) {
            if (input.includes(delim)) {
                hasDelim++;
            }
        }

        if (!hasDelim && !props.ignoreSpecialChars) {
            // for cases where string has special characters and these characters are not delimiters - return UNKNOWN
            return StringCaseTypes.UNKNOWN;
        }

        if (hasDelim > 1) {
            return StringCaseTypes.UNKNOWN; // several different delims means that string combines different cases.
        }
    }

    const sanitized = sanitizeInputValue(input, props);

    if (isBlankString(sanitized)) {
        return StringCaseTypes.UNKNOWN;
    }

    const detectors = createDetectors();

    // Run all validators
    const matches = detectors.filter(({ validator }) => validator(sanitized)).map(({ caseType }) => caseType);

    // Define a priority order: from most specific to most generic
    const priority: StringCaseTypes[] = [
        StringCaseTypes.LOWER_CASE_STRICT,
        StringCaseTypes.UPPER_CASE_STRICT,
        StringCaseTypes.SENTENCE_CASE,
        StringCaseTypes.TITLE_CASE,
        StringCaseTypes.CAMEL_CASE,
        StringCaseTypes.PASCAL_CASE,
        StringCaseTypes.SNAKE_CASE,
        StringCaseTypes.SCREAMING_SNAKE_CASE,
        StringCaseTypes.KEBAB_CASE,
        StringCaseTypes.TRAIN_CASE,
        StringCaseTypes.COBOL_CASE,
        StringCaseTypes.DOT_CASE,
        StringCaseTypes.SLASH_CASE,
        StringCaseTypes.LOWER_CASE,
        StringCaseTypes.UPPER_CASE,
    ];

    // Pick the highest-priority case type among the matches
    for (const caseType of priority) {
        if (matches.includes(caseType)) {
            return caseType;
        }
    }
    // Shouldn't reach here, but fallback just in case
    return StringCaseTypes.UNKNOWN;
}

// Utility to split any input into word tokens
/**
 * Tokenizes a string by separating camelCase and PascalCase words,
 * replacing non-alphanumeric characters with spaces, and normalizing whitespace.
 *
 * @param input - The string to be tokenized.
 * @returns An array of tokens (words) extracted from the input string.
 */
export function tokenize(input: string): string[] {
    if (!input || input.trim() === '') return [];
    // 1. Insert spaces between camelCase or PascalCase boundaries
    let result = input.replace(/([a-z\p{Ll}\p{Nd}])([A-Z\p{Lu}])/gu, '$1 $2');
    // 2. Replace non-alphanumeric characters with spaces
    result = result.replace(/[^\p{L}\p{Nd}]+/gu, ' ');
    // 3. Normalize whitespace
    return result.trim().split(/\s+/).filter(Boolean);
}

/**
 * Converts the given string to lowercase letters.
 * @param input The string to convert to lowercase.
 * @return A new string with all characters converted to lowercase.
 */
export function toLowerCase(input: string): string {
    return input.toLowerCase();
}

/**
 * Converts all characters in the given string to uppercase.
 *
 * @param input - The string to be converted to uppercase.
 * @returns The original string with all characters converted to uppercase.
 */
export function toUpperCase(input: string): string {
    return input.toUpperCase();
}

/**
 * Converts a string to lowercase while strictly preserving only letter characters.
 *
 * @param input The original string containing any mix of characters.
 * @returns A new string with all alphabetic characters converted to lowercase,
 *          and non-letter characters removed.
 */
export function toLowerCaseStrict(input: string): string {
    // Remove non-letter chars, then lowercase strictly
    const letters = input.match(/\p{L}/gu) || [];
    return letters.join('').toLowerCase();
}

/**
 * Converts all alphabetic characters in a string to uppercase, ignoring non-alphabetic characters.
 * @param input The string to be converted. Any character that is not an alphabetic letter is ignored.
 * @returns A new string containing only the uppercase alphabetic letters from the original string.
 */
export function toUpperCaseStrict(input: string): string {
    const letters = input.match(/\p{L}/gu) || [];
    return letters.join('').toUpperCase();
}

/**
 * Converts the given string to sentence case.
 *
 * @param input - The text to be converted to sentence case
 * @return The input string in sentence case, with first letter capitalized and remaining letters lowercased
 */
export function toSentenceCase(input: string): string {
    const tokens = tokenize(input);
    if (tokens.length === 0) return input;
    const first = tokens[0].toLowerCase();
    const rest = tokens.slice(1).map((t) => t.toLowerCase());
    const sentence = [first, ...rest].join(' ');
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

/**
 * Converts the given string to title case.
 *
 * @param input - The original text to be converted.
 * @returns A new string with each word's first letter capitalized and remaining letters lowercase.
 */
export function toTitleCase(input: string): string {
    const tokens = tokenize(input);
    if (tokens.length === 0) return input;
    return tokens.map((t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()).join(' ');
}

/**
 * Converts a string to camelCase format.
 * @param input The string to be converted.
 * @returns A new string in camelCase format.
 */
export function toCamelCase(input: string): string {
    const tokens = tokenize(input);
    if (tokens.length === 0) return input;
    const first = tokens[0].toLowerCase();
    const rest = tokens.slice(1).map((t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase());
    return [first, ...rest].join('');
}

/**
 * Converts a string to PascalCase format.
 *
 * @param input - The source string to be converted into PascalCase.
 * @returns A new string with each token capitalized and concatenated, resulting in PascalCase format.
 */
export function toPascalCase(input: string): string {
    const tokens = tokenize(input);
    if (tokens.length === 0) return input;
    return tokens.map((t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()).join('');
}

/**
 * Converts a given string into snake_case format by:
 * - Converting all tokens to lowercase.
 * - Joining them with underscores ('_').
 *
 * @param input The string to be converted. Empty strings return unchanged.
 * @returns A snake_cased version of the original string or the original empty string.
 */
export function toSnakeCase(input: string): string {
    const tokens = tokenize(input);
    if (tokens.length === 0) return input;
    return tokens.map((t) => t.toLowerCase()).join('_');
}

/**
 * Converts a string into the "SCREAMING_SNAKE_CASE" format.
 * Each token is converted to uppercase and joined with underscores.
 *
 * @param input - The source string to convert
 * @returns The string in SCREAMING_SNAKE_CASE format
 */
export function toScreamingSnakeCase(input: string): string {
    const tokens = tokenize(input);
    if (tokens.length === 0) return input;
    return tokens.map((t) => t.toUpperCase()).join('_');
}

/**
 * Converts a string into kebab-case format.
 *
 * @param input - The string to be converted to kebab case.
 * @returns A kebab-cased string where words are joined with hyphens and all characters are lowercase.
 */
export function toKebabCase(input: string): string {
    const tokens = tokenize(input);
    if (tokens.length === 0) return input;
    return tokens.map((t) => t.toLowerCase()).join('-');
}

/**
 * Converts the given string into COBOL case, which consists of uppercase letters and hyphens.
 * The input string is tokenized, each token is converted to uppercase, and then joined with a hyphen separator.
 *
 * @param input - The string to convert to COBOL case.
 * @returns A new string in COBOL case format where tokens are separated by hyphens and each token is uppercase.
 */
export function toCobolCase(input: string): string {
    const tokens = tokenize(input);
    if (tokens.length === 0) return input;
    return tokens.map((t) => t.toUpperCase()).join('-');
}

/**
 * Transforms a given string into train case format.
 *
 * @param input - The original string to be transformed.
 * @returns A new string with each word's first letter capitalized and words joined by hyphens.
 */
export function toTrainCase(input: string): string {
    const tokens = tokenize(input);
    if (tokens.length === 0) return input;
    return tokens.map((t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()).join('-');
}

/**
 * Converts a string into dot-case format by joining all non-empty tokenized parts with dots.
 *
 * @param input - The original string to be converted into dot-case.
 * @returns A new string in dot-case format, where tokens are joined by dots and each token is lowercase.
 */
export function toDotCase(input: string): string {
    const tokens = tokenize(input);
    if (tokens.length === 0) return input;
    return tokens.map((t) => t.toLowerCase()).join('.');
}

/**
 * Converts a string into slash-separated lowercase words.
 * Each word in the input is converted to lowercase and joined with slashes.
 *
 * @param input - The string to convert. If empty, returns the original input.
 * @returns A new string where words are separated by slashes and all characters
 *                   are in lowercase.
 */
export function toSlashCase(input: string): string {
    const tokens = tokenize(input);
    if (tokens.length === 0) return input;
    return tokens.map((t) => t.toLowerCase()).join('/');
}

/**
 * Converts each character in the input string to its opposite case.
 * Each lowercase letter becomes uppercase and vice versa.
 *
 * @param input - The source text whose characters will be swapped in case.
 * @returns A new string with all characters' cases inverted from the original.
 */
export function swapCase(input: string): string {
    return Array.from(input)
        .map((ch) => {
            if (ch.toLowerCase() === ch) return ch.toUpperCase();
            return ch.toLowerCase();
        })
        .join('');
}

/**
 * Capitalizes the first letter of a given string.
 * @param input - The input string to be capitalized.
 * @returns The original string with its first character converted to uppercase.
 */
export function capitalize(input: string): string {
    if (!input) return input;
    return input.charAt(0).toUpperCase() + input.slice(1);
}

/**
 * Converts the first character of a given string to lowercase while preserving the rest of the string.
 * If the input is an empty or falsy value, it returns the input as-is without any modifications.
 *
 * @param input The string whose first character will be converted to lowercase.
 * @returns A new string with the first character in lowercase and subsequent characters unchanged.
 */
export function uncapitalize(input: string): string {
    if (!input) return input;
    return input.charAt(0).toLowerCase() + input.slice(1);
}
