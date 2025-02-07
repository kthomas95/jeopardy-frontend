/** @type {import('tailwindcss').Config} */
/* eslint-disable @typescript-eslint/no-var-requires */

import plugin from "tailwindcss/plugin";
import colors from "tailwindcss/colors";

import { PKMN_TYPES } from "@kthomas95/pokemon-card";

module.exports = {
    mode: "jit",

    content: [
        "./src/{app,components,pages,constants,stories,__fixtures__}/**/*.{js,jsx,ts,tsx,css}",
        "./src/**/*",
        "./src/*",
    ],
    safelist: [
        ...PKMN_TYPES.map((pkmnType) => `bg-${pkmnType}`),
        ...PKMN_TYPES.map((pkmnType) => `text-${pkmnType}`),
        ...PKMN_TYPES.map((pkmnType) => `!border-${pkmnType}`),
    ],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        extend: {
            fontSize: { "2xs": ".6rem", "3xs": ".5rem" },
            transitionProperty: {
                size: "height, width, font-size",
            },
            fontFamily: {
                // sans: "Inter var, Inter, sans-serif",
                sans: "Figtree, sans-serif",
                pkmn: "ptcg",
            },
            colors: {
                "card-border": "#ffe365",
                Fire: "hsl(13, 60%, 45%)",
                // Fighting: "hsl(30, 35%, 25%)",
                Fighting: "#d59647",
                Water: "hsl(197, 60%, 43%)",
                Grass: "hsl(97, 44%, 56%)",
                Psychic: "hsl(288, 25%, 43%)",
                Fairy: "hsl(335, 54%, 45%)",
                Lightning: "hsl(58, 94%, 52%)",
                Metal: "hsl(212, 5%, 45%)",
                Dragon: "hsl(55, 30%, 30%)",
                Darkness: "hsl(189, 5%, 14%)",
                Colorless: "hsl(189, 15%, 80%)",
                gray: colors.slate,
                primary: colors.sky,
                secondary: colors.indigo,
                error: colors.red,
                success: colors.emerald,
                warning: colors.yellow,
            },
            keyframes: {
                open: {
                    from: {
                        height: 0,
                    },
                    to: {
                        height: "var(--radix-collapsible-content-height)",
                    },
                },
                closed: {
                    from: {
                        height: "var(--radix-collapsible-content-height)",
                    },
                    to: {
                        height: 0,
                    },
                },
            },
            animation: {
                opened: "open 100ms ease-out",
                closed: "closed 100ms ease-out",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        function ({ addVariant }) {
            addVariant("child", "& > *");
            addVariant("child-hover", "& > *:hover");
        },
        plugin(function ({ addVariant }) {
            // eslint-disable-next-line quotes
            addVariant("data-open", '&[data-state="open"]');
            // eslint-disable-next-line quotes
            addVariant("data-closed", '&[data-state="closed"]');
        }),

        plugin(({ addComponents, addUtilities, theme, prefix }) => {
            addUtilities({
                ".btn-icon": {
                    height: "1em",
                    marginRight: theme("spacing.2"),
                },
                ".petite-caps": {
                    fontVariant: "all-petite-caps",
                },
                ".heading-2xs": {
                    fontSize: theme("fontSize.2xs"),
                    fontWeight: theme("fontWeight.extrabold"),
                },
                ".heading-xs": {
                    fontSize: theme("fontSize.xs"),
                    letterSpacing: theme("letterSpacing.tight"),
                    fontWeight: theme("fontWeight.bold"),
                },
                ".heading-sm": {
                    fontSize: theme("fontSize.sm"),
                    letterSpacing: theme("letterSpacing.tight"),
                    fontWeight: theme("fontWeight.bold"),
                },

                ".heading-base": {
                    fontSize: theme("fontSize.base"),
                    letterSpacing: theme("letterSpacing.tight"),
                    fontWeight: theme("fontWeight.extrabold"),
                },
                ".heading-lg": {
                    fontSize: theme("fontSize.lg"),
                    letterSpacing: theme("letterSpacing.tight"),
                    fontWeight: theme("fontWeight.extrabold"),
                },
                ".heading-xl": {
                    fontSize: theme("fontSize.xl"),
                    letterSpacing: theme("letterSpacing.tight"),
                    fontWeight: theme("fontWeight.extrabold"),
                },
                ".heading-2xl": {
                    fontSize: theme("fontSize.2xl"),
                    letterSpacing: theme("letterSpacing.tight"),
                    fontWeight: theme("fontWeight.extrabold"),
                },
                ".sideways": {
                    writingMode: "sideways-lr",
                },
                ".badge": {
                    fontSize: theme("fontSize.xs"),
                    letterSpacing: theme("letterSpacing.tight"),
                    borderRadius: theme("spacing.2"),
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                },
                ".center": {
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                },
                ".dark-1": {
                    backgroundColor: theme("colors.gray.500"),
                    color: theme("colors.gray.200"),
                },
                ".dark-2": {
                    backgroundColor: theme("colors.gray.600"),
                    color: theme("colors.gray.200"),
                },
                ".dark-3": {
                    backgroundColor: theme("colors.gray.700"),
                    color: theme("colors.gray.200"),
                },
                ".dark-4": {
                    backgroundColor: theme("colors.gray.800"),
                    color: theme("colors.gray.200"),
                },
                ".dark-5": {
                    backgroundColor: theme("colors.gray.900"),
                    color: theme("colors.gray.300"),
                },
                ".light-1": {
                    backgroundColor: theme("colors.gray.50"),
                    color: theme("colors.gray.600"),
                },
                ".light-2": {
                    backgroundColor: theme("colors.gray.100"),
                    color: theme("colors.gray.700"),
                },
                ".light-3": {
                    backgroundColor: theme("colors.gray.200"),
                    color: theme("colors.gray.700"),
                },
                ".light-4": {
                    backgroundColor: theme("colors.gray.300"),
                    color: theme("colors.gray.800"),
                },
                ".light-5": {
                    backgroundColor: theme("colors.gray.400"),
                    color: theme("colors.gray.800"),
                },
                ".primary-1": {
                    backgroundColor: theme("colors.sky.400"),
                    color: theme("colors.gray.100"),
                },
                ".primary-2": {
                    backgroundColor: theme("colors.sky.500"),
                    color: theme("colors.gray.200"),
                },
                ".primary-3": {
                    backgroundColor: theme("colors.sky.600"),
                    color: theme("colors.gray.200"),
                },
                ".primary-4": {
                    backgroundColor: theme("colors.sky.700"),
                    color: theme("colors.gray.300"),
                },
                ".primary-5": {
                    backgroundColor: theme("colors.sky.800"),
                    color: theme("colors.gray.300"),
                },
                ".error-1": {
                    backgroundColor: theme("colors.red.500"),
                    color: theme("colors.gray.100"),
                },
                ".error-2": {
                    backgroundColor: theme("colors.red.600"),
                    color: theme("colors.gray.200"),
                },
                ".error-3": {
                    backgroundColor: theme("colors.red.700"),
                    color: theme("colors.gray.200"),
                },
                ".error-4": {
                    backgroundColor: theme("colors.red.800"),
                    color: theme("colors.gray.300"),
                },
                ".error-5": {
                    backgroundColor: theme("colors.red.900"),
                    color: theme("colors.gray.300"),
                },
                ".success-1": {
                    backgroundColor: theme("colors.emerald.400"),
                    color: theme("colors.gray.100"),
                },
                ".success-2": {
                    backgroundColor: theme("colors.emerald.500"),
                    color: theme("colors.gray.200"),
                },
                ".success-3": {
                    backgroundColor: theme("colors.emerald.600"),
                    color: theme("colors.gray.200"),
                },
                ".success-4": {
                    backgroundColor: theme("colors.emerald.700"),
                    color: theme("colors.gray.300"),
                },
                ".success-5": {
                    backgroundColor: theme("colors.emerald.800"),
                    color: theme("colors.gray.300"),
                },
                ".warning-1": {
                    backgroundColor: theme("colors.yellow.400"),
                    color: theme("colors.gray.200"),
                },
                ".warning-2": {
                    backgroundColor: theme("colors.yellow.500"),
                    color: theme("colors.gray.50"),
                },
                ".warning-3": {
                    backgroundColor: theme("colors.yellow.600"),
                    color: theme("colors.gray.50"),
                },
                ".warning-4": {
                    backgroundColor: theme("colors.yellow.700"),
                    color: theme("colors.gray.300"),
                },
                ".warning-5": {
                    backgroundColor: theme("colors.yellow.800"),
                    color: theme("colors.gray.300"),
                },
                ".secondary-1": {
                    backgroundColor: theme("colors.secondary.400"),
                    color: theme("colors.gray.200"),
                },
                ".secondary-2": {
                    backgroundColor: theme("colors.secondary.500"),
                    color: theme("colors.gray.50"),
                },
                ".secondary-3": {
                    backgroundColor: theme("colors.secondary.600"),
                    color: theme("colors.gray.50"),
                },
                ".secondary-4": {
                    backgroundColor: theme("colors.secondary.700"),
                    color: theme("colors.gray.300"),
                },
                ".secondary-5": {
                    backgroundColor: theme("colors.secondary.800"),
                    color: theme("colors.gray.300"),
                },
                ".card-ratio": {
                    aspectRatio: "367 / 512",
                },
                ".position-your-hand": {
                    gridRowStart: "7",
                    gridRowEnd: "7",
                    gridColumnStart: "1",
                    gridColumnEnd: "5",
                },
            });
        }),
    ],
    experimental: {
        classRegex: [
            ["cva\\(((?:[^()]|\\([^()]*\\))*)\\)"],
            ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
        ],
    },
};
