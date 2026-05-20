/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#121212"
      },
      // Integrated your custom Montserrat font family strings:
      fontFamily: {
        mont: ["Mont-Regular"],
        montBold: ["Mont-Bold"],
        montExtra: ["Mont-ExtraBold"],
        montBlack: ["Mont-Black"],
      },
    },
  },
  plugins: [],
}