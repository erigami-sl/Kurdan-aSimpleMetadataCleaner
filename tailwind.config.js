/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['Cormorant Garamond', 'Georgia', 'Times New Roman', 'serif'],
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            borderRadius: {
                'organic': '40px',
            },
        },
    },
    darkMode: 'class',
    plugins: [],
}
