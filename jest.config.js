module.exports = {
    testEnvironment: 'node',
    roots: ['<rootDir>/test'],
    testMatch: ['**/*.test.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    coveragePathIgnorePatterns: ['node_modules', 'types.ts', '\\.module\\.ts', '\\.mock\\.ts'],
};
