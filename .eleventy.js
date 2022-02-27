module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./src/sass/');
  eleventyConfig.addPassthroughCopy('./src/css/');

  eleventyConfig.addNunjucksGlobal('currentYear', new Date().getFullYear());

  return {
    dir: {
      input: 'src',
      output: 'public',
    },
  };
};
