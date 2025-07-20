export default {
    address: {
        name: "Lars Bodewig",
        careOf: "c/o Block Services",
        street: "Stuttgarter Str. 106",
        city: "70736 Fellbach",
        email: "info@bodewig.dev",
    },
    defaultLanguage: "de-DE",
    eleventyConfig: {
        dir: {
            input: "pages",
            output: "build",
        },
        pathPrefix: "/"
    },
    favicon: "assets/favicon.svg",
    languages: {
        "de-DE": "Deutsch",
        "en-GB": "English"
    },
    liquid: {
        strictFilters: true,
        strictVariables: true,
        lenientIf: true
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
