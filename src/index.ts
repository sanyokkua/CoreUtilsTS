/**
 * Collection of utility modules for object and string manipulations, encoding/decoding operations,
 * and hashing functions. Each module provides specific functionality such as case conversions,
 * base64 encoding/decoding, and SHA-1 hashing.
 */
import { ObjectUtilsImpl } from './public/object-utils/object-utils';
import { IObjectUtils } from './public/object-utils/types';
import { CaseUtilsImpl } from './public/string-utils/case-utils';
import { EncodingUtilsImpl } from './public/string-utils/encoding-utils';
import { HashingUtilsImpl } from './public/string-utils/hashing-utils';
import { LineUtilsImpl } from './public/string-utils/line-utils';
import { StringUtilsImpl } from './public/string-utils/string-utils';
import { ICaseUtils, IEncodingUtils, IHashingUtils, ILineUtils, IStringUtils } from './public/string-utils/types';

/**
 * Implementation of object utility functions providing null checks and value validations.
 */
export const ObjectUtils: IObjectUtils = new ObjectUtilsImpl();

/**
 * Provides various string case manipulation methods such as capitalization and formatting.
 */
export const CaseUtils: ICaseUtils = new CaseUtilsImpl();

/**
 * Implements base64 encoding/decoding functionality for data transformation tasks.
 */
export const EncodingUtils: IEncodingUtils = new EncodingUtilsImpl();

/**
 * Handles SHA-1 hashing operations, converting input strings to secure hash values.
 */
export const HashingUtils: IHashingUtils = new HashingUtilsImpl();

// Additional utility modules
export const LineUtils: ILineUtils = new LineUtilsImpl();
export const StringUtils: IStringUtils = new StringUtilsImpl();

/**
 * Error handling utilities for logging and error management across the application.
 */
export * as ErrorUtils from './error/error-utils';

/**
 * Logging configuration functions to set up or modify the global logger instance.
 */
export { setLogger } from './logging/logger-utils';

/**
 * Logger implementations for different output channels (console, library-specific, silent).
 */
export { ConsoleLogger, LibLogger, SilentLogger } from './logging/types';

export * from './public/object-utils/types';
export * from './public/string-utils/types';
