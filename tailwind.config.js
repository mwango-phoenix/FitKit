/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#CAC3E0',
        secondary: '#553F9B',
        dark: '#191825',
        light: '#EEECF5',
        background: '#DDDCDE',
        darkBackground: '#1E1636',
      }
    },
  },
  plugins: [],
}