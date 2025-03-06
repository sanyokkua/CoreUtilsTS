import { getLogger } from '../logging/logger-utils';
import { isNullOrBlankString, joinStrings } from '../string/string-utils';

const logger = getLogger();

/**
 * Validates if a string is a properly formatted AWS ARN
 * @param input - The string to validate
 * @returns True if the input matches AWS ARN format specifications
 *
 * @example
 * isArn('arn:aws:s3:::my-bucket'); // true
 * isArn('invalid-arn'); // false
 *
 * @remarks
 * Follows AWS ARN format specification:
 * arn:partition:service:region:account-id:resource
 * - Partition: aws, aws-cn, or aws-us-gov
 * - Service: lowercase alphanumeric with hyphens
 * - Region: lowercase alphanumeric with hyphens (optional)
 * - Account ID: 12-digit number (optional for some services)
 * - Resource: non-empty value with service-specific formatting
 */
export function isArn(input: string | null | undefined): input is string {
    if (isNullOrBlankString(input) || typeof input !== 'string') {
        logger.info('Passed ARN is a blank string');
        return false;
    }

    if (input.trim().length !== input.length) {
        logger.warning('Passed ARN contains blank characters on the start or end of line');
        return false;
    }

    const arnRegex = /^arn:(aws|aws-cn|aws-us-gov):([a-z0-9-]+):([a-z]{2}-[a-z0-9-]+-\d+|\*|):(\d{12}|):(.+)$/;
    return arnRegex.test(input);
}

/**
 * Extracts the resource portion from a valid AWS ARN
 * @param input - The ARN string to process
 * @returns The resource portion or null for invalid/malformed ARNs
 *
 * @example
 * extractResourceName('arn:aws:s3:::my-bucket'); // 'my-bucket'
 * extractResourceName('arn:aws:lambda:us-east-1:123456789012:function:my-function'); // 'function:my-function'
 *
 * @remarks
 * Returns the full resource path including any colons or slashes.
 * Always returns null for invalid ARNs to ensure data integrity.
 */
export function extractResourceName(input: string | null | undefined): string | null {
    if (!isArn(input)) {
        logger.info('Passed string is not an ARN');
        return null;
    }

    const parts = input.split(':');

    // ARN format: arn:partition:service:region:account-id:resource
    // Join all components after the 5th index (resource section)
    const partsOfArn = parts.slice(5);
    const resource = joinStrings(partsOfArn, ':');

    logger.debug(`Joined strings Resource: ${resource}`);

    // Ensure non-empty resource as per ARN specification
    return resource.length > 0 ? resource : null;
}
