<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <FormContainer
            title="Forgot Password"
            subtitle="Enter your email to receive a reset link"
            @submit="sendResetLink"
        >
            <FormInput
                v-model="email"
                type="email"
                label="Email Address"
                placeholder="you@example.com"
                required
                :error="errors.email"
            />

            <div
                v-if="successMessage"
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
                text="Send Reset Link"
                :loading="loading"
                loading-text="Sending..."
            />

            <template #footer>
                <div class="text-center space-y-2">
                    <p class="text-gray-600 text-sm">
                        Remember your password?
                        <NuxtLink
                            to="/auth/login"
                            class="text-blue-600 hover:text-blue-500"
                        >
                            Log in here
                        </NuxtLink>
                    </p>
                </div>
            </template>
        </FormContainer>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useApi } from "~/composables/useApi";
import FormContainer from "~/components/Form/Container.vue";
import FormInput from "~/components/Form/Input.vue";
import FormButton from "~/components/Form/Button.vue";

const email = ref("");
const loading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");
const errors = ref({});

const api = useApi();

const sendResetLink = async () => {
    loading.value = true;
    errors.value = {};
    errorMessage.value = "";
    successMessage.value = "";

    try {
        const response = await api.post("/password/forgot", {
            email: email.value,
        });

        successMessage.value = "Password reset link sent! Check your email.";
        email.value = "";
    } catch (error) {
        if (error.data?.errors) {
            errors.value = error.data.errors;
        } else if (error.data?.message) {
            errorMessage.value = error.data.message;
        } else {
            errorMessage.value = "Failed to send reset link. Please try again.";
        }
    } finally {
        loading.value = false;
    }
};
</script>
