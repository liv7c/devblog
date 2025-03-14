import terser from '@rollup/plugin-terser';

export default {
  input: 'src/js/add-tabindex.js',
  output: {
    file: 'public/js/add-tabindex.js',
    format: 'iife',
    sourcemap: false,
  },
  plugins: [
    terser({
      compress: true,
    }),
  ],
};
