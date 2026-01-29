<template>
    <!-- This is where your pages will be rendered -->
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup>
// Import the auth store
import { useAuthStore } from "~/stores/auth";

// Initialize store
const authStore = useAuthStore();

// Initialize auth when app starts (client-side only)
onMounted(() => {
    authStore.init();
});
</script>
