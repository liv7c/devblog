module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./src/sass/');
  eleventyConfig.addPassthroughCopy('./src/css/');

  eleventyConfig.addWatchTarget('./src/js/');

  eleventyConfig.addNunjucksGlobal('currentYear', new Date().getFullYear());

  return {
    dir: {
      input: 'src',
      output: 'public',
    },
  };
};
