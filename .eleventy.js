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
    eleventyConfig.addLiquidShortcode("titleOf", (page, collection) => {
        const colPage = collection.find(elem => elem.url === page.url);
        return colPage.data.title;
    });

    return {
        dir: {
            input: "pages",
            output: "build",
        },
        pathPrefix: "/",
    };
};
