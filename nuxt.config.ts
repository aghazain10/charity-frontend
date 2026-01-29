export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],

    // Auto-import composables from the composables directory
    imports: {
        dirs: ["stores", "composables"],
    },

    // Runtime configuration (accessible via useRuntimeConfig())
    runtimeConfig: {
        public: {
            apiBase:
                process.env.NUXT_PUBLIC_API_BASE || "http://localhost:8000/api",
        },
    },

    // TypeScript auto-imports
    typescript: {
        typeCheck: true,
        strict: true,
    },

    // Vue-specific configuration
    vue: {
        compilerOptions: {
            isCustomElement: (tag) => tag.includes("-"),
        },
    },
});
