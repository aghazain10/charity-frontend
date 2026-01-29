<template>
    <div class="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-md">
        <div v-if="title" class="text-center mb-6">
            <h2 class="text-2xl font-bold text-gray-900">{{ title }}</h2>
            <p v-if="subtitle" class="text-gray-600 mt-2">{{ subtitle }}</p>
        </div>
        <form @submit.prevent="$emit('submit')" class="space-y-4">
            <slot />
        </form>
        <div v-if="$slots.footer" class="mt-6 text-center">
            <slot name="footer" />
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    subtitle: String,
});

defineEmits(["submit"]);
</script>
