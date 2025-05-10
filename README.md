# CoreUtilsTS

CoreUtilsTS is a TypeScript utility library offering a comprehensive suite of helper functions to simplify common development tasks. Built with clarity and reusability in mind, it works seamlessly in both browser and non-browser environments.

**Note:** Verify functionality for your specific use case before deploying in production.

Some functions act as wrappers around standard TypeScript operations to improve code readability—especially in conditional statements.

Whether you need to validate AWS ARNs, manipulate the clipboard, handle errors, perform file operations, or process strings and arrays, **CoreUtilsTS** is designed to streamline your workflow.

---

## Table of Contents

- [Key Features](#key-features)
- [Installation](#installation)
- [Usage](#usage)
    - [AWS Utilities](#aws-utilities)
    - [Clipboard Operations](#clipboard-operations)
    - [String Manipulation](#string-manipulation)
- [API Reference](#api-reference)
    - [AWS Utilities](#aws-utilities-api)
    - [Clipboard Utilities](#clipboard-utilities-api)
    - [Error Utilities](#error-utilities-api)
    - [File Utilities](#file-utilities-api)
    - [Object & Type Guards](#object--type-guards)
    - [Encoding and Cryptography](#encoding-and-cryptography)
    - [Array & String Manipulation](#array--string-manipulation)
    - [Enumerations & Constants](#enumerations--constants)
    - [Logging](#logging)
- [Testing](#testing)
- [Local Build](#local-build)
- [License](#license)

---

## Key Features

- **AWS Utilities**

    - Validate AWS ARNs using `isArn()`.
    - Extract resource information from ARNs with `extractResourceName()`.

- **Clipboard Helpers**

    - Copy text with `copyToClipboard()`.
    - Retrieve clipboard content via `pasteFromClipboard()`.

- **Error Utilities**

    - Extract and format detailed error information using `extractErrorDetails()`.

- **File Operations**

    - Infer MIME types from file extensions using `getMimeTypeForExtension()`.
    - Save text content as a file with `saveTextAsFile()`.

- **Object & Type Guards**

    - Check for `null`, `undefined`, or empty arrays with functions like:
        - `isNull()`
        - `isUndefined()`
        - `isNullOrUndefined()`
        - `getDefaultOnNull()`
        - `isEmptyArray()`

- **Encoding and Cryptography**

    - Compute SHA hashes (SHA-1, SHA-256, SHA-384, SHA-512) via functions such as `encodeStringSha1()`, `encodeStringSha256()`, etc.
    - Encode and decode strings with `encodeString()` and `decodeString()` (for example, Base64 encoding/decoding).

- **Array & String Manipulation**

    - Remove duplicate entries with `removeDuplicates()`.
    - Comprehensive string checks and modifications, including:
        - **Type Checks:** `isString()`, `isEmptyString()`, `isBlankString()`, `isNullOrBlankString()`
        - **Search Functions:** `startsWith()`, `endsWith()`, `contains()`
        - **Splitting & Joining:** `splitString()`, `splitLines()` _additionally removes empty lines_, `joinStrings()`
        - **Conditional Modifications:** `addSuffixIfMissing()`, `addPrefixIfMissing()`, `removePrefixIfPresent()`, `removeSuffixIfPresent()`
        - **Transformations:** `upperCase()`, `lowerCase()`, `swapCase()`, `capitalize()`, `uncapitalize()`
        - **Replacements & Safe Extraction:** `replaceSubstring()` and `safeExtractText()`

- **Enumerations & Constants**

    - Predefined enums such as `EncoderAlg`, `Encodings`, `LineSeparators`, and `SortingTypes`.
    - Constants like `EMPTY` and `SPACE`.

- **Logging**
    - Enable logging via `setLogger()` by providing an implementation of the `LibLogger` interface or using the predefined loggers (`ConsoleLogger` and `SilentLogger`).

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

Import only the functions you need to keep your bundle lean. Below are some examples:

### AWS Utilities

```typescript
import { isArn, extractResourceName } from 'coreutilsts';

const arn = 'arn:aws:s3:::my-bucket';
if (isArn(arn)) {
    const resource = extractResourceName(arn);
    console.log('Resource name:', resource);
}
```

### Clipboard Operations

```typescript
import { Clipboard } from 'coreutilsts';

if (Clipboard.copyToClipboard('Hello, CoreUtilsTS!')) {
    console.log('Text copied successfully.');
}

Clipboard.pasteFromClipboard()
    .then((content) => console.log('Clipboard content:', content))
    .catch((err) => console.error('Failed to paste from clipboard:', err));
```

### String Manipulation

```typescript
import { StringUtils } from 'coreutilsts';

const sample = '   example string   ';
if (StringUtils.isBlankString(sample)) {
    console.log('The string is blank!');
}
const words = StringUtils.splitString(sample, /\s+/);
console.log('Words:', words);
```

Alternatively, you can import entire namespaces to access a broader set of functionalities:

```typescript
import { AWS, ErrorUtils, FileUtils, ObjectUtils, EncodingUtils, LineUtils, StringUtils } from 'coreutilsts';

try {
    // Some error-prone operation
} catch (error) {
    console.error(ErrorUtils.extractErrorDetails(error));
}
```

---

## API Reference

### AWS Utilities API

- **`isArn(input: string | null | undefined): input is string`**  
  Validates whether a string is a properly formatted AWS ARN.

- **`extractResourceName(input: string | null | undefined): string | null`**  
  Extracts the resource portion from a valid AWS ARN.

### Clipboard Utilities API

- **`copyToClipboard(text: string | null | undefined, options?: Options): boolean`**  
  Copies text to the clipboard in a cross-browser compatible manner.

- **`pasteFromClipboard(): Promise<string>`**  
  Retrieves text from the clipboard while handling browser security exceptions.

### Error Utilities API

- **`extractErrorDetails(error: unknown): string`**  
  Returns detailed error information in a standardized format.

### File Utilities API

- **`getMimeTypeForExtension(extension: string): string`**  
  Infers the MIME type based on a given file extension.

- **`saveTextAsFile(options: SaveTextOptions): void`**  
  Saves text content as a file, inferring the MIME type if needed.

### Object & Type Guards

- **`isNull(value: unknown): value is null`**
- **`isUndefined(value: unknown): value is undefined`**
- **`isNullOrUndefined(value: unknown): value is null | undefined`**
- **`getDefaultOnNull(value: unknown, defaultValue: unknown): unknown`**
- **`isEmptyArray(value: undefined | null | unknown[]): boolean`**

### Encoding and Cryptography

- **SHA Hash Functions:**

    - `encodeStringSha1`
    - `encodeStringSha256`
    - `encodeStringSha384`
    - `encodeStringSha512`

- **General Encoding:**
    - **`encodeString(text: string, encoding?: Encodings): Promise<string>`**
    - **`decodeString(text: string, encoding?: Encodings): Promise<string>`**

### Array & String Manipulation

- **Duplicate Removal:**

    - **`removeDuplicates(strings: string[] | null | undefined, ignoreCase?: boolean): string[]`**

- **String Checks:**

    - **`isString(value: unknown): value is string`**
    - **`isEmptyString(str: undefined | null | string): boolean`**
    - **`isBlankString(str: string): boolean`**
    - **`isNullOrBlankString(value: undefined | null | string): boolean`**

- **Search Functions:**

    - **`startsWith(inputString: string, value: string): boolean`**
    - **`endsWith(inputString: string, value: string): boolean`**
    - **`contains(inputString: string, value: string): boolean`**

- **Splitting & Joining:**

    - **`splitString(value: string, separator?: LineSeparator): string[]`**
    - **`splitLines(data: string | null | undefined): string[]`**
    - **`joinStrings(strings: string[], joinSymbol?: LineSeparator): string`**

- **Conditional Modifications:**

    - **`addSuffixIfMissing(value: string, suffix: string): string`**
    - **`addPrefixIfMissing(value: string, prefix: string): string`**
    - **`removePrefixIfPresent(originalValue: string, prefix: string): string`**
    - **`removeSuffixIfPresent(originalValue: string, suffix: string): string`**

- **Transformations & Replacements:**
    - **`upperCase(input: string): string`**
    - **`lowerCase(input: string): string`**
    - **`swapCase(input: string): string`**
    - **`capitalize(input: string): string`**
    - **`uncapitalize(input: string): string`**
    - **`replaceSubstring(originalString: string, substringToReplace: string, replacementValue: string): string`**
    - **`safeExtractText(value: unknown): string`**

### Enumerations & Constants

- **Line Separators:**

    - **`LineSeparators`**: Enum values include `WINDOWS`, `MACOS`, and `LINUX`.
    - **`LineSeparator`**: Type defining acceptable separator values.

- **Sorting Modes:**

    - **`SortingTypes`**: Enum (e.g., `ASC`, `DSC`, `ASC_IGN_CASE`, `DSC_IGN_CASE`).

- **Constants:**
    - **`EMPTY`**: An empty string.
    - **`SPACE`**: A single space character.

### Logging

- **`setLogger(logger: LibLogger): void`**  
  Configures the logging mechanism.

- **Predefined Logger Types:**
    - `ConsoleLogger`
    - `LibLogger`
    - `SilentLogger`

---

## Testing

CoreUtilsTS comes with comprehensive tests to ensure reliability and stability. Run the tests using:

```bash
npm run test
```

> **Tip:** Ensure that all dependencies are installed before running the tests.

---

## Local Build

To build the library locally, clone the repository and run the following commands:

```bash
npm install   # Install all dependencies
```

```bash
npm run verify   # Build, test, and clean up the project directory
```

---

## Dependencies

This library uses following libraries

- [copy-to-clipboard](https://www.npmjs.com/package/copy-to-clipboard)
- [file-saver](https://www.npmjs.com/package/file-saver)

## License

This project is licensed under the [MIT License](LICENSE).

---

Enjoy using **CoreUtilsTS** to streamline your development process with these powerful utility functions!
