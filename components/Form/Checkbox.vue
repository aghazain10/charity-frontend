<template>
    <div class="mb-4">
        <div class="flex items-center">
            <input
                :id="id"
                :type="type"
                :checked="modelValue"
                @change="$emit('update:modelValue', $event.target.checked)"
                :required="required"
                :disabled="disabled"
                :class="[
                    'h-4 w-4 focus:ring-blue-500 focus:ring-offset-0',
                    error
                        ? 'border-red-500 text-red-600'
                        : 'border-gray-300 text-blue-600',
                    disabled ? 'bg-gray-100 cursor-not-allowed' : '',
                ]"
            />
            <label
                v-if="label"
                :for="id"
                class="ml-2 block text-sm text-gray-700"
            >
                {{ label }}
                <span v-if="required" class="text-red-500">*</span>
            </label>
        </div>

        <p v-if="error" class="mt-1 ml-6 text-sm text-red-600">
            {{ error }}
        </p>
        <p v-if="hint" class="mt-1 ml-6 text-sm text-gray-500">
            {{ hint }}
        </p>
    </div>
</template>

<script setup>
defineProps({
    modelValue: Boolean,
    id: {
        type: String,
        default: () => `checkbox-${Math.random().toString(36).substr(2, 9)}`,
    },
    type: {
        type: String,
        default: "checkbox",
        validator: (value) => ["checkbox", "radio"].includes(value),
    },
    label: String,
    required: Boolean,
    disabled: Boolean,
    error: String,
    hint: String,
});

defineEmits(["update:modelValue"]);
</script>
