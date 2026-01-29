<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <FormContainer title="Register" @submit="register">
            <FormInput
                v-model="name"
                label="Name"
                placeholder="Your Name"
                required
            />

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

            <FormInput
                v-model="password_confirmation"
                type="password"
                label="Confirm Password"
                placeholder="••••••••"
                required
            />

            <div v-if="error" class="text-red-600 text-center mt-2 mb-2">
                {{ error }}
            </div>

            <FormButton
                type="submit"
                :loading="authStore.isLoading"
                :text="authStore.isLoading ? 'Registering...' : 'Register'"
                loading-text="Registering..."
            />

            <template #footer>
                <div class="text-center">
                    <NuxtLink
                        to="/auth/login"
                        class="text-blue-600 hover:text-blue-500"
                    >
                        Already have an account? Login
                    </NuxtLink>
                </div>
            </template>
        </FormContainer>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth";
import FormContainer from "~/components/Form/Container.vue";
import FormInput from "~/components/Form/Input.vue";
import FormButton from "~/components/Form/Button.vue";

const name = ref("");
const email = ref("");
const password = ref("");
const password_confirmation = ref("");
const error = ref("");

const authStore = useAuthStore();

const register = async () => {
    const result = await authStore.register({
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
    });

    if (result.success) {
        navigateTo("/");
    } else {
        error.value = result.error || "Registration failed. Please try again.";
        console.error("Registration failed:", result.error);
    }
};
</script>
