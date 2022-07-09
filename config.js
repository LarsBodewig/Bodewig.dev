module.exports = {
    eleventy: {
        dir: {
            input: "pages",
            output: "build",
        },
        pathPrefix: "/"
    },
    favicon: "assets/icon.svg",
    liquid: {
        strictFilters: true,
        strictVariables: true
    },
    passthrough: [
        "assets"
    ],
    prettier: {
        tabWidth: 4,
        xmlWhitespaceSensitivity: "ignore"
    },
    prettierExclude: [
        "**/*.txt"
    ],
    server: {
        domain: "Bodewig.dev",
        protocol: "https",
        suffixPaths: true
    }
};
