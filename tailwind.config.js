module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      borderRadius: {
        1: "1px",
      },
      colors: {
        github: "#333333",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
