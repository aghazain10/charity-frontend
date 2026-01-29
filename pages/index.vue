<template>
    <div class="py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Hero Section -->
            <div class="text-center mb-12">
                <h1 class="text-4xl font-bold text-gray-900 mb-4">
                    Welcome to Charity Platform
                </h1>
                <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                    A simple platform for creating and supporting charity
                    campaigns. Help make a difference in people's lives.
                </p>

                <div class="space-x-4">
                    <NuxtLink
                        to="/campaigns"
                        class="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        Browse Campaigns
                    </NuxtLink>
                    <NuxtLink
                        to="/campaigns/create"
                        class="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition"
                    >
                        Start a Campaign
                    </NuxtLink>
                </div>
            </div>

            <!-- All Campaigns -->
            <div class="mt-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-6">
                    All Campaigns
                </h2>

                <div v-if="campaignStore.loading" class="text-center py-8">
                    <campaignsLoading />
                </div>

                <div
                    v-else-if="campaignStore.campaigns.length === 0"
                    class="text-center py-8"
                >
                    <campaignsNoCampaignText />
                </div>

                <div
                    v-else
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <div
                        v-for="campaign in campaignStore.campaigns"
                        :key="campaign.id"
                        class="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition"
                    >
                        <campaignsCard :campaign="campaign" />
                    </div>
                </div>
            </div>

            <!-- Featured Campaigns -->
        </div>
    </div>
</template>

<script setup>
import { useCampaignStore } from "~/stores/campaign";

const campaignStore = useCampaignStore();

// Fetch featured campaigns when page loads
onMounted(() => {
    campaignStore.fetchCampaigns();
});
</script>
