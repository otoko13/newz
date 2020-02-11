module.exports = {
    "roots": [
        "<rootDir>/src",
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest",
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node",
    ],
    moduleDirectories: ['<rootDir>', '<rootDir>/node_modules'],
    moduleNameMapper: {
        'office-ui-fabric-react/lib/(.*)$': 'office-ui-fabric-react/lib-commonjs/$1',
        '\\.(css|scss)$': 'identity-obj-proxy',
        '\\.(png|jpg)$': 'identity-obj-proxy',
    },
    transformIgnorePatterns: [
        '^.+\\.module\\.{css,sass,scss}$',
        '\\.(png|jpg)$',
    ],
    setupFiles: ['./jest.setup.js'],
};