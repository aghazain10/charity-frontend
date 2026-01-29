<template>
    <div class="h-56 bg-gray-200 relative">
        <div
            v-if="!campaign.featured_image"
            class="absolute inset-0 flex items-center justify-center"
        >
            <span class="text-gray-400">No image</span>
        </div>
        <img
            v-else
            :src="campaign.featured_image"
            :alt="campaign.title"
            class="w-full h-full object-cover"
        />
        <div class="absolute top-4 right-4">
            <span
                v-if="campaign.is_featured"
                class="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold"
            >
                Featured
            </span>
        </div>
    </div>

    <!-- Campaign Info -->
    <div class="p-6">
        <div class="flex justify-between items-start mb-2">
            <h3 class="text-xl font-semibold text-gray-900">
                {{ campaign.title }}
            </h3>
            <span class="text-sm text-gray-500">
                {{ formatDate(campaign.deadline) }}
            </span>
        </div>

        <p class="text-gray-600 mb-4 line-clamp-1">
            {{ campaign.description }}
        </p>

        <!-- Progress -->
        <div class="mb-6">
            <div class="flex justify-between text-sm mb-1">
                <span class="text-gray-600">
                    ${{ campaign.current_amount }} raised
                </span>
                <span class="text-gray-600">
                    ${{ campaign.target_amount }} goal
                </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                    class="bg-green-600 h-2 rounded-full transition-all duration-300"
                    :style="{
                        width: `${Math.min(
                            (campaign.current_amount / campaign.target_amount) *
                                100,
                            100
                        )}%`,
                    }"
                ></div>
            </div>
            <div class="text-right text-sm text-gray-500 mt-1">
                {{
                    Math.round(
                        (campaign.current_amount / campaign.target_amount) * 100
                    )
                }}% funded
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex space-x-3">
            <NuxtLink
                :to="`/campaigns/${campaign.id}`"
                class="flex-1 bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition"
            >
                View Details
            </NuxtLink>
            <button
                @click="donateToCampaign(campaign.id)"
                class="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
                Donate
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "CampaignCard",
    props: {
        campaign: {
            type: Object,
            required: true,
        },
    },
    methods: {
        formatDate(dateStr) {
            const options = { year: "numeric", month: "short", day: "numeric" };
            return new Date(dateStr).toLocaleDateString(undefined, options);
        },
        donateToCampaign(campaignId) {
            // Logic to handle donation action
            this.$router.push(`/campaigns/${campaignId}/#donate`);
        },
    },
};
</script>
