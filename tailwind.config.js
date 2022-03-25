module.exports = {
  content:  ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      'sch-1': '400px',
      'sch-2': '1440px',
      'sch-3': '1440px',
      'sch-4': '1440px',
      'sch-5': '1440px',
      'sch-6': '1440px',
      'sch-7': '1440px',
    },
    colors: {
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': 'rgb(27, 102, 15, 0.7)',
      'todayGreen': '#228B22',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'red': '#DA0000',
      'gray-light': '#d3dce6',
      'white':"#FFFFF0",
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '10': '10px',
        '20': '20px',
        '1k': '1000px',
        '300': '300px',
        '400': '400px',
        '25': '25px',
        '35': '35px',
        '22': '22px',
        '60': '60px',
        '70': '70px',
        '80': '80px',
        '.01': '1%',
        '.02': '2%',
        '.05': '5%',
        '.1': '10%',
        '.25': '25%',
        '.35': '35%',
        '.5': '50%',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
