const {DateTime} = require('luxon');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addWatchTarget('./src/sass/');
  eleventyConfig.addPassthroughCopy('./src/css/');

  eleventyConfig.addPassthroughCopy('./src/fonts');
  eleventyConfig.addPassthroughCopy('./src/img');

  eleventyConfig.addWatchTarget('./src/js/');

  eleventyConfig.addNunjucksGlobal('currentYear', new Date().getFullYear());

  eleventyConfig.addFilter('asPostDate', (date) => {
    return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MED);
  });

  eleventyConfig.addFilter('isoDate', (date) => {
    return DateTime.fromJSDate(date).toISODate();
  });

  eleventyConfig.addFilter('limit', (arr, limit) => arr.slice(0, limit));

  return {
    dir: {
      input: 'src',
      output: 'public',
    },
  };
};
