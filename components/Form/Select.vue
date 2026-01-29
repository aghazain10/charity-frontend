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

        <select
            :id="id"
            :value="modelValue"
            @change="$emit('update:modelValue', $event.target.value)"
            :required="required"
            :disabled="disabled"
            :class="[
                'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition',
                error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300',
                disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
            ]"
        >
            <option v-if="placeholder" value="" disabled selected>
                {{ placeholder }}
            </option>
            <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
                :disabled="option.disabled"
            >
                {{ option.label }}
            </option>
        </select>

        <p v-if="error" class="mt-1 text-sm text-red-600">
            {{ error }}
        </p>
        <p v-if="hint" class="mt-1 text-sm text-gray-500">
            {{ hint }}
        </p>
    </div>
</template>

<script setup>
defineProps({
    modelValue: [String, Number],
    id: {
        type: String,
        default: () => `select-${Math.random().toString(36).substr(2, 9)}`,
    },
    label: String,
    placeholder: String,
    required: Boolean,
    disabled: Boolean,
    error: String,
    hint: String,
    options: {
        type: Array,
        default: () => [],
        validator: (options) =>
            options.every(
                (opt) => opt.value !== undefined && opt.label !== undefined
            ),
    },
});

defineEmits(["update:modelValue"]);
</script>
