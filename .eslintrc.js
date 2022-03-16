module.exports = {
    root: true,
    extends: '@react-native-community',
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', "typescript-sort-keys"],
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'error',
        "react/jsx-filename-extension":
            [
                1, { "extensions": [".js", ".jsx", ".tsx"] }
            ],
        "no-undef": "off",
        "semi": ["error", "never"],
        "max-len": ["warn", { code: 100, ignoreComments: true }],
        "object-curly-spacing": ["error", "always"],
        "sort-keys": ["error", "asc", {"caseSensitive": true, "natural": false, "minKeys": 2}],
        "typescript-sort-keys/interface": 2,
        "typescript-sort-keys/string-enum": 2
    }
};
