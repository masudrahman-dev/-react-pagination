/** @type {import('tailwindcss').Config} */

// import containerQueries from "@tailwindcss/container-queries";
// import aspectRatio from "@tailwindcss/aspect-ratio";
// import forms from "@tailwindcss/forms";
// import typography from "@tailwindcss/typography";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(
      function ({ addUtilities, theme, e }) {
        const values = theme("colCount");
        const utilities = Object.entries(values).map(([key, value]) => {
          const c = {
            [`.${e(`col-count-${key}`)}`]: { columnCount: `${value}` },
          };
          return c;
        });
        addUtilities(utilities);
      },
      {
        theme: {
          colCount: {
            2: "2",
            3: "3",
            4: "4",
            5: "5",
            6: "6",
          },
        },
      },
    ),
  ],
};
