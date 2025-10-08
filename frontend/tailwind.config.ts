import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"], // Keep for compatibility, but we don't use dark mode
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        /* ============================================
           SPACE AGE LOUNGE - DIRECT COLOR TOKENS
           For use in Tailwind classes like bg-tangerine
           ============================================ */

        // Primary Colors
        'powder-blue': '#87CEEB',
        'sky-blue': '#6BB6D6',
        'tangerine': '#FF8C42',
        'atomic-teal': '#2A9D8F',

        // Supporting Colors
        'champagne': '#F4E4C1',
        'warm-gray': '#A8A39D',
        'deep-walnut': '#2A1F1A',
        'coral-pink': '#FF6B6B',
        'harvest-gold': '#E4A853',

        // Semantic Colors
        'success': '#2A9D8F',
        'warning': '#FFB347',
        'error': '#E76F51',
        'info': '#87CEEB',

        /* ============================================
           SHADCN/UI COMPATIBILITY
           Maps to CSS variables in index.css
           ============================================ */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)", // 16px
        md: "calc(var(--radius) - 2px)", // 14px
        sm: "calc(var(--radius) - 4px)", // 12px
        'pill': '28px', // Pill-shaped buttons
        'full-pill': '9999px', // Fully rounded pills
      },
      fontSize: {
        // Space Age Lounge typography scale
        'xs': ['0.875rem', { lineHeight: '1.5' }], // 14px
        'sm': ['1rem', { lineHeight: '1.6' }], // 16px
        'base': ['1.125rem', { lineHeight: '1.6' }], // 18px - preferred
        'lg': ['1.25rem', { lineHeight: '1.5' }], // 20px
        'xl': ['1.5rem', { lineHeight: '1.4' }], // 24px
        '2xl': ['2rem', { lineHeight: '1.3' }], // 32px
        '3xl': ['3rem', { lineHeight: '1.2' }], // 48px
      },
      fontFamily: {
        headline: ['Lexend', 'Outfit', 'DM Sans', 'system-ui', 'sans-serif'],
        body: ['Inter', 'Roboto', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      spacing: {
        'xs': '0.5rem',   // 8px
        'sm': '0.75rem',  // 12px
        'md': '1rem',     // 16px
        'lg': '1.5rem',   // 24px
        'xl': '2rem',     // 32px
        '2xl': '3rem',    // 48px
        '3xl': '4rem',    // 64px
      },
      minHeight: {
        'touch': '44px',  // Minimum touch target
        'touch-comfortable': '56px', // Preferred touch target
      },
      minWidth: {
        'touch': '44px',
        'touch-comfortable': '56px',
      },
      boxShadow: {
        'sm': '0 2px 8px rgba(0,0,0,0.1)',
        'DEFAULT': '0 4px 12px rgba(0,0,0,0.1)',
        'md': '0 4px 12px rgba(0,0,0,0.1)',
        'lg': '0 8px 24px rgba(0,0,0,0.15)',
        'xl': '0 20px 60px rgba(0,0,0,0.3)',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '250ms',
        'slow': '400ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-in-up": {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(255, 140, 66, 0.4)" },
          "50%": { boxShadow: "0 0 20px 10px rgba(255, 140, 66, 0.1)" },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in-up": "slide-in-up 400ms cubic-bezier(0.4, 0.0, 0.2, 1)",
        "bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "wiggle": "wiggle 0.5s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
