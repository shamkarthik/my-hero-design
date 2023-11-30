import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // extend: {
    //   backgroundImage: {
    //     'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    //     'gradient-conic':
    //       'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    //   },
    // },
    extend: {
      dropShadow: {
        solid: "2px 2px #2a2a2a",
        "solid-white": "2px 2px #ffffff",
        "solid-extend": "4px 4px #2a2a2a",
        outline:
          "-1px -1px 0 #2a2a2a, 1px -1px 0 #2a2a2a, -1px 1px 0 #2a2a2a, 1px 1px 0 #2a2a2a",
      },
      colors: {
        purple: "#7562ab",
        black: "#2a2a2a",
        white: "#ffffff",
        yellow: "#fbe20c",
        grey: "#d4d4d4",
        pink: "#ff84ca",
        blue: "#9FD7FA",
        red: "#F15555",
        green: "#88fe77",
        indigo: {
          1000: "#171626",
        },
      },
      backgroundImage: {
        "radial-glass":
          "radial-gradient(circle, rgb(30, 27, 75, 0.5) 0%, rgb(30, 27, 75, 0.7) 20%, #18181b 130%)",
      },
    },
  },
  plugins: [],
}
export default config
