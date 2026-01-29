<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Navigation -->
        <nav class="bg-white shadow">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <!-- Logo -->
                        <NuxtLink
                            to="/"
                            class="text-xl font-bold text-blue-600"
                        >
                            CharityApp
                        </NuxtLink>

                        <!-- Navigation Links -->
                        <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <NuxtLink
                                to="/campaigns"
                                class="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
                            >
                                Campaigns
                            </NuxtLink>
                            <NuxtLink
                                v-if="authStore.isAuthenticated"
                                to="/dashboard"
                                class="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
                            >
                                Dashboard
                            </NuxtLink>
                        </div>
                    </div>

                    <!-- Auth Buttons -->
                    <div class="flex items-center space-x-4">
                        <template v-if="authStore.isAuthenticated">
                            <div class="relative group">
                                <button
                                    class="flex items-center space-x-2 focus:outline-none"
                                >
                                    <div
                                        class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"
                                    >
                                        <span
                                            class="text-blue-600 font-semibold"
                                        >
                                            {{
                                                authStore.user?.name?.charAt(
                                                    0
                                                ) || "U"
                                            }}
                                        </span>
                                    </div>
                                    <span
                                        class="text-gray-700 hidden md:inline"
                                        >{{ authStore.user?.name }}</span
                                    >
                                </button>

                                <!-- Dropdown Menu -->
                                <div
                                    class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                                >
                                    <NuxtLink
                                        to="/auth/profile"
                                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Profile
                                    </NuxtLink>
                                    <NuxtLink
                                        to="/campaigns/create"
                                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Create Campaign
                                    </NuxtLink>
                                    <div class="border-t border-gray-100"></div>
                                    <button
                                        @click="authStore.logout()"
                                        class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <NuxtLink
                                to="/auth/login"
                                class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Login
                            </NuxtLink>
                            <NuxtLink
                                to="/auth/register"
                                class="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition"
                            >
                                Register
                            </NuxtLink>
                        </template>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Page Content -->
        <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <slot />
        </main>

        <!-- Footer -->
        <footer class="bg-white border-t mt-12">
            <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div class="text-center text-gray-500 text-sm">
                    <p>
                        Charity Platform &copy; {{ new Date().getFullYear() }}.
                        All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();

// Fetch user on component mount
onMounted(() => {
    authStore.fetchUser();
});
</script>

<style scoped></style>
