/* eslint-disable */
import { getMimeTypeForExtension, saveTextAsFile } from '../../src/file/file-utils';
import { getLogger } from '../../src/logging/logger-utils';
// @ts-ignore
import { saveAs } from 'file-saver';

// Mock logger to prevent logging during tests
jest.mock('../../src/logging/logger-utils', () => ({
    getLogger: () => ({
        debug: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        info: jest.fn(),
    }),
}));
// @ts-ignore
const logger = getLogger();

// Mock extractErrorDetails to return error message
jest.mock('../../src/error/error-utils', () => ({
    extractErrorDetails: (error: Error) => error.message,
}));

// Mock string utilities
jest.mock('../../src/string/string-utils', () => ({
    isNullOrBlankString: (value: any) =>
        value === null || value === undefined || (typeof value === 'string' && value.trim() === ''),
    safeExtractText: (value: any) => String(value),
}));

// Mock Blob for Node.js environment
// @ts-ignore
global.Blob = class MockBlob {
    content: any[];
    options: { type: string };

    constructor(content: any[], options: { type: string }) {
        this.content = content;
        this.options = options;
    }
};

// Mock file-saver's saveAs
jest.mock('file-saver', () => ({
    saveAs: jest.fn(),
}));

const mockSaveAs = saveAs as jest.MockedFunction<typeof saveAs>;

describe('saveTextAsFile', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockSaveAs.mockImplementation(() => {});
    });

    it('throws an error when content is null, undefined, or blank', () => {
        expect(() => saveTextAsFile({ content: '' })).toThrow('Nothing to save');
        expect(() => saveTextAsFile({ content: '   ' })).toThrow('Nothing to save');
    });

    it('constructs the correct filename with extension when needed', () => {
        saveTextAsFile({ content: 'test', fileName: 'file', extension: 'txt' });
        expect(mockSaveAs).toHaveBeenCalledWith(expect.any(Blob), 'file.txt');

        saveTextAsFile({ content: 'test', fileName: 'file.name', extension: 'txt' });
        expect(mockSaveAs).toHaveBeenCalledWith(expect.any(Blob), 'file.name');

        saveTextAsFile({ content: 'test', fileName: 'file.json', extension: 'txt' });
        expect(mockSaveAs).toHaveBeenCalledWith(expect.any(Blob), 'file.json');
    });

    it('uses the correct MIME type based on input or extension', () => {
        saveTextAsFile({ content: 'test', extension: 'json', mimeType: 'application/json' });
        const blobWithMime = mockSaveAs.mock.calls[0][0] as any;
        expect(blobWithMime.options.type).toBe('application/json');

        saveTextAsFile({ content: 'test', extension: 'csv' });
        const blobInferredMime = mockSaveAs.mock.calls[1][0] as any;
        expect(blobInferredMime.options.type).toBe('text/csv');
    });

    it('creates a Blob with the correct content and type', () => {
        const content = 'test content';
        saveTextAsFile({ content, extension: 'txt' });
        const blob = mockSaveAs.mock.calls[0][0] as any;
        expect(blob.content).toEqual([content]);
        expect(blob.options.type).toBe('text/plain');
    });

    it('rethrows errors encountered during file saving', () => {
        const error = new Error('saveAs error');
        mockSaveAs.mockImplementationOnce(() => {
            throw error;
        });
        expect(() => saveTextAsFile({ content: 'test' })).toThrow(error);
    });
});

// --- Tests ---
describe('getMimeTypeForExtension', () => {
    test('should return "application/json" for "json" extension', () => {
        expect(getMimeTypeForExtension('json')).toBe('application/json');
    });

    test('should be case-insensitive and return "application/json" for "JSON"', () => {
        expect(getMimeTypeForExtension('JSON')).toBe('application/json');
    });

    test('should return "text/yaml" for "yaml" and "yml" extensions', () => {
        expect(getMimeTypeForExtension('yaml')).toBe('text/yaml');
        expect(getMimeTypeForExtension('yml')).toBe('text/yaml');
    });

    test('should return "text/csv" for "csv" extension', () => {
        expect(getMimeTypeForExtension('csv')).toBe('text/csv');
    });

    test('should return "text/plain" for unknown or empty extensions', () => {
        expect(getMimeTypeForExtension('unknown')).toBe('text/plain');
        expect(getMimeTypeForExtension('')).toBe('text/plain');
    });
});
