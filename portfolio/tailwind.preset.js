// tailwind.preset.js
export default {
    theme: {
      extend: {
        colors: {
          primary: '#CB9DF0',
          secondary: '#FDDBBB'
          // primary: ['#CB9DF0', '#F0C1E1'],
          // secondary: ['#FDDBBB', '#FFF9BF']
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          serif: ['Merriweather', 'serif'],
        },
      },
    },
    darkMode: 'class',
    mode: 'jit',
    plugins: [
      function({addUtilities, theme}){
        const newUtilities = {
          '.stroke-text':{
            '--tw-text-opacity':'1',
            '-webkit-text-stroke-width': '1.4px',
            '-webkit-text-fill-color': 'transparent',
            '-webkit-text-stroke-color': theme ('colors secondary'),
          },
          '.text-stroke-primary':{
            '-webkit-text-stroke-color' :theme ('colors.primary'),
          },
          'dark. text-stroke-secondary':{
            '-webkit-text-stroke-color' :theme ('colors.secondary'),
          }
        };
        addUtilities(newUtilities, ['responsive', 'dark']);
      }
    ],
  };