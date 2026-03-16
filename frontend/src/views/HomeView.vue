<script setup lang="ts">
// Made by: Santiago Manco

// External Imports
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

// Internal Imports
import AdminList from '@/components/AdminList.vue';
import BarChart from '@/components/BarChart.vue';
import DoughnutChart from '@/components/DoughnutChart.vue';
import StatCard from '@/components/StatCard.vue';
import { ReviewService } from '@/services/ReviewService';
import { StudioService } from '@/services/StudioService';
import { UserService } from '@/services/UserService';
import { VideogameService } from '@/services/VideogameService';

// Selectors
const salesChartData = computed(() => VideogameService.getSalesByGame());

const genreChartData = computed(() => VideogameService.getVideogamesByGenre());

const studioCountryChartData = computed(() => StudioService.getStudiosByCountry());

const ratingChartData = computed(() => ReviewService.getRatingDistribution());

const releaseYearChartData = computed(() => VideogameService.getGamesByReleaseYear());

const totalReviews = computed(() => ReviewService.getTotalReviews());

const totalUsers = computed(() => UserService.getTotalUsers());

const adminUsers = computed(() => UserService.getAdminUsers());
</script>

<template>
  <div class="min-h-full">
    <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      <div class="h-48">
        <BarChart :chart-data="salesChartData" title="Top Games by Sales" />
      </div>
      <div class="h-48">
        <BarChart :chart-data="ratingChartData" title="Rating Distribution" />
      </div>
      <div class="h-48">
        <BarChart :chart-data="releaseYearChartData" title="Games by Release Year" />
      </div>
    </div>

    <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      <div class="h-56">
        <DoughnutChart :chart-data="genreChartData" title="Games by Genre" />
      </div>

      <StatCard :value="totalReviews" label="Reviews in the Realm" icon="clock" />

      <div class="flex items-center justify-center">
        <AdminList :admins="adminUsers" />
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div class="h-56">
        <DoughnutChart :chart-data="studioCountryChartData" title="Studios by Country" />
      </div>

      <StatCard :value="totalUsers" label="Users in the Realm" icon="users" />

      <div class="flex flex-col items-center justify-center gap-3">
        <RouterLink
          to="/studios/map"
          class="w-48 rounded-md bg-[#DC9E82] px-4 py-2 text-center text-sm font-semibold text-[#030027] transition hover:bg-[#C16E70]"
        >
          Check our Studios Map
        </RouterLink>
        <RouterLink
          to="/videogames"
          class="w-48 rounded-md bg-[#DC9E82] px-4 py-2 text-center text-sm font-semibold text-[#030027] transition hover:bg-[#C16E70]"
        >
          Videogame List
        </RouterLink>
        <RouterLink
          to="/studios"
          class="w-48 rounded-md bg-[#DC9E82] px-4 py-2 text-center text-sm font-semibold text-[#030027] transition hover:bg-[#C16E70]"
        >
          Studios List
        </RouterLink>
      </div>
    </div>
  </div>
</template>
