const prettier = require("prettier");

function collectionSortTitle(collectionApi) {
    const collection = collectionApi.getAll();
    const colCopy = [...collection]; // prevent sorting inplace
    const ordered = colCopy.sort((a, b) => a.data.title - b.data.title);
    return ordered;
}

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addCollection("nav", collectionSortTitle);
    eleventyConfig.addCollection("footer", collectionSortTitle);
    eleventyConfig.addShortcode("titleOf", (page, collection) => {
        const colPage = collection.find((elem) => elem.url === page.url);
        return colPage.data.title;
    });
    eleventyConfig.addShortcode("absoluteUrl", (url, globals) => {
        const host = globals.protocol + "://" + globals.domain.toLowerCase();
        const path = eleventyConfig.getFilter("url")(url);
        return host + path;
    });
    eleventyConfig.addTransform("prettier", (content, outputPath) =>
        prettier.format(
            content,
            {
                tabWidth: 4,
                xmlWhitespaceSensitivity: "ignore",
                filepath: outputPath
            }
        ));

    return {
        dir: {
            input: "pages",
            output: "build",
        },
        pathPrefix: "/",
    };
};
