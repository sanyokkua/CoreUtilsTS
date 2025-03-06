import { saveAs } from 'file-saver';
import { extractErrorDetails } from '../error/error-utils';
import { getLogger } from '../logging/logger-utils';
import { isNullOrBlankString, safeExtractText } from '../string/string-utils';
import { SaveTextOptions } from './types';

const logger = getLogger();

/**
 * Saves text content as a file.
 *
 * This generic function uses an options object to allow the saving of various text formats.
 * It validates that the content is not empty, infers the MIME type based on the extension (if not provided),
 * and uses the file-saver library to prompt the user to download the file. Errors are caught, logged, and rethrown.
 *
 * @param options - SaveTextOptions to control file saving.
 *
 * @throws Error if there is no content or if some unexpected error occurs during saving.
 */
export function saveTextAsFile(options: SaveTextOptions): void {
    try {
        const {
            content,
            fileName = 'new_file',
            extension = 'txt',
            mimeType, // optional: if provided, this will override the inferred MIME type
        } = options;

        logger.debug('saveTextAsFile. Received options');
        logger.debug(`content: ${safeExtractText(content)}`);
        logger.debug(`fileName: ${safeExtractText(fileName)}`);
        logger.debug(`extension: ${safeExtractText(extension)}`);
        logger.debug(`mimeType: ${safeExtractText(mimeType)}`);

        if (isNullOrBlankString(content)) {
            logger.error('saveTextAsFile. No content to save');
            // noinspection ExceptionCaughtLocallyJS
            throw new Error('Nothing to save, check console for details');
        }

        // If fileName does not already contain a dot, append the extension.
        const effectiveFileName = fileName.includes('.') ? fileName : `${fileName}.${extension}`;
        // Determine the MIME type: use provided value or infer from the extension.
        const effectiveMimeType = mimeType ?? getMimeTypeForExtension(extension);

        const blob = new Blob([content], { type: effectiveMimeType });
        saveAs(blob, effectiveFileName);

        logger.debug('saveTextAsFile. File saved successfully');
        logger.debug(`blob: ${safeExtractText(blob)}`);
        logger.debug(`effectiveFileName: ${safeExtractText(effectiveFileName)}`);
        logger.debug(`effectiveMimeType: ${safeExtractText(effectiveMimeType)}`);
    } catch (error) {
        const errMsg = extractErrorDetails(error);
        logger.error(`saveTextAsFile. Error occurred while saving file. Root error: ${errMsg}`);
        throw error;
    }
}

/**
 * Infers a MIME type from a file extension.
 *
 * @param extension - The file extension (e.g. "json", "csv", "txt", "yaml").
 * @returns A string representing the MIME type.
 */
export function getMimeTypeForExtension(extension: string): string {
    switch (extension.toLowerCase()) {
        case 'json':
            return 'application/json';
        case 'yaml':
        case 'yml':
            return 'text/yaml';
        case 'csv':
            return 'text/csv';
        case 'txt':
        default:
            return 'text/plain';
    }
}
