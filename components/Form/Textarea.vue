<template>
    <div class="mb-4">
        <label
            v-if="label"
            :for="id"
            class="block text-sm font-medium text-gray-700 mb-2"
        >
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>

        <textarea
            :id="id"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :placeholder="placeholder"
            :required="required"
            :disabled="disabled"
            :rows="rows"
            :class="[
                'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition',
                error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300',
                disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
            ]"
        ></textarea>

        <p v-if="error" class="mt-1 text-sm text-red-600">
            {{ error }}
        </p>
        <div v-if="maxLength" class="flex justify-between mt-1">
            <p v-if="hint" class="text-sm text-gray-500">
                {{ hint }}
            </p>
            <p class="text-sm text-gray-500">
                {{ modelValue?.length || 0 }}/{{ maxLength }}
            </p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    modelValue: String,
    id: {
        type: String,
        default: () => `textarea-${Math.random().toString(36).substr(2, 9)}`,
    },
    label: String,
    placeholder: String,
    required: Boolean,
    disabled: Boolean,
    error: String,
    hint: String,
    rows: {
        type: Number,
        default: 4,
    },
    maxLength: Number,
});

defineEmits(["update:modelValue"]);
</script>
