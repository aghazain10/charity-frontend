import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null as any,
        isAuthenticated: false,
        isLoading: false,
    }),

    getters: {
        // Example getter: get user's first name
        firstName: (state) => state.user?.name?.split(" ")[0] || "",
    },

    actions: {
        /**
         * Initialize the store
         * Call this in app.vue or layout to restore auth state
         */
        async init() {
            if (process.client && localStorage.getItem("token")) {
                await this.fetchUser();
            }
        },

        /**
         * Login with email and password
         */
        async login(credentials: { email: string; password: string }) {
            this.isLoading = true;

            try {
                // Use our custom $fetch composable
                const api = useApi();

                // Call Laravel login endpoint
                const response: any = await api.post("/login", credentials);

                // Update state
                this.user = response.user;
                this.isAuthenticated = true;

                // Store token in localStorage
                if (process.client) {
                    localStorage.setItem("token", response.token);
                }

                return {
                    success: true,
                    data: response,
                };
            } catch (error: any) {
                console.error("Login failed:", error);

                // Extract error message from response
                const message =
                    error.data?.message ||
                    error.message ||
                    "Login failed. Please check your credentials.";

                return {
                    success: false,
                    error: message,
                };
            } finally {
                this.isLoading = false;
            }
        },

        /**
         * Register new user
         */
        async register(userData: any) {
            this.isLoading = true;

            try {
                const api = useApi();
                const response: any = await api.post("/register", userData);

                this.user = response.user;
                this.isAuthenticated = true;

                if (process.client) {
                    localStorage.setItem("token", response.token);
                }

                return { success: true, data: response };
            } catch (error: any) {
                console.error("Registration failed:", error);

                // Laravel validation errors are in error.data.errors
                const message =
                    error.data?.message ||
                    error.data?.errors?.email?.[0] ||
                    "Registration failed. Please try again.";

                return {
                    success: false,
                    error: message,
                    errors: error.data?.errors,
                };
            } finally {
                this.isLoading = false;
            }
        },

        /**
         * Logout user
         */
        async logout() {
            try {
                const api = useApi();
                await api.post("/logout", {});
            } catch (error) {
                console.error("Logout API call failed:", error);
                // Continue with local logout even if API fails
            } finally {
                // Always clear local state
                this.user = null;
                this.isAuthenticated = false;

                if (process.client) {
                    localStorage.removeItem("token");
                }
            }
        },

        /**
         * Fetch current user data
         */
        async fetchUser() {
            if (!process.client) return;

            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const api = useApi();
                const user: any = await api.get("/user");

                this.user = user;
                this.isAuthenticated = true;
            } catch (error: any) {
                console.error("Failed to fetch user:", error);

                // Clear invalid token
                if (error.status === 401) {
                    this.user = null;
                    this.isAuthenticated = false;
                    localStorage.removeItem("token");
                }
            }
        },

        async forgotPassword(email: string) {
            this.isLoading = true;

            try {
                const api = useApi();
                const response: any = await api.post("/forgot-password", {
                    email,
                });

                return { success: true, data: response };
            } catch (error: any) {
                console.error("Forgot password failed:", error);

                const message =
                    error.data?.message ||
                    error.message ||
                    "Failed to send password reset email.";

                return {
                    success: false,
                    error: message,
                };
            } finally {
                this.isLoading = false;
            }
        },
    },
});
