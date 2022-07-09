module.exports = {
    eleventy: {
        dir: {
            input: "pages",
            output: "build",
        },
        pathPrefix: "/"
    },
    passthrough: [
        "assets"
    ],
    prettier: {
        tabWidth: 4,
        xmlWhitespaceSensitivity: "ignore"
    },
    server: {
        domain: "Bodewig.dev",
        protocol: "https",
        suffixPaths: false
    }
};
