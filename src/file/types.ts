/**
 * Options for saving a text file.
 */
export interface SaveTextOptions {
    /** The text content to save. */
    content: string;
    /**
     * The base file name.
     * If the name does not include an extension (i.e. no period), then the given `extension` will be appended.
     * Default is "new_file".
     */
    fileName?: string;
    /**
     * The file extension (without the dot).
     * Default is "txt".
     */
    extension?: string;
    /**
     * The MIME type for the file.
     * If not provided then the MIME type is inferred from the extension.
     */
    mimeType?: string;
}
