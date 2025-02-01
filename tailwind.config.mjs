/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			sans: ["Source Sans Pro", "sans-serif"],
		  },
		extend: {
			colors: {
				maroon: {
				  DEFAULT: "#500000",
				  50: "#AC0000",
				  100: "#A20000",
				  200: "#8D0000",
				  300: "#790000",
				  400: "#640000",
				  500: "#500000",
				  600: "#460000",
				  700: "#3C0000",
				  800: "#310000",
				  900: "#270000",
				  950: "#220000",
				},
				lightmaroon: {
				  DEFAULT: "#662c2c",
				},
			  },
		  },
	},
	plugins: [require('@tailwindcss/typography'),],
}
