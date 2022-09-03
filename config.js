module.exports = {
    address: {
        name: "Lars Bodewig",
        street: "TODO",
        city: "TODO",
        mail: "info@bodewig.dev"
    },
    defaultLanguage: "Deutsch",
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
        domain: "bodewig.dev",
        protocol: "https",
        suffixPaths: true
    },
    site: {
        title: "Bodewig.dev"
    }
};
