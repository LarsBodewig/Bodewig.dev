import prettierXml from "@prettier/plugin-xml";
import { defaultOperators } from "liquidjs";
import micromatch from "micromatch";
import { format } from "prettier";
import config from "./config.js";

export default function (eleventyConfig) {
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
            ...defaultOperators,
            "+": (a, b) => a + b,
            "mod": (a, b) => a % b,
            "inCol": (elem, collection) =>
                collection.some(item => item.url === elem.url),
            "from": (elem, collection) =>
                collection.find(item => item.url === elem.url),
            "in": (field, obj) => field in obj,
            ",": (a, b) => [
                ...(Array.isArray(a) ? a : [a]),
                ...(Array.isArray(b) ? b : [b])
            ]
        }
    });
    config.passthrough.forEach(rule => eleventyConfig.addPassthroughCopy(rule));
    if (config.favicon) {
        eleventyConfig.addPassthroughCopy({ [config.favicon]: "favicon.svg" });
    }
    eleventyConfig.addShortcode("debug", function (value) {
        console.warn(value);
        return "<!-- remove after test -->";
    });
    // liquidjs does not support doc tags, so we add them as a custom tag that does nothing
    eleventyConfig.addPairedShortcode("doc", () => { });
    eleventyConfig.addFilter("asset", (file) => {
        const url = "/assets/" + file;
        const path = eleventyConfig.getFilter("url")(url);
        return path;
    });
    eleventyConfig.addFilter("absoluteUrl", (url) => {
        const host = config.server.protocol + "://" + config.server.domain;
        const path = eleventyConfig.getFilter("url")(url);
        return host + path;
    });
    eleventyConfig.addFilter("absoluteUrlNoPrefix", (url) => {
        const host = config.server.protocol + "://" + config.server.domain;
        return host + "/" + url;
    });
    eleventyConfig.addFilter("encode", (value) => {
        const encoded = value.split("")
            .map(c => c.charCodeAt(0).toString(16).padStart(2, "0"))
            .join("");
        return encoded;
    });
    eleventyConfig.addFilter("color", (value) => {
        let h = 0;
        const s = 100;
        let l = 0;
        for (let i = 0; i < value.length; i++) {
            const code = value.charCodeAt(i);
            h += code;
            if (i % 2) l += code;
        }
        h = h % 360;
        if (h > 40 && h < 200) {
            l = l % 20 + 20;
        } else {
            l = l % 30 + 30;
        }
        return "hsl(" + h + "," + s + "%," + l + "%)";
    });
    eleventyConfig.addFilter("hash", (value) => {
        let hash = 0;
        for (let i = 0; i < value.length; i++) {
            const char = value.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash;
        }
        return hash;
    });
    eleventyConfig.addFilter("sortBy", (collection, ...fields) => {
        const colCopy = [...collection];
        colCopy.sort((left, right) => {
            for (const field of fields) {
                const valueLeft = left.data[field].toString();
                const valueRight = right.data[field].toString();
                const result = valueLeft.localeCompare(valueRight);
                if (result !== 0) return result;
            }
            return 0;
        });
        return colCopy;
    });
    eleventyConfig.addTransform("prettier", async (content, outputPath) => {
        // micromatch behaves weird about "./" thats why we remove it
        const pathWithoutLeadingDot = outputPath.startsWith(".") ? outputPath.substring(1) : outputPath;
        const isExcluded = micromatch.isMatch(pathWithoutLeadingDot, config.prettierExclude, { dot: true });
        if (isExcluded) {
            return content.trimStart(); // no transformation with prettier
        }
        return await format(content, {
            ...config.prettier,
            filepath: outputPath,
            plugins: [prettierXml]
        });
    });

    return config.eleventyConfig;
};
