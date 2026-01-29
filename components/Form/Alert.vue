<template>
    <div v-if="show" :class="['p-4 rounded-md mb-4', variantClasses[variant]]">
        <div class="flex">
            <div class="ml-3">
                <h3 v-if="title" class="text-sm font-medium">
                    {{ title }}
                </h3>
                <div class="text-sm mt-1">
                    <slot>
                        {{ message }}
                    </slot>
                </div>
            </div>
            <div class="ml-auto pl-3">
                <button
                    v-if="dismissible"
                    @click="$emit('dismiss')"
                    class="inline-flex rounded-md focus:outline-none"
                >
                    <span class="sr-only">Dismiss</span>
                    <svg
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineAsyncComponent } from "vue";

defineProps({
    show: {
        type: Boolean,
        default: true,
    },
    variant: {
        type: String,
        default: "danger",
        validator: (value) =>
            ["danger", "success", "warning", "info"].includes(value),
    },
    title: String,
    message: String,
    dismissible: {
        type: Boolean,
        default: false,
    },
});

defineEmits(["dismiss"]);

const variantClasses = {
    danger: "bg-red-50 text-red-800 border border-red-200",
    success: "bg-green-50 text-green-800 border border-green-200",
    warning: "bg-yellow-50 text-yellow-800 border border-yellow-200",
    info: "bg-blue-50 text-blue-800 border border-blue-200",
};

defineAsyncComponent({
    loader: () => import("./Alert.vue"),
    loadingComponent: {
        template: '<div class="p-4 text-center text-gray-500">Loading...</div>',
    },
    delay: 200, // milliseconds
});
</script>
