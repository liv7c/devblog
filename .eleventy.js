import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import {DateTime} from 'luxon';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import {rssPlugin as pluginRss} from '@11ty/eleventy-plugin-rss';
import pluginTOC from 'eleventy-plugin-toc';
import {eleventyImageTransformPlugin} from '@11ty/eleventy-img';

export default function (eleventyConfig) {
  eleventyConfig.setServerOptions({
    showAllHosts: true,
  });

  eleventyConfig.setLibrary(
    'md',
    markdownIt({
      html: true,
    }).use(markdownItAnchor)
  );
  eleventyConfig.addPlugin(pluginTOC, {
    wrapper: 'div',
  });

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ['webp', 'jpeg', 'svg'],
    svgAllowUpscale: false,
    svgShortCircuit: true,
  });

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
}
