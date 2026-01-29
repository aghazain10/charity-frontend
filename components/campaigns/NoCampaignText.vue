<template>
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
    <h3 class="text-xl font-semibold text-gray-900 mb-2">No campaigns yet</h3>
    <p class="text-gray-600 mb-6">Be the first to create a campaign!</p>
    <NuxtLink
        to="/campaigns/create"
        class="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
    >
        Create First Campaign
    </NuxtLink>
</template>
