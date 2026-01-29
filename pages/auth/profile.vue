<template>
    <div class="min-h-screen bg-gray-50 py-8">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Header -->
            <div class="mb-8">
                <h1 class="text-2xl font-bold text-gray-900">
                    Profile Settings
                </h1>
                <p class="text-gray-600 mt-2">
                    Manage your account information
                </p>
            </div>

            <!-- Alert Messages -->
            <div
                v-if="successMessage"
                class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
            >
                <div class="flex">
                    <svg
                        class="h-5 w-5 text-green-400 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    <p class="text-sm text-green-700">{{ successMessage }}</p>
                </div>
            </div>

            <div
                v-if="errorMessage"
                class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
            >
                <div class="flex">
                    <svg
                        class="h-5 w-5 text-red-400 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    <p class="text-sm text-red-700">{{ errorMessage }}</p>
                </div>
            </div>

            <div class="bg-white shadow rounded-lg overflow-hidden">
                <!-- Tabs -->
                <div class="border-b border-gray-200">
                    <nav class="flex">
                        <button
                            @click="setActiveTab('profile')"
                            :class="[
                                'px-6 py-4 text-sm font-medium border-b-2 transition',
                                activeTab === 'profile'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                            ]"
                        >
                            Profile Information
                        </button>
                        <button
                            @click="setActiveTab('password')"
                            :class="[
                                'px-6 py-4 text-sm font-medium border-b-2 transition',
                                activeTab === 'password'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                            ]"
                        >
                            Change Password
                        </button>
                    </nav>
                </div>

                <!-- Profile Information Form -->
                <div v-if="activeTab === 'profile'" class="p-6">
                    <h2 class="text-lg font-medium text-gray-900 mb-6">
                        Update your profile
                    </h2>

                    <FormContainer @submit="updateProfile">
                        <FormInput
                            v-model="profileForm.name"
                            label="Full Name"
                            placeholder="Your Name"
                            required
                            :error="errors.name"
                        />

                        <FormInput
                            v-model="profileForm.email"
                            type="email"
                            label="Email Address"
                            placeholder="you@example.com"
                            required
                            :error="errors.email"
                        />

                        <div class="mt-6">
                            <FormButton
                                type="submit"
                                text="Save Changes"
                                :loading="loading"
                                loading-text="Saving..."
                            />
                        </div>
                    </FormContainer>
                </div>

                <!-- Change Password Form -->
                <div v-if="activeTab === 'password'" class="p-6">
                    <h2 class="text-lg font-medium text-gray-900 mb-6">
                        Change your password
                    </h2>

                    <div
                        class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
                    >
                        <div class="flex">
                            <svg
                                class="h-5 w-5 text-blue-400 mr-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <p class="text-sm text-blue-700">
                                For security, we'll send a confirmation email to
                                verify your identity before changing your
                                password.
                            </p>
                        </div>
                    </div>

                    <FormContainer @submit="initiatePasswordChange">
                        <FormInput
                            v-model="passwordForm.current_password"
                            type="password"
                            label="Current Password"
                            placeholder="Enter your current password"
                            required
                            :error="errors.current_password"
                        />

                        <FormInput
                            v-model="passwordForm.password"
                            type="password"
                            label="New Password"
                            placeholder="Enter new password"
                            required
                            :error="errors.password"
                        />

                        <FormInput
                            v-model="passwordForm.password_confirmation"
                            type="password"
                            label="Confirm New Password"
                            placeholder="Confirm new password"
                            required
                            :error="errors.password_confirmation"
                        />

                        <div class="mt-6">
                            <FormButton
                                type="submit"
                                text="Send Confirmation Email"
                                :loading="loading"
                                loading-text="Sending..."
                            />
                        </div>
                    </FormContainer>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useApi } from "~/composables/useApi";
import FormContainer from "~/components/Form/Container.vue";
import FormInput from "~/components/Form/Input.vue";
import FormButton from "~/components/Form/Button.vue";

const authStore = useAuthStore();
const api = useApi();

const activeTab = ref("profile");
const loading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");
const errors = ref({});

// Profile form
const profileForm = ref({
    name: "",
    email: "",
});

// Password form
const passwordForm = ref({
    current_password: "",
    password: "",
    password_confirmation: "",
});

// Load current user data
onMounted(() => {
    if (authStore.user) {
        profileForm.value = {
            name: authStore.user.name || "",
            email: authStore.user.email || "",
        };
    }
});

// Clear all messages
const clearMessages = () => {
    successMessage.value = "";
    errorMessage.value = "";
    errors.value = {};
};

// Set active tab
const setActiveTab = (tab) => {
    activeTab.value = tab;
    clearMessages();
};

// Update profile information
const updateProfile = async () => {
    clearMessages();
    loading.value = true;

    try {
        const response = await api.put("/profile", profileForm.value);

        // Update auth store with new user data
        if (response.data?.user) {
            authStore.setUser(response.data.user);
        }

        successMessage.value = "Profile updated successfully!";
    } catch (error) {
        console.error("Profile update failed:", error);

        // Handle Laravel validation errors
        if (error.data?.errors) {
            errors.value = error.data.errors;
        } else if (error.data?.message) {
            errorMessage.value = error.data.message;
        } else {
            errorMessage.value = "Failed to update profile. Please try again.";
        }
    } finally {
        loading.value = false;
    }
};

// Initiate password change (send confirmation email via Mailtrap)
const initiatePasswordChange = async () => {
    clearMessages();
    loading.value = true;

    try {
        // Change this line:
        const response = await api.post("/password/change", passwordForm.value);

        // Reset form on success
        passwordForm.value = {
            current_password: "",
            password: "",
            password_confirmation: "",
        };

        successMessage.value =
            "Confirmation email sent! Please check your Mailtrap inbox and click the confirmation link.";

        // Switch to profile tab to show success message
        activeTab.value = "profile";
    } catch (error) {
        console.error("Password change failed:", error);

        // Handle Laravel validation errors
        if (error.data?.errors) {
            errors.value = error.data.errors;
        } else if (error.data?.message) {
            errorMessage.value = error.data.message;
        } else {
            errorMessage.value =
                "Failed to send confirmation email. Please try again.";
        }
    } finally {
        loading.value = false;
    }
};
</script>
