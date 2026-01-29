<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <FormContainer
            :title="validToken ? 'Set New Password' : 'Invalid Link'"
            :subtitle="
                validToken
                    ? 'Enter your new password'
                    : 'This password reset link is invalid or expired'
            "
            @submit="resetPassword"
            v-if="!loading"
        >
            <template v-if="validToken">
                <FormInput
                    v-model="password"
                    type="password"
                    label="New Password"
                    placeholder="Enter new password"
                    required
                    :error="errors.password"
                />

                <FormInput
                    v-model="passwordConfirmation"
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm new password"
                    required
                    :error="errors.password_confirmation"
                />

                <div
                    v-if="success"
                    class="mt-4 p-3 bg-green-50 text-green-700 rounded-md text-sm"
                >
                    {{ successMessage }}
                </div>

                <div
                    v-if="errorMessage"
                    class="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm"
                >
                    {{ errorMessage }}
                </div>

                <FormButton
                    type="submit"
                    text="Reset Password"
                    :loading="submitting"
                    loading-text="Resetting..."
                />
            </template>

            <template v-else>
                <div class="text-center py-4">
                    <svg
                        class="mx-auto h-12 w-12 text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                    </svg>
                    <p class="mt-2 text-gray-600">
                        {{
                            errorMessage ||
                            "Please request a new password reset link."
                        }}
                    </p>
                    <button
                        @click="$router.push('/auth/forgot-password')"
                        class="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                    >
                        Request New Reset Link
                    </button>
                </div>
            </template>

            <template #footer>
                <p class="text-gray-600 text-sm text-center">
                    <NuxtLink
                        to="/auth/login"
                        class="text-blue-600 hover:text-blue-500"
                    >
                        Back to Login
                    </NuxtLink>
                </p>
            </template>
        </FormContainer>

        <div v-else class="text-center">
            <div
                class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
            ></div>
            <p class="mt-4 text-gray-600">Validating reset link...</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useApi } from "~/composables/useApi";
import FormContainer from "~/components/Form/Container.vue";
import FormInput from "~/components/Form/Input.vue";
import FormButton from "~/components/Form/Button.vue";

const route = useRoute();
const router = useRouter();
const api = useApi();

const loading = ref(true);
const validToken = ref(false);
const submitting = ref(false);
const password = ref("");
const passwordConfirmation = ref("");
const success = ref(false);
const successMessage = ref("");
const errorMessage = ref("");
const errors = ref({});

const validateToken = async () => {
    const token = route.params.token;

    if (!token) {
        errorMessage.value = "No token provided";
        validToken.value = false;
        loading.value = false;
        return;
    }

    try {
        // Optionally, you could make an API call to validate the token
        // For now, we'll just check if it exists
        validToken.value = true;
    } catch (error) {
        errorMessage.value = error.data?.message || "Invalid or expired token";
        validToken.value = false;
    } finally {
        loading.value = false;
    }
};

const resetPassword = async () => {
    if (!validToken.value) return;

    submitting.value = true;
    errors.value = {};
    errorMessage.value = "";

    try {
        const response = await api.post("/password/reset", {
            token: route.params.token,
            password: password.value,
            password_confirmation: passwordConfirmation.value,
        });

        console.log("Reset password success:", response);

        success.value = true;
        // FIX HERE: Use response.message instead of response.data.message
        successMessage.value =
            response.message || "Password reset successfully!";

        // Redirect to login after 3 seconds
        setTimeout(() => {
            router.push("/auth/login");
        }, 3000);
    } catch (error) {
        console.error("Full reset password error:", error);

        // Also fix error handling here
        if (error.data?.errors) {
            errors.value = error.data.errors;
        } else if (error.data?.message) {
            errorMessage.value = error.data.message;
        } else if (error.message) {
            errorMessage.value = error.message;
        } else {
            errorMessage.value = "Failed to reset password. Please try again.";
        }
    } finally {
        submitting.value = false;
    }
};

onMounted(() => {
    validateToken();
});
</script>
