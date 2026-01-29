<template>
    <div class="py-8" v-if="campaign">
        <!-- Back Button -->
        <div class="mb-6">
            <NuxtLink
                to="/campaigns"
                class="text-blue-600 hover:text-blue-800 flex items-center"
            >
                <BackIcon />
                Back to Campaigns
            </NuxtLink>
        </div>

        <!-- Campaign Header -->
        <div class="bg-white rounded-lg shadow overflow-hidden mb-8">
            <div class="md:flex">
                <!-- Campaign Image -->
                <div class="md:w-1/2">
                    <div
                        class="h-64 md:h-full bg-gray-200 flex items-center justify-center"
                    >
                        <span
                            v-if="!campaign.featured_image"
                            class="text-gray-400 text-lg"
                        >
                            No image available
                        </span>
                        <img
                            v-else
                            :src="campaign.featured_image"
                            :alt="campaign.title"
                            class="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <!-- Campaign Info -->
                <div class="md:w-1/2 p-8">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h1 class="text-3xl font-bold text-gray-900 mb-2">
                                {{ campaign.title }}
                            </h1>
                            <p class="text-gray-600">
                                By {{ campaign.user?.name || "Anonymous" }}
                            </p>
                        </div>
                        <span
                            v-if="campaign.is_featured"
                            class="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                        >
                            Featured
                        </span>
                    </div>

                    <!-- Progress Bar -->
                    <div class="mb-6">
                        <div class="flex justify-between text-lg mb-2">
                            <span class="font-bold text-gray-900">
                                ${{ campaign.current_amount }} raised
                            </span>
                            <span class="text-gray-600">
                                of ${{ campaign.target_amount }} goal
                            </span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-4">
                            <div
                                class="bg-green-600 h-4 rounded-full transition-all duration-500"
                                :style="{
                                    width: `${Math.min(
                                        (campaign.current_amount /
                                            campaign.target_amount) *
                                            100,
                                        100
                                    )}%`,
                                }"
                            ></div>
                        </div>
                        <div class="text-right text-gray-500 mt-2">
                            {{
                                Math.round(
                                    (campaign.current_amount /
                                        campaign.target_amount) *
                                        100
                                )
                            }}% funded
                        </div>
                    </div>

                    <!-- Campaign Stats -->
                    <div class="grid grid-cols-3 gap-4 mb-6">
                        <div class="text-center">
                            <div class="text-2xl font-bold text-blue-600">
                                {{ donationCount }}
                            </div>
                            <div class="text-gray-600 text-sm">Donations</div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl font-bold text-blue-600">
                                {{ daysLeft(campaign.deadline) }}
                            </div>
                            <div class="text-gray-600 text-sm">Days left</div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl font-bold text-blue-600">
                                ${{
                                    campaign.target_amount -
                                        campaign.current_amount >
                                    0
                                        ? campaign.target_amount -
                                          campaign.current_amount
                                        : 0
                                }}
                            </div>
                            <div class="text-gray-600 text-sm">
                                Still needed
                            </div>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="space-y-3">
                        <button
                            @click="showDonationModal = true"
                            class="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition text-lg"
                        >
                            Donate Now
                        </button>
                        <button
                            @click="shareCampaign"
                            class="w-full bg-blue-100 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-200 transition"
                        >
                            Share this Campaign
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Campaign Details & Donations -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column: Description -->
            <div class="lg:col-span-2">
                <!-- Description -->
                <div class="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 class="text-xl font-bold text-gray-900 mb-4">
                        Campaign Story
                    </h2>
                    <div class="prose max-w-none text-gray-700">
                        <p class="whitespace-pre-line">
                            {{ campaign.description }}
                        </p>
                    </div>
                </div>

                <!-- Recent Donations -->

                <div class="bg-white rounded-lg shadow p-6">
                    <h2 class="text-xl font-bold text-gray-900 mb-4">
                        Recent Donations
                    </h2>
                    <div
                        v-if="
                            campaignStore.donations &&
                            campaignStore.donations.length > 0
                        "
                    >
                        <div
                            v-for="donation in campaignStore.donations.slice(
                                0,
                                5
                            )"
                            :key="donation.id"
                            class="flex items-center py-4 border-b border-gray-100 last:border-0"
                        >
                            <div class="flex-1">
                                <p class="font-semibold">
                                    {{
                                        donation.is_anonymous
                                            ? "Anonymous"
                                            : donation.user?.name || "Anonymous"
                                    }}
                                </p>
                                <p class="text-gray-600 text-sm">
                                    {{ formatDate(donation.created_at) }}
                                </p>
                                <p
                                    v-if="donation.message"
                                    class="text-gray-700 mt-1 italic"
                                >
                                    "{{ donation.message }}"
                                </p>
                            </div>
                            <div class="text-green-600 font-bold text-lg">
                                ${{ donation.amount }}
                            </div>
                        </div>
                    </div>
                    <div
                        v-else-if="campaignStore.loading"
                        class="text-center py-8"
                    >
                        <div
                            class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"
                        ></div>
                        <p class="text-gray-500 mt-2">Loading donations...</p>
                    </div>
                    <div v-else class="text-center py-8 text-gray-500">
                        No donations yet. Be the first to contribute!
                    </div>
                </div>
            </div>

            <!-- Right Column: Donation Form -->
            <div class="lg:col-span-1">
                <div class="bg-white rounded-lg shadow p-6 sticky top-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-4">
                        Make a Donation
                    </h3>

                    <div class="space-y-4">
                        <!-- Quick Amounts -->
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Select Amount
                            </label>
                            <div class="grid grid-cols-3 gap-2">
                                <button
                                    v-for="amount in [
                                        10, 25, 50, 100, 250, 500,
                                    ]"
                                    :key="amount"
                                    @click="donationAmount = amount"
                                    :class="[
                                        'py-2 rounded border transition',
                                        donationAmount === amount
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500',
                                    ]"
                                >
                                    ${{ amount }}
                                </button>
                            </div>
                        </div>

                        <!-- Custom Amount -->
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Or enter custom amount
                            </label>
                            <div class="relative">
                                <span
                                    class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    >$</span
                                >
                                <input
                                    v-model.number="donationAmount"
                                    type="number"
                                    min="1"
                                    step="0.01"
                                    class="pl-8 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter amount"
                                />
                            </div>
                        </div>

                        <!-- Message -->
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Message (Optional)
                            </label>
                            <textarea
                                v-model="donationMessage"
                                rows="3"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Add a message of support..."
                            ></textarea>
                        </div>

                        <!-- Anonymous Option -->
                        <div class="flex items-center">
                            <input
                                v-model="isAnonymous"
                                type="checkbox"
                                id="anonymous"
                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                                for="anonymous"
                                class="ml-2 block text-sm text-gray-700"
                            >
                                Donate anonymously
                            </label>
                        </div>

                        <!-- Submit Donation -->
                        <button
                            @click="submitDonation"
                            :disabled="
                                !donationAmount ||
                                donationAmount <= 0 ||
                                processing
                            "
                            :class="[
                                'w-full py-3 rounded-lg font-semibold transition',
                                !donationAmount ||
                                donationAmount <= 0 ||
                                processing
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-green-600 text-white hover:bg-green-700',
                            ]"
                        >
                            <span v-if="processing">Processing...</span>
                            <span v-else>Donate ${{ donationAmount }}</span>
                        </button>

                        <!-- Security Note -->
                        <p class="text-xs text-gray-500 text-center mt-4">
                            Your donation is secure and protected.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Loading State -->
    <div v-else-if="campaignStore.loading" class="text-center py-20">
        <div
            class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
        ></div>
        <p class="mt-4 text-gray-600">Loading campaign details...</p>
    </div>

    <!-- Error State -->
    <div v-else class="text-center py-20">
        <div class="text-gray-400 mb-4">
            <svg
                class="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
            </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">
            Campaign not found
        </h3>
        <p class="text-gray-600 mb-6">
            The campaign you're looking for doesn't exist or has been removed.
        </p>
        <NuxtLink
            to="/campaigns"
            class="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
        >
            Browse Campaigns
        </NuxtLink>
    </div>
