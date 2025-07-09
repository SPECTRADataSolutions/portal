const spectra = require('./src/styles/spectra.colors.js');

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        spectra: {
          ...spectra.core,
          ...spectra.brand,
          ...spectra.accent
        }
      }
    }
  },
  plugins: []
};
