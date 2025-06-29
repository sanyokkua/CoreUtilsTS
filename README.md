# CoreUtilsTS

CoreUtilsTS is a TypeScript utility library offering a comprehensive suite of helper functions to simplify common development tasks. Built with clarity and reusability in mind, it works seamlessly in both browser and non-browser environments.

**Note:** Verify functionality for your specific use case before deploying in production.

Some functions act as wrappers around standard TypeScript operations to improve code readability and consistency.

Whether you need to perform object validations, string case transformations, encoding/decoding, hashing, or line-based manipulations, **CoreUtilsTS** is designed to streamline your workflow.

---

## Table of Contents

- [Key Features](#key-features)
- [Installation](#installation)
- [Usage](#usage)

    - [Object Utilities](#object-utilities)
    - [Case Utilities](#case-utilities)
    - [Encoding & Cryptography](#encoding--cryptography)
    - [Line Utilities](#line-utilities)
    - [String Utilities](#string-utilities)

- [API Reference](#api-reference)

    - [Object & Type Guards](#object--type-guards)
    - [Case Utilities API](#case-utilities-api)
    - [Encoding & Cryptography API](#encoding--cryptography-api)
    - [Line Utilities API](#line-utilities-api)
    - [String Utilities API](#string-utilities-api)
    - [Enumerations & Constants](#enumerations--constants)
    - [Logging](#logging)

- [Testing](#testing)
- [Local Build](#local-build)
- [Dependencies](#dependencies)
- [License](#license)

---

## Key Features

- **Object Utilities**

    - `isNull()`, `isUndefined()`, `isNullOrUndefined()`
    - `getDefaultOnNull()` for fallback values
    - `isEmptyArray()` checks for empty or missing arrays

- **Case Utilities**

    - Determine string case: `determineCase()`
    - Transform between cases: `toLowerCase()`, `toUpperCase()`, `toSentenceCase()`, `toTitleCase()`, `toCamelCase()`, `toPascalCase()`, `toSnakeCase()`, `toKebabCase()`, and more
    - Swap, capitalize, and uncapitalize functions

- **Encoding & Cryptography**

    - Base64 encoding/decoding: `encodeBase64()`, `decodeBase64()`
    - URL-safe Base64: `encodeBase64Url()`
    - Hashing algorithms: `encodeSHA1()`, `encodeSHA256()`, `encodeSHA384()`, `encodeSHA512()`, `encodeMD5()`

- **Line Utilities**

    - Split strings into lines and remove empty entries: `splitLines()`, `splitStringIntoLines()`
    - Sort (`sortLines()`), shuffle (`shuffleLines()`), and deduplicate (`removeDuplicates()`) arrays of lines

- **String Utilities**

    - Type and content checks: `isString()`, `isEmptyString()`, `isBlankString()`, `isNullOrBlankString()`, `isAlphanumeric()`, `isNotAlphanumeric()`
    - Search: `startsWith()`, `endsWith()`, `contains()`
    - Join and split: `joinStrings()`, `splitString()`
    - Conditional modifications: `addSuffixIfMissing()`, `addPrefixIfMissing()`, `removePrefixIfPresent()`, `removeSuffixIfPresent()`
    - Replacements and safe extraction: `replaceSubstring()`, `safeExtractText()`
    - URL utilities: `slugifyString()`, `encodeUrl()`, `decodeUrl()`

- **Logging**

    - Configurable logger via `setLogger()`
    - Built-in `ConsoleLogger` and `SilentLogger`

---

## Installation

Install **CoreUtilsTS** via npm or yarn:

```bash
npm install coreutilsts
```

or

```bash
yarn add coreutilsts
```

---

## Usage

Import only the modules you need to keep your bundle lean.

### Object Utilities

```typescript
import { ObjectUtils } from 'coreutilsts';

const value = null;
const safe = ObjectUtils.getDefaultOnNull(value, 'fallback');
```

### Case Utilities

```typescript
import { CaseUtils } from 'coreutilsts';

const text = 'example_string';
const title = CaseUtils.toTitleCase(text);
```

### Encoding & Cryptography

```typescript
import { EncodingUtils, HashingUtils } from 'coreutilsts';

const b64 = EncodingUtils.encodeBase64('hello');
HashingUtils.encodeSHA256('password').then((hash) => console.log(hash));
```

### Line Utilities

```typescript
import { LineUtils } from 'coreutilsts';

const lines = LineUtils.splitLines('first\n\nsecond');
const unique = LineUtils.removeDuplicates(lines);
```

### String Utilities

```typescript
import { StringUtils } from 'coreutilsts';

const slug = StringUtils.slugifyString('My Blog Post Title');
const url = StringUtils.encodeUrl('https://example.com/?q=a b');
```

---

## API Reference

### Object & Type Guards

- **`isNull(value: unknown): value is null`**
- **`isUndefined(value: unknown): value is undefined`**
- **`isNullOrUndefined(value: unknown): value is null | undefined`**
- **`getDefaultOnNull(value: unknown, defaultValue: unknown): unknown`**
- **`isEmptyArray(value: undefined | null | unknown[]): boolean`**

### Case Utilities API

- **`determineCase(input: string, props?: DetermineStringCaseProps): StringCaseTypes`**
- **`toLowerCase(input: string): string`**, **`toUpperCase(input: string): string`**
- **`toLowerCaseStrict(input: string): string`**, **`toUpperCaseStrict(input: string): string`**
- **`toSentenceCase(input: string): string`**, **`toTitleCase(input: string): string`**
- **`toCamelCase(input: string): string`**, **`toPascalCase(input: string): string`**
- **`toSnakeCase(input: string): string`**, **`toKebabCase(input: string): string`**
- **Other cases: `toScreamingSnakeCase()`, `toCobolCase()`, `toTrainCase()`, `toDotCase()`, `toSlashCase()`**
- **`swapCase(input: string): string`**, **`capitalize(input: string): string`**, **`uncapitalize(input: string): string`**

### Encoding & Cryptography API

- **`encodeBase64(input: string): string`**
- **`encodeBase64Url(input: string): string`**
- **`decodeBase64(input: string): string`**
- **`encodeSHA1(input: string): Promise<string>`**
- **`encodeSHA256(input: string): Promise<string>`**
- **`encodeSHA384(input: string): Promise<string>`**
- **`encodeSHA512(input: string): Promise<string>`**
- **`encodeMD5(input: string): Promise<string>`**

### Line Utilities API

- **`splitStringIntoLines(data: string, splitter: string | RegExp): string[]`**
- **`splitLines(data: string | null | undefined): string[]`**
- **`sortLines(arr: string[], sortType?: SortingTypes): string[]`**
- **`shuffleLines(arr: string[]): string[]`**
- **`removeDuplicates(strings: string[], ignoreCase?: boolean): string[]`**

### String Utilities API

- **Type Checks:** `isString()`, `isEmptyString()`, `isBlankString()`, `isNullOrBlankString()`, `isAlphanumeric()`, `isNotAlphanumeric()`
- **Search:** `startsWith(inputString: string, value: string)`, `endsWith()`, `contains()`
- **Split & Join:** `splitString(value: string, separator?: LineSeparator)`, `joinStrings(strings: string[], joinSymbol?: LineSeparator)`
- **Conditional Mods:** `addSuffixIfMissing()`, `addPrefixIfMissing()`, `removePrefixIfPresent()`, `removeSuffixIfPresent()`
- **Transform & Replace:** `replaceSubstring()`, `safeExtractText()`
- **URL Utilities:** `slugifyString(value: string, separator?: string, lower?: boolean, locale?: string)`, `encodeUrl(value: string)`, `decodeUrl(value: string)`

### Enumerations & Constants

- **Enums:** `EncoderAlg`, `Encodings`, `LineSeparators`, `SortingTypes`
- **Constants:** `EMPTY`, `SPACE`

### Logging

- **`setLogger(logger: LibLogger): void`**
- **Built-in:** `ConsoleLogger`, `SilentLogger`

---

## Testing

Run the comprehensive test suite:

```bash
npm run test
```

---

## Local Build

Build and verify locally:

```bash
npm install
```

```bash
npm run verify
```

---

## Dependencies

This library depends on:

- `crc`
- `js-base64`
- `js-md5`
- `slugify`

---

## License

This project is licensed under the [MIT License](LICENSE).

---

Enjoy using **CoreUtilsTS** to streamline your development process with powerful, focused utilities!
