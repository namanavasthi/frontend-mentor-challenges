module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    safelist: [
      "text-purple-600",
      "text-blue-600",
      "text-pink-600",
      "border-blue-400",
      "border-green-400",
      "border-yellow-500",
      "border-purple-500",
      "border-red-500",
      "bg-blue-400",
      "bg-green-400",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-red-500",
      "text-blue-400",
      "text-green-400",
      "text-yellow-500",
      "text-purple-500",
      "text-red-500",
    ],
  },
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
