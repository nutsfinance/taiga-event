module.exports = {
  content: ["./src/views/**/*.handlebars"],
  theme: {
    fontFamily: {
      sans: ["Montserrat"],
    },
    extend: {
      colors: {
        primary: {
          50: "#f3f5fd",
          100: "#e8ebfa",
          200: "#c5cef4",
          300: "#a3b0ed",
          400: "#5d74df",
          500: "#1839d1",
          600: "#1633bc",
          700: "#122b9d",
          800: "#0e227d",
          900: "#0c1c66",
        },
        'taiga-gray': {
          '50': '#fafafa', 
          '100': '#f5f4f5', 
          '200': '#e5e4e5', 
          '300': '#d5d4d6', 
          '400': '#b6b4b7', 
          '500': '#969498', 
          '600': '#878589', 
          '700': '#716f72', 
          '800': '#5a595b', 
          '900': '#4a494a'
      }
      },
      backgroundImage: {
        "login-banner": "url('/static/banner.jpg')",
      },
    },
  },
  plugins: [],
};
