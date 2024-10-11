export default {
  plugins: {
    'postcss-import': {},
    tailwindcss: { config: './tailwind.config.js' },
    autoprefixer: {},
    'tailwindcss/nesting': {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
};
