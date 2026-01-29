<template>
    <div class="max-w-2xl mx-auto p-6">
        <h1 class="text-2xl font-bold mb-6">Create New Campaign</h1>

        <form @submit.prevent="createCampaign" class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Title *
                </label>
                <input
                    v-model="form.title"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Help Feed 1000 Families"
                />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                </label>
                <textarea
                    v-model="form.description"
                    required
                    rows="4"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your campaign in detail..."
                ></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Goal Amount ($) *
                    </label>
                    <input
                        v-model="form.target_amount"
                        type="number"
                        min="0"
                        step="0.01"
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="5000"
                    />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        End Date *
                    </label>
                    <input
                        v-model="form.deadline"
                        type="date"
                        :min="minDate"
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label class="inline-flex items-center mt-2">
                        <input
                            type="checkbox"
                            v-model="form.is_featured"
                            class="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span class="ml-2 text-gray-700"
                            >Feature this campaign on homepage</span
                        >
                    </label>
                </div>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image URL (Optional)
                </label>
                <input
                    v-model="form.featured_image"
                    type="url"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                />
                <p class="text-sm text-gray-500 mt-1">
                    Provide a direct link to your campaign image
                </p>
            </div>

            <!-- Loading state -->
            <div v-if="campaignStore.loading" class="text-blue-600">
                Creating campaign...
            </div>

            <!-- Error display -->
            <div v-if="error" class="p-4 bg-red-50 text-red-700 rounded-md">
                {{ error }}
            </div>

            <!-- Validation errors -->
            <div
                v-if="validationErrors"
                class="p-4 bg-yellow-50 text-yellow-700 rounded-md"
            >
                <h3 class="font-bold mb-2">Please fix the following errors:</h3>
                <ul class="list-disc pl-5">
                    <li
                        v-for="(errors, field) in validationErrors"
                        :key="field"
                    >
                        <strong>{{ field }}:</strong> {{ errors[0] }}
                    </li>
                </ul>
            </div>

            <!-- Success message -->
            <div
                v-if="success"
                class="p-4 bg-green-50 text-green-700 rounded-md"
            >
                Campaign created successfully! Redirecting...
            </div>

            <div class="flex space-x-4">
                <button
                    type="submit"
                    :disabled="campaignStore.loading"
                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                    Create Campaign
                </button>

                <NuxtLink
                    to="/campaigns"
                    class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                    Cancel
                </NuxtLink>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCampaignStore } from "~/stores/campaign";
import { useAuthStore } from "~/stores/auth";

const campaignStore = useCampaignStore();
const authStore = useAuthStore();

const form = ref({
    title: "",
    description: "",
    target_amount: "",
    deadline: "",
    is_featured: false,
    featured_image: "",
});

const error = ref("");
const success = ref(false);
const validationErrors = ref(null);

// Calculate minimum date (tomorrow)
const minDate = computed(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
});

// Check if user is authenticated
onMounted(() => {
    if (!authStore.isAuthenticated) {
        navigateTo("/auth/login");
    }
});

const createCampaign = async () => {
    error.value = "";
    success.value = false;
    validationErrors.value = null;

    // Convert target_amount to number
    const campaignData = {
        ...form.value,
        target_amount: parseFloat(form.value.target_amount),
    };

    const result = await campaignStore.createCampaign(campaignData);

    if (result.success) {
        success.value = true;
        // Reset form
        form.value = {
            title: "",
            description: "",
            target_amount: "",
            deadline: "",
            is_featured: false,
            featured_image: "",
        };
        // Redirect to campaign page after 2 seconds
        setTimeout(() => {
            navigateTo(`/campaigns/${result.data.id}`);
        }, 2000);
    } else {
        error.value = result.error;
        validationErrors.value = result.errors;
    }
};
</script>
