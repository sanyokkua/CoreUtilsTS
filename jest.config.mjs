export default {
    transformIgnorePatterns: ['/node_modules/(?!crypto-hash)'],
    testEnvironment: 'node',
    roots: ['<rootDir>/test'],
    testMatch: ['**/*.test.ts'],
    transform: {
        '^.+\\.tsx?$': ['ts-jest', { useESM: true }],
    },
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    globals: {
        'ts-jest': {
            useESM: true,
        },
    },

    coveragePathIgnorePatterns: ['node_modules', 'types.ts', '\\.module\\.ts', '\\.mock\\.ts', 'src/public'],
};
