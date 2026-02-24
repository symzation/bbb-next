import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class", "dark"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-roboto-mono)', 'monospace'], 
        fraunces: ["var(--font-fraunces)"],
        merriweatherSans: ["var(--font-merriweather-sans)"],
        
      }
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config