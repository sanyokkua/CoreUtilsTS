import { extractResourceName, isArn } from '../../src/aws/aws-utils';

describe('AWS ARN Utilities', () => {
    describe('isArn', () => {
        const testCases = [
            // Valid ARNs
            { input: 'arn:aws:s3:::my-bucket', expected: true },
            { input: 'arn:aws-cn:lambda:us-east-1:123456789012:function:my-function', expected: true },
            { input: 'arn:aws-us-gov:ec2:us-gov-west-1::instance/i-1234567890abcdef0', expected: true },
            { input: 'arn:aws:iam::123456789012:user/JohnDoe', expected: true },
            { input: 'arn:aws:sts::123456789012:federated-user/Alice', expected: true },
            { input: 'arn:aws:sns:us-east-1:123456789012:MyTopic', expected: true },
            { input: 'arn:aws:service-with-dash-123:::resource', expected: true },

            // Invalid ARNs
            { input: 'invalid-arn', expected: false },
            { input: 'arn:invalid-partition:s3:::bucket', expected: false },
            { input: 'arn:aws:InvalidService:::resource', expected: false }, // uppercase service
            { input: 'arn:aws:s3:::', expected: false }, // empty resource
            { input: 'arn:aws:s3::: ', expected: false }, // whitespace resource
            { input: 'arn:aws:service:invalid_region::resource', expected: false }, // invalid region
            { input: 'arn:aws:service::invalid-account:resource', expected: false }, // non-numeric account
            { input: 'arn:aws:service::1234567890123:resource', expected: false }, // 13-digit account
        ];

        // Parameterized tests for standard cases
        test.each(testCases)('returns $expected for "$input"', ({ input, expected }) => {
            expect(isArn(input)).toBe(expected);
        });

        // Edge cases
        describe('edge cases', () => {
            const edgeCases = [
                { input: null, expected: false },
                { input: undefined, expected: false },
                { input: '', expected: false },
                { input: '   ', expected: false },
            ];

            test.each(edgeCases)('returns $expected for $input', ({ input, expected }) => {
                expect(isArn(input)).toBe(expected);
            });
        });
    });

    describe('extractResourceName', () => {
        describe('Success Cases validation', () => {
            const validCases = [
                {
                    input: 'arn:aws:s3:::my-bucket',
                    expected: 'my-bucket',
                },
                {
                    input: 'arn:aws:lambda:us-east-1:123456789012:function:my-function:prod',
                    expected: 'function:my-function:prod',
                },
                {
                    input: 'arn:aws:iam::123456789012:user/path/JohnDoe',
                    expected: 'user/path/JohnDoe',
                },
                {
                    input: 'arn:aws:sns:us-east-1:123456789012:MyTopic:With:Colons',
                    expected: 'MyTopic:With:Colons',
                },
            ];

            test.each(validCases)('extracts "$expected" from "$input"', ({ input, expected }) => {
                expect(extractResourceName(input)).toBe(expected);
            });
        });

        describe('Invalid Cases validation', () => {
            const invalidCases = [{ input: 'invalid-arn' }, { input: null }, { input: undefined }, { input: '' }];

            test.each(invalidCases)('returns null for $input', ({ input }) => {
                expect(extractResourceName(input)).toBeNull();
            });
        });

        describe('resource validation', () => {
            it('returns null for empty resource section', () => {
                const arn = 'arn:aws:s3::::';
                expect(extractResourceName(arn)).toBeNull();
            });

            it('returns null for whitespace-only resource', () => {
                const arn = 'arn:aws:s3:::   ';
                expect(extractResourceName(arn)).toBeNull();
            });

            it('handles resource with mixed characters', () => {
                const arn = 'arn:aws:s3:::bucket/key/version=123?param=true';
                expect(extractResourceName(arn)).toBe('bucket/key/version=123?param=true');
            });
        });
    });
});
