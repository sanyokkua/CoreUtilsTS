export * from './aws/aws-utils';
export * as AWS from './aws/aws-utils';

export * from './clipboard/clipboard-utils';
export * as Clipboard from './clipboard/clipboard-utils';

export * from './error/error-utils';
export * as ErrorUtils from './error/error-utils';

export * from './file/file-utils';
export * as FileUtils from './file/file-utils';
export * from './file/types';

export * from './object/object-utils';
export * as ObjectUtils from './object/object-utils';

export * from './string/encoding-utils';
export * as EncodingUtils from './string/encoding-utils';

export * from './string/line-utils';
export * as LineUtils from './string/line-utils';

export * from './string/string-utils';
export * as StringUtils from './string/string-utils';
export * from './string/types';

export { setLogger } from './logging/logger-utils';
export { ConsoleLogger, LibLogger, SilentLogger } from './logging/types';
