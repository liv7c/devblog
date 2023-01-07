import terser from '@rollup/plugin-terser';

export default {
  input: 'src/js/app.js',
  output: {
    file: 'public/js/app.js',
    format: 'iife',
    sourcemap: false,
  },
  plugins: [
    terser({
      compress: true,
    }),
  ],
};
