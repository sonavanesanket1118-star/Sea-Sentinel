import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          950: "#040814",
          900: "#060D1F", // BG Primary
          850: "#09132B",
          800: "#0C1A3A", // BG Secondary
          700: "#111D3A", // Card BG
          600: "#16284F",
          border: "#1E3A5F",
        },
        sonar: {
          cyan: "#00E5FF", // Accent Primary
          green: "#00FF88", // Accent Secondary
          red: "#FF3D3D", // Danger / Critical
          amber: "#FFB800", // Warning / Moderate
          blue: "#4488FF",
          purple: "#8844FF",
          darkred: "#CC0000",
        },
        command: {
          text: "#E8EDF5",
          muted: "#7B8FAD",
          card: "rgba(17, 29, 58, 0.75)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-space)", "Space Grotesk", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        "sonar-cyan": "0 0 20px rgba(0, 229, 255, 0.35)",
        "sonar-cyan-lg": "0 0 35px rgba(0, 229, 255, 0.55)",
        "sonar-green": "0 0 20px rgba(0, 255, 136, 0.35)",
        "sonar-red": "0 0 20px rgba(255, 61, 61, 0.45)",
        "glass-card": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      animation: {
        "radar-sweep": "radarSweep 4s linear infinite",
        "sonar-ping": "sonarPing 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "scan-line": "scanLine 2.5s ease-in-out infinite alternate",
      },
      keyframes: {
        radarSweep: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        sonarPing: {
          "75%, 100%": {
            transform: "scale(2.4)",
            opacity: "0",
          },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 8px rgba(0,229,255,0.6))" },
          "50%": { opacity: "0.6", filter: "drop-shadow(0 0 2px rgba(0,229,255,0.2))" },
        },
        scanLine: {
          "0%": { top: "0%" },
          "100%": { top: "95%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
