<template>
    <div class="py-8">
        <div class="flex justify-between items-center mb-8">
            <div>
                <h1 class="text-3xl font-bold text-gray-900">All Campaigns</h1>
                <p class="text-gray-600 mt-2">Support these amazing causes</p>
            </div>

            <NuxtLink
                to="/campaigns/create"
                class="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition"
            >
                Start a Campaign
            </NuxtLink>
        </div>

        <!-- Loading State -->
        <div v-if="campaignStore.loading" class="text-center py-12">
            <campaignsLoading />
        </div>

        <!-- Empty State -->
        <div
            v-else-if="campaignStore.campaigns.length === 0"
            class="text-center py-12"
        >
            <campaignsNoCampaignText />
        </div>

        <!-- Campaigns Grid -->
        <div
            v-else
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            <div
                v-for="campaign in campaignStore.campaigns"
                :key="campaign.id"
                class="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition"
            >
                <campaignsCard :campaign="campaign" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCampaignStore } from "~/stores/campaign";

const campaignStore = useCampaignStore();

// Fetch campaigns when page loads
onMounted(() => {
    campaignStore.fetchCampaigns();
});
</script>
