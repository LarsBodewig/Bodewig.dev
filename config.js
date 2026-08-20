export default {
    address: {
        name: "Lars Bodewig",
        careOf: "c/o Online-Impressum #9967",
        street: "Europaring 90",
        city: "53757 Sankt Augustin",
        email: "info@bodewig.dev",
        contactForm: "https://mein.online-impressum.de/bodewig-dev/#zweiterkontaktweg",
    },
    defaultLanguage: "de-DE",
    eleventyConfig: {
        dir: {
            input: "pages",
            output: "build",
        },
        pathPrefix: "/",
    },
    favicon: "assets/favicon.svg",
    languages: {
        "de-DE": "Deutsch",
        "en-GB": "English",
    },
    liquid: {
        strictFilters: true,
        strictVariables: true,
        lenientIf: true,
    },
    passthrough: ["assets"],
    prettier: {
        tabWidth: 4,
        xmlWhitespaceSensitivity: "ignore",
    },
    prettierExclude: ["**/*.txt"],
    server: {
        domain: "bodewig.dev",
        protocol: "https",
        suffixPaths: true,
    },
    site: {
        title: "Bodewig.dev",
    },
};
