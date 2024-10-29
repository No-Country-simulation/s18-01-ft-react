/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './src/**/*.css'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#BB4E58',
          100: '#F8EDEE',
          200: '#F5E4E6',
          300: '#EAC8CB',
          400: '#BB4E58',
          500: '#A8464F',
          600: '#963E46',
          700: '#8C3B42',
          800: '#702F35',
          900: '#542328',
          1000: '#411B1F',
        },
        secondary: {
          DEFAULT: '#738ADA',
          100: '#F1F3FB',
          200: '#EAEDF9',
          300: '#D4DBF4',
          400: '#738ADA',
          500: '#687CC4',
          600: '#5C6EAE',
          700: '#5668A4',
          800: '#455383',
          900: '#343E62',
          1000: '#28304C',
        },
        accent: {
          DEFAULT: '#A0956C',
          100: '#F6F4F0',
          200: '#F1EFE9',
          300: '#E2DED1',
          400: '#A0956C',
          500: '#908661',
          600: '#807756',
          700: '#787051',
          800: '#605941',
          900: '#484331',
          1000: '#383426',
        },
        neutral: {
          DEFAULT: '#ACACAC',
          0: 'rgba(247,247,247,0)',
          10: 'rgba(247,247,247,0.1)',
          30: 'rgba(247,247,247,0.3)',
          40: 'rgba(247,247,247,0.4)',
          50: 'rgba(247,247,247,0.5)',
          100: '#E4E4E4',
          200: '#D2D2D2',
          300: '#BFBFBF',
          400: '#ACACAC',
          500: '#9A9A9A',
          600: '#878787',
          700: '#757575',
          800: '#626262',
          900: '#4F4F4F',
          1000: '#3D3D3D',
        },
        error: {
          DEFAULT: '#EE6055',
          0: 'rgba(238,96,85,0)',
          10: 'rgba(247,96,85,0.1)',
          50: 'rgba(247,96,85,0.5)',
          100: '#F7B0AA',
          200: '#EE6055',
          300: '#E92D1F',
          400: '#B91F13',
          500: '#83160D',
        },
        warning: {
          DEFAULT: '#FFD355',
          0: 'rgba(255,189,0,0)',
          10: 'rgba(255,189,0,0.1)',
          50: 'rgba(255,189,0,0.5)',
          100: '#FFE9AA',
          200: '#FFD355',
          300: '#FFBD00',
          400: '#C69200',
          500: '#8C6800',
        },
        success: {
          DEFAULT: '#86CD82',
          0: 'rgba(134,205,130,0)',
          10: 'rgba(134,205,130,0.1)',
          50: 'rgba(134,205,130,0.5)',
          100: '#C3E6C1',
          200: '#86CD82',
          300: '#5BBB56',
          400: '#41973C',
          500: '#2E6B2B',
        },
      },
      backgroundImage: {
        'field-img': "url('/images/field.jpg')",
      },
      backgroundPosition: {
        'field-img': '110% 51%',
      },
      backgroundSize: {
        'field-img': '105% 430%',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      boxShadow: {
        drop: 'var(--drop-shadow)',
        'drop-small': 'var(--drop-shadow-small)',
        inset: 'inset var(--drop-shadow)',
        'inset-small': 'inset var(--drop-shadow-small)',
      },
      pointerEvents: {
        control: 'var(--pointer-events-control)',
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
    removeDeprecatedGapUtilities: true,
    standardFontWeights: true,
  },
};