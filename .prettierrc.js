module.exports = {
    printWidth: 80,
    tabWidth: 4,
    semi: true,
    singleQuote: false,
    trailingComma: "none",
    bracketSpacing: true,
    arrowParens: "always",
    useTabs: false,
    overrides: [
        {
            files: "package.json",
            options: {
                tabWidth: 2,
                printWidth: 250
            }
        },
        {
            files: "package-lock.json",
            options: {
                tabWidth: 2,
                printWidth: 250
            }
        }
    ]
};
