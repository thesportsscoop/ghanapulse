const path = require('path');
const { DateTime } = require("luxon"); // Import Luxon for advanced date formatting

module.exports = function(eleventyConfig) {
    // Pass through static assets like images, CSS, JS, and favicon
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/netlify-cms"); // Copy CMS files
    eleventyConfig.addPassthroughCopy("src/admin");     // Copy CMS config

    // Custom filter to sort posts by date (newest first)
    eleventyConfig.addFilter("sortByDate", (collection) => {
        return collection.sort((a, b) => b.date - a.date);
    });

    // Custom filter to filter posts by category
    eleventyConfig.addFilter("filterByCategory", (collection, category) => {
        return collection.filter(item => item.data.category === category);
    });

    // Custom filter for date formatting using Luxon
    eleventyConfig.addFilter("dateFilter", (dateObj, format) => {
        // Ensure dateObj is a valid Date object or can be parsed by Luxon
        return DateTime.fromJSDate(dateObj).toFormat(format);
    });

    // Custom filter to capitalize text (simple example for titles)
    eleventyConfig.addFilter("capitalize", (text) => {
        if (!text) return '';
        // This simple capitalization ensures each word starts with a capital.
        // For true sentence case (e.g., handling prepositions, etc.), a more complex function is needed.
        return text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    });

    // Define 'posts' collection for all markdown files in src/posts/
    eleventyConfig.addCollection("posts", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/posts/*.md");
    });

    return {
        // Eleventy directories configuration
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
            data: "_data"
        },
        templateFormats: ["html", "njk", "md"], // Nunjucks (.njk) and Markdown (.md)
        markdownTemplateEngine: "njk", // Process Markdown files with Nunjucks templates
        htmlTemplateEngine: "njk",     // Process HTML files with Nunjucks templates
        dataTemplateEngine: "njk"      // Process data files with Nunjucks templates
    };
};