import { defineStore } from "pinia";

// Define interfaces for your API response
interface ApiResponse<T> {
    donations: never[];
    success: boolean;
    data: T;
    message?: string;
}

interface Campaign {
    id: string | number;
    title: string;
    description: string;
    // Add other properties as needed
}
export const useCampaignStore = defineStore("campaign", {
    state: () => ({
        campaigns: [] as Campaign[],
        featuredCampaigns: [] as Campaign[],
        currentCampaign: null as Campaign | null,
        loading: false,
        donations: [] as any[],
    }),

    actions: {
        /**
         * Fetch all campaigns (public)
         */
        async fetchCampaigns() {
            this.loading = true;
            try {
                const api = useApi();
                const response = (await api.get(
                    "/public/campaigns"
                )) as ApiResponse<Campaign[]>;

                this.campaigns = response.data || [];
                console.log("Fetched campaigns:", this.campaigns);
                console.log("Fetched campaigns length:", this.campaigns.length);
            } catch (error) {
                console.error("Failed to fetch campaigns:", error);
            } finally {
                this.loading = false;
            }
        },

        /**
         * Fetch featured campaigns
         */
        // async fetchFeaturedCampaigns() {
        //     try {
        //         const api = useApi();
        //         const campaigns = (await api.get("/public/campaigns")) as any[];
        //         this.featuredCampaigns = campaigns; // First 3 as featured
        //     } catch (error) {
        //         console.error("Failed to fetch featured campaigns:", error);
        //     }
        // },

        /**
         * Fetch single campaign
         */
        async fetchCampaign(id: string | number) {
            this.loading = true;
            try {
                const api = useApi();
                const response = (await api.get(
                    `/public/campaigns/${id}`
                )) as ApiResponse<Campaign>;
                this.currentCampaign = response.data || null;
                const donations = (await api.get(
                    `/campaigns/${id}/donations`
                )) as ApiResponse<any[]>;
                this.donations = donations.donations || [];
            } catch (error) {
                console.error("Failed to fetch campaign:", error);
            } finally {
                this.loading = false;
            }
        },
        /**
         * Create new campaign
         */
        async createCampaign(campaignData: any) {
            this.loading = true;
            try {
                const api = useApi();
                const response = await api.post("/campaigns", campaignData);
                return { success: true, data: response };
            } catch (error: any) {
                console.error("Failed to create campaign:", error);

                let message = "Failed to create campaign";
                if (error.data?.message) {
                    message = error.data.message;
                }

                return { success: false, error: message };
            } finally {
                this.loading = false;
            }
        },
    },
});