</template>

<script setup>
import { useCampaignStore } from "~/stores/campaign";
import { useAuthStore } from "~/stores/auth";

const route = useRoute();
const router = useRouter();
const campaignId = route.params.id;

const campaignStore = useCampaignStore();
const authStore = useAuthStore();

// Reactive data for donation form
const donationAmount = ref(25);
const donationMessage = ref("");
const isAnonymous = ref(false);
const processing = ref(false);
const showDonationModal = ref(false);

// Fetch campaign details
onMounted(() => {
    campaignStore.fetchCampaign(campaignId);
});

// Access campaign from store
const campaign = computed(() => campaignStore.currentCampaign);

// Helper functions
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

//Donation Count
const donationCount = computed(() => {
    return campaignStore.donations ? campaignStore.donations.length : 0;
});

const daysLeft = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
};

// Donation handler
const submitDonation = async () => {
    if (!authStore.isAuthenticated) {
        router.push(`/auth/login?redirect=/campaigns/${campaignId}`);
        return;
    }

    if (!donationAmount.value || donationAmount.value <= 0) {
        alert("Please enter a valid donation amount");
        return;
    }

    processing.value = true;

    try {
        const api = useApi();
        const donationData = {
            campaign_id: campaignId,
            amount: donationAmount.value,
            message: donationMessage.value,
            is_anonymous: isAnonymous.value,
        };

        await api.post("/donations", donationData);

        // Refresh campaign data
        await campaignStore.fetchCampaign(campaignId);

        // Reset form
        donationMessage.value = "";
        isAnonymous.value = false;

        alert("Thank you for your donation!");
    } catch (error) {
        console.error("Donation failed:", error);
        alert(error.data?.message || "Donation failed. Please try again.");
    } finally {
        processing.value = false;
    }
};

// Share campaign
const shareCampaign = () => {
    if (navigator.share) {
        navigator.share({
            title: campaign.value.title,
            text: campaign.value.description.substring(0, 100) + "...",
            url: window.location.href,
        });
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
    }
};
</script>
