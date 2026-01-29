export const useApi = () => {
    const config = useRuntimeConfig();

    const baseURL = config.public.apiBase || "http://localhost:8000/api";

    const customFetch = async (endpoint: string, options: any = {}) => {
        // Get token from localStorage (client-side only)
        let token = null;
        if (process.client) {
            token = localStorage.getItem("token");
        }

        // Set default headers
        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...options.headers,
        };

        // Add authorization header if token exists
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const url = `${baseURL}${endpoint}`;

        console.log(`API Call: ${options.method || "GET"} ${url}`);

        try {
            // Use Nuxt's $fetch
            const response = await $fetch(url, {
                ...options,
                headers,
                credentials: "include", // Important for Laravel Sanctum
            });

            return response;
        } catch (error: any) {
            console.error("API Error:", {
                url,
                status: error.status,
                data: error.data,
                message: error.message,
            });

            // Handle 401 Unauthorized (token expired/invalid)
            if (
                process.client &&
                (error.status === 401 || error.statusCode === 401)
            ) {
                localStorage.removeItem("token");

                // Only redirect if not already on login page
                if (!window.location.pathname.includes("/auth/login")) {
                    window.location.href = "/auth/login";
                }
            }

            throw error;
        }
    };

    return {
        get: (endpoint: string, options?: any) =>
            customFetch(endpoint, { method: "GET", ...options }),

        post: (endpoint: string, body: any, options?: any) =>
            customFetch(endpoint, { method: "POST", body, ...options }),

        put: (endpoint: string, body: any, options?: any) =>
            customFetch(endpoint, { method: "PUT", body, ...options }),

        patch: (endpoint: string, body: any, options?: any) =>
            customFetch(endpoint, { method: "PATCH", body, ...options }),

        delete: (endpoint: string, options?: any) =>
            customFetch(endpoint, { method: "DELETE", ...options }),
    };
};
