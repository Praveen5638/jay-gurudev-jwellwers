/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0F0F0F",
          gold: "#D4AF37",
          cream: "#F5E6C8",
          white: "#FFFFFF",
          darkGold: "#B3922E", // slightly darker gold for hovers
          darkBg: "#080808",   // extra deep premium black background
          cardBg: "#141414",   // container background
          border: "#2A261B",   // subtle gold-tinted charcoal border
        }
      },
      fontFamily: {
        heading: ["Cinzel", "Playfair Display", "serif"],
        body: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        'gold-glow': '0 0 15px rgba(212, 175, 55, 0.12)',
        'gold-glow-lg': '0 0 25px rgba(212, 175, 55, 0.25)',
        'gold-glow-intense': '0 0 35px rgba(212, 175, 55, 0.45)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #AA882C 100%)',
        'gold-text-gradient': 'linear-gradient(to right, #F5E6C8, #D4AF37, #AA882C, #F5E6C8)',
        'luxury-bg': 'radial-gradient(circle at center, #1A1A1A 0%, #080808 100%)',
        'gold-border-gradient': 'linear-gradient(to right, #AA882C, #D4AF37, #AA882C)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      }
    },
  },
  plugins: [],
}
