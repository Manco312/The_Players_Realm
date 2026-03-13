<!-- Made by: Juan Pablo -->
<script setup lang="ts">
// External Imports
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

// Internal Imports
import DoughnutChart from '@/components/DoughnutChart.vue';
import SelectInput from '@/components/SelectInput.vue';
import StatCard from '@/components/StatCard.vue';
import { StudioService } from '@/services/StudioService';
import { useAuthStore } from '@/stores/authstore';

// Variables
const router = useRouter();
const authStore = useAuthStore();
const countryFilter = ref('');

// Selectors
const isAdmin = computed(() => authStore.currentUser?.role === 'Admin');

const studios = computed(() => {
  let list = StudioService.getStudios();

  if (countryFilter.value) {
    list = list.filter((studio) => studio.country === countryFilter.value);
  }

  return list;
});

const countryOptions = computed(() =>
  StudioService.getUniqueCountries().map((country) => ({
    value: country,
    label: country,
  })),
);

const studiosByCountryChartData = computed(() => StudioService.getStudiosByCountry());

const totalStudios = computed(() => StudioService.getTotalStudios());

// Functions
function handleDelete(id: number): void {
  if (confirm('Are you sure you want to delete this studio?')) {
    StudioService.deleteStudio(id);
  }
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Title -->
    <h1 class="text-center text-3xl font-bold text-[#F2F3D9]">Studios List</h1>

    <!-- Header Section -->
    <div class="flex flex-wrap items-start justify-between gap-6">
      <!-- Chart -->
      <div class="w-64">
        <DoughnutChart :chartData="studiosByCountryChartData" title="By Country" />
      </div>

      <!-- Stats -->
      <div class="flex flex-col items-end gap-4">
        <StatCard :value="totalStudios" label="Registered studios" />
        <button
          class="rounded-md bg-[#C16E70] px-4 py-2 font-semibold text-[#F2F3D9] transition hover:bg-[#A85558]"
          @click="router.push('/home')"
        >
          Check our Studios Map
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex gap-4">
      <div class="w-40">
        <SelectInput
          v-model="countryFilter"
          label="Country"
          :options="countryOptions"
          placeholder="All"
        />
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-hidden rounded-lg border border-[#151E3F]">
      <table class="w-full">
        <thead>
          <tr class="border-b border-[#151E3F] bg-[#151E3F]">
            <th class="px-4 py-3 text-left text-sm font-semibold text-[#F2F3D9]">NAME</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-[#F2F3D9]">COUNTRY</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-[#F2F3D9]">FOUNDED YEAR</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-[#F2F3D9]">OPTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="studio in studios"
            :key="studio.id"
            class="border-b border-[#151E3F] bg-[#030027] transition hover:bg-[#151E3F]/50"
          >
            <td class="px-4 py-3 text-sm text-[#F2F3D9]">{{ studio.name }}</td>
            <td class="px-4 py-3 text-sm text-[#F2F3D9]">{{ studio.country }}</td>
            <td class="px-4 py-3 text-sm text-[#F2F3D9]">{{ studio.foundedYear }}</td>
            <td class="px-4 py-3">
              <div class="flex items-center justify-center gap-2">
                <!-- Delete Button (Admin only) -->
                <button
                  v-if="isAdmin"
                  class="rounded p-1 text-[#C16E70] transition hover:bg-[#C16E70]/20"
                  title="Delete"
                  @click="handleDelete(studio.id)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>

                <!-- Edit Button (Admin only) -->
                <button
                  v-if="isAdmin"
                  class="rounded p-1 text-[#5CE1E6] transition hover:bg-[#5CE1E6]/20"
                  title="Edit"
                  @click="router.push(`/studios/edit/${studio.id}`)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>

          <!-- Empty state -->
          <tr v-if="studios.length === 0">
            <td colspan="4" class="px-4 py-8 text-center text-[#F2F3D9]/60">No studios found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
