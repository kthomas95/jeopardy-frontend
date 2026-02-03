import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import TanStackRouterVite from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        tailwindcss(),
        TanStackRouterVite(),
        react(),
        VitePWA({
            registerType: "autoUpdate",
            manifest: {
                name: "Jeopardy",
                short_name: "Jeopardy",
                description: "Jeopardy",
                theme_color: "#1e293b", // dark mode background (slate-800 equivalent)
                background_color: "#1e293b",
                display: "standalone",
                icons: [
                    {
                        src: "icon.svg",
                        sizes: "any",
                        type: "image/svg+xml",
                        purpose: "any maskable",
                    },
                ],
            },
        }),
    ],
});
