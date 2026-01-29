<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
            <div v-if="loading" class="text-center">
                <div
                    class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
                ></div>
                <p class="mt-4 text-gray-600">Confirming password change...</p>
            </div>

            <div v-else-if="success" class="text-center">
                <div
                    class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4"
                >
                    <svg
                        class="h-6 w-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                        ></path>
                    </svg>
                </div>
                <h2 class="text-xl font-bold text-gray-900 mb-2">
                    Password Changed!
                </h2>
                <p class="text-gray-600 mb-6">
                    Your password has been successfully updated.
                    {{
                        requiresLogin
                            ? "Please log in with your new password."
                            : "You can now log in with your new password."
                    }}
                </p>
                <button
                    @click="goToLogin"
                    class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Go to Login
                </button>
            </div>

            <div v-else class="text-center">
                <div
                    class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4"
                >
                    <svg
                        class="h-6 w-6 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </div>
                <h2 class="text-xl font-bold text-gray-900 mb-2">
                    Link Expired
                </h2>
                <p class="text-gray-600 mb-4">
                    {{
                        errorMessage ||
                        "This password change link has expired or is invalid."
                    }}
                </p>
                <button
                    @click="goToProfile"
                    class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Return to Profile
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useApi } from "~/composables/useApi";

const route = useRoute();
const router = useRouter();
const api = useApi();

const loading = ref(true);
const success = ref(false);
const requiresLogin = ref(false);
const errorMessage = ref("");

const confirmPasswordChange = async () => {
    const token = route.params.token;

    try {
        const response = await api.post(
            `/profile/confirm-password-change/${token}`
        );

        success.value = true;
        requiresLogin.value = response.data?.requires_login || false;
    } catch (error) {
        console.error("Password confirmation failed:", error);
        errorMessage.value =
            error.data?.message || "Failed to confirm password change";
    } finally {
        loading.value = false;
    }
};

const goToLogin = () => {
    // Clear auth token if exists
    localStorage.removeItem("auth_token");
    router.push("/auth/login");
};

const goToProfile = () => {
    router.push("/account/profile");
};

onMounted(() => {
    if (route.params.token) {
        confirmPasswordChange();
    } else {
        errorMessage.value = "No confirmation token provided";
        loading.value = false;
    }
});
</script>
