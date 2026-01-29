<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <FormContainer title="Login" @submit="handleLogin">
            <FormInput
                v-model="email"
                type="email"
                label="Email"
                placeholder="you@example.com"
                required
            />

            <FormInput
                v-model="password"
                type="password"
                label="Password"
                placeholder="••••••••"
                required
            />

            <div v-if="error" class="text-red-600 text-center mt-2 mb-2">
                {{ error }}
            </div>

            <FormButton
                type="submit"
                :loading="authStore.isLoading"
                :text="authStore.isLoading ? 'Logging in...' : 'Login'"
                loading-text="Logging in..."
            />

            <template #footer>
                <div class="flex justify-between items-center mt-4">
                    <div class="text-center">
                        <NuxtLink
                            to="/auth/register"
                            class="text-blue-600 hover:text-blue-500"
                        >
                            Create an account
                        </NuxtLink>
                    </div>
                    <div>
                        <NuxtLink
                            to="/auth/forgot-password"
                            class="text-blue-600 hover:text-blue-500"
                        >
                            Forgot your password?
                        </NuxtLink>
                    </div>
                </div>
            </template>
        </FormContainer>
    </div>
</template>

<script setup>
// Use ref for reactive data
import { ref } from "vue";

const email = ref("");
const password = ref("");
const error = ref("");

import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore();

const handleLogin = async () => {
    const result = await authStore.login({
        email: email.value,
        password: password.value,
    });

    if (result.success) {
        // Redirect to dashboard
        navigateTo("/");
    } else {
        // Show error to user
        error.value = result.error;
    }
};
</script>
