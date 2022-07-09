const config = require("./config");
const prettier = require("prettier");
const liquidjs = require('liquidjs');

function collectionSortTitle(collectionApi) {
    const collection = collectionApi.getAll();
    const colCopy = [...collection]; // prevent sorting inplace
    const ordered = colCopy.sort((a, b) => a.data.title - b.data.title);
    return ordered;
}

module.exports = function (eleventyConfig) {
    Object.entries(config).forEach(([key, value]) =>
        eleventyConfig.addGlobalData(key, value));

    if (!config.server.suffixPaths) {
        const oldUrlFilter = eleventyConfig.getFilter("url");
        eleventyConfig.addFilter("url", (url) => {
            const path = oldUrlFilter(url);
            if (path.endsWith("/")) {
                if (path.length > 1) {
                    return path.substring(0, path.length - 1);
                }
            }
            return path;
        });
    }
    eleventyConfig.setLiquidOptions({
        ...config.liquid,
        operators: {
            ...liquidjs.defaultOperators,
            'in': (a, b) => b.includes(a)
        }
    });
    config.passthrough.forEach(rule => eleventyConfig.addPassthroughCopy(rule));
    eleventyConfig.addCollection("nav", collectionSortTitle);
    eleventyConfig.addCollection("footer", collectionSortTitle);
    eleventyConfig.addShortcode("titleOf", (page, collection) => {
        const colPage = collection.find((elem) => elem.url === page.url);
        return colPage.data.title;
    });
    eleventyConfig.addFilter("absoluteUrl", (url) => {
        const host = config.server.protocol
            + "://"
            + config.server.domain.toLowerCase();
        const path = eleventyConfig.getFilter("url")(url);
        return host + path;
    });
    eleventyConfig.addFilter("log", (value) => {
        console.log(value);
        return value;
    });
    eleventyConfig.addTransform("prettier", (content, outputPath) => {
        const xml = content.trim(); // prettier fails on leading newline
        return prettier.format(xml, {
            ...config.prettier,
            filepath: outputPath,
        });
    });

    return config.eleventy;
};
