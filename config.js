module.exports = {
    contact: `
        <p>
            Lars Bodewig<br>
            TODO<br>
            TODO<br>
            E-Mail:
            <a href="mailto:info@bodewig.dev">info@bodewig.dev</a>
        </p>`,
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
