/* eslint-disable */
import copy from 'copy-to-clipboard';
import { copyToClipboard, pasteFromClipboard } from '../../src/clipboard/clipboard-utils';

// Mock for the default export.
jest.mock('copy-to-clipboard', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('copyToClipboard', () => {
    // Clear mocks before each test.
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call copy with the provided text and options', () => {
        // Arrange: simulate a successful copy operation.
        (copy as jest.Mock).mockReturnValue(true);
        const options = { debug: true, message: 'Copied!' };
        const text = 'Test string';

        // Act:
        const result = copyToClipboard(text, options);

        // Assert:
        expect(copy).toHaveBeenCalledWith(text, options);
        expect(result).toBe(true);
    });

    it('should handle null text by copying an empty string', () => {
        (copy as jest.Mock).mockReturnValue(true);

        const result = copyToClipboard(null);

        expect(copy).toHaveBeenCalledWith('', undefined);
        expect(result).toBe(true);
    });

    it('should handle undefined text by copying an empty string', () => {
        (copy as jest.Mock).mockReturnValue(true);

        const result = copyToClipboard(undefined);

        expect(copy).toHaveBeenCalledWith('', undefined);
        expect(result).toBe(true);
    });
});

describe('pasteFromClipboard', () => {
    // Save a snapshot of the original navigator.
    const originalNavigator = global.navigator;

    // After each test, restore the original navigator.
    afterEach(() => {
        global.navigator = originalNavigator;
        jest.resetAllMocks();
    });

    it('should return clipboard content when available and permission is granted', async () => {
        const sampleText = 'Clipboard text';

        // Create mocks for clipboard.readText and permissions.query.
        const readTextMock = jest.fn().mockResolvedValue(sampleText);
        const queryMock = jest.fn().mockResolvedValue({ state: 'granted' });

        // Setup navigator with clipboard and permissions APIs.
        global.navigator = {
            clipboard: { readText: readTextMock },
            permissions: { query: queryMock },
        } as any;

        // Act:
        const result = await pasteFromClipboard();

        // Assert:
        expect(queryMock).toHaveBeenCalledWith({ name: 'clipboard-read' });
        expect(readTextMock).toHaveBeenCalled();
        expect(result).toBe(sampleText);
    });

    it('should return an empty string when clipboard permission is denied', async () => {
        // Even if clipboard.readText is provided, permission is denied.
        const readTextMock = jest.fn().mockResolvedValue('Should not be read');
        const queryMock = jest.fn().mockResolvedValue({ state: 'denied' });

        global.navigator = {
            clipboard: { readText: readTextMock },
            permissions: { query: queryMock },
        } as any;

        // Act:
        const result = await pasteFromClipboard();

        // Assert:
        expect(queryMock).toHaveBeenCalledWith({ name: 'clipboard-read' });
        // Due to denial, pasteFromClipboard should catch the thrown error and return an empty string.
        expect(result).toBe('');
    });

    it('should proceed with reading the clipboard if the Permissions API is not available', async () => {
        const sampleText = 'Clipboard text without permissions API';

        const readTextMock = jest.fn().mockResolvedValue(sampleText);

        // Set navigator without a permissions API.
        global.navigator = {
            clipboard: { readText: readTextMock },
        } as any;

        const result = await pasteFromClipboard();

        expect(readTextMock).toHaveBeenCalled();
        expect(result).toBe(sampleText);
    });

    it('should return an empty string if the Clipboard API is not available', async () => {
        // Remove the clipboard API entirely.
        global.navigator = {} as any;

        const result = await pasteFromClipboard();
        expect(result).toBe('');
    });

    it('should return an empty string if clipboard.readText throws an error', async () => {
        const readTextMock = jest.fn().mockRejectedValue(new Error('Read error'));
        const queryMock = jest.fn().mockResolvedValue({ state: 'granted' });
        global.navigator = {
            clipboard: { readText: readTextMock },
            permissions: { query: queryMock },
        } as any;

        const result = await pasteFromClipboard();
        expect(result).toBe('');
    });
});
