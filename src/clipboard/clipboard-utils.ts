import copy from 'copy-to-clipboard';
import { getLogger } from '../logging/logger-utils';
import { safeExtractText } from '../string/string-utils';

const logger = getLogger();

export interface Options {
    debug?: boolean;
    message?: string;
    format?: string; // MIME type
    onCopy?: (clipboardData: object) => void;
}

/**
 * Copies text to the clipboard using a reliable cross-browser method.
 * Handles null/undefined input and provides type-safe options for clipboard operations.
 *
 * @param text - The text to copy to clipboard. Null/undefined values will be converted to an empty string.
 * @param options - Optional parameters for clipboard copy operation (debug mode, format, etc.)
 * @returns Boolean indicating if the copy operation was successful.
 *
 * @example
 * // Basic copy
 * copyToClipboard('Hello World');
 *
 * // Copy with debug options
 * copyToClipboard('Debug me', { debug: true, message: 'Copy occurred!' });
 */
export function copyToClipboard(text: string | null | undefined, options?: Options): boolean {
    logger.info(`Copy to clipboard: ${safeExtractText(text)}`);
    const textToCopy = text ?? '';
    return copy(textToCopy, options);
}

/**
 * Reads text from the clipboard using the modern Clipboard API.
 * Handles security exceptions and browser compatibility issues gracefully.
 *
 * @returns Promise resolving to the clipboard contents or an empty string if access fails.
 *
 * @example
 * // Basic paste
 * pasteFromClipboard().then(content => console.log(content));
 *
 * // Using async/await
 * const clipboardContent = await pasteFromClipboard();
 */
export async function pasteFromClipboard(): Promise<string> {
    logger.info(`pasteFromClipboard`);

    try {
        // Feature detection for Clipboard API.
        // eslint-disable-next-line
        if (!navigator.clipboard || typeof navigator.clipboard.readText !== 'function') {
            logger.warning('Clipboard API is not available in this browser environment.');
            return '';
        }

        // Optionally check for the Permissions API.
        // eslint-disable-next-line
        if (navigator.permissions && typeof navigator.permissions.query === 'function') {
            const permission = await navigator.permissions.query({
                name: 'clipboard-read' as PermissionName,
            });

            if (permission.state === 'denied') {
                logger.warning(`Clipboard access permission denied. State: ${permission.state}`);
                throw new Error('Clipboard access permission denied');
            }
        } else {
            logger.info('Permissions API not available; proceeding to read the clipboard directly.');
        }

        logger.info('Trying to read clipboard...');
        return await navigator.clipboard.readText();
    } catch (error: unknown) {
        logger.warning('Clipboard paste failed:', error);
        logger.info('Returning an empty string as a fallback.');
        return '';
    }
}
