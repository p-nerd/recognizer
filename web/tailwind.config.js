/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts}"],
    theme: {
        extend: {
            fontFamily: {
                arial: ["Arial"],
            },
            fontSize: {
                h1: "48px",
                h2: "36px",
                h3: "30px",
                h4: "24px",
                h5: "20px",
                h6: "16px",
            },
        },
    },
    plugins: [],
};
