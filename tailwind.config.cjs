/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		container: {
			center: true,
		},
		extend: {
			colors: {
				primary: {
					DEFAULT: '#4669fa',
					light: '#F6F8FF',
					'dark-light': 'rgba(67,97,238,.15)',
				},
				secondary: {
					DEFAULT: '#A0AEC0',
					light: '#F9FAFB',
					'dark-light': 'rgb(128 93 202 / 15%)',
				},
				success: {
					DEFAULT: '#50C793',
					light: '#F3FEF8',
					'dark-light': 'rgba(0,171,85,.15)',
				},
				danger: {
					DEFAULT: '#F1595C',
					light: '#FFF7F7',
					'dark-light': 'rgba(231,81,90,.15)',
				},
				warning: {
					DEFAULT: '#FA916B',
					light: '#FFFAF8',
					'dark-light': 'rgba(226,160,63,.15)',
				},
				info: {
					DEFAULT: '#0CE7FA',
					light: '#F3FEFF',
					'dark-light': 'rgba(33,150,243,.15)',
				},
				dark: {
					DEFAULT: '#3b3f5c',
					light: '#eaeaec',
					'dark-light': 'rgba(59,63,92,.15)',
				},
				black: {
					DEFAULT: '#111112',
					light: '#F9FAFB',
					'dark-light': 'rgba(14,23,38,.15)',
				},
				white: {
					DEFAULT: '#ffffff',
					light: '#e0e6ed',
					dark: '#888ea8',
				},
			},
			fontFamily: {
				ali: ["AlimamaFangYuanTiVF", "sans-serif"]
			},
			spacing: {
				4.5: '18px',
			},
			boxShadow: {
				'3xl': '0 2px 2px rgb(224 230 237 / 46%), 1px 6px 7px rgb(224 230 237 / 46%)',
			},
			typography: ({ theme }) => ({
				DEFAULT: {
					css: {
						'--tw-prose-invert-headings': theme('colors.white.dark'),
						'--tw-prose-invert-links': theme('colors.white.dark'),
						h1: { fontSize: '40px', marginBottom: '0.5rem', marginTop: 0 },
						h2: { fontSize: '32px', marginBottom: '0.5rem', marginTop: 0 },
						h3: { fontSize: '28px', marginBottom: '0.5rem', marginTop: 0 },
						h4: { fontSize: '24px', marginBottom: '0.5rem', marginTop: 0 },
						h5: { fontSize: '20px', marginBottom: '0.5rem', marginTop: 0 },
						h6: { fontSize: '16px', marginBottom: '0.5rem', marginTop: 0 },
						p: { marginBottom: '0.5rem' },
						li: { margin: 0 },
						img: { margin: 0 },
					},
				},
			}),
		},
	},
	plugins: [
		require('@tailwindcss/line-clamp'),
	],
};
