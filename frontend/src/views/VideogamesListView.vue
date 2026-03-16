<!-- Made by: Santiago Manco -->
<script setup lang="ts">
// External Imports
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

// Internal Imports
import BarChart from '@/components/BarChart.vue';
import DoughnutChart from '@/components/DoughnutChart.vue';
import SelectInput from '@/components/SelectInput.vue';
import StatCard from '@/components/StatCard.vue';
import { StudioService } from '@/services/StudioService';
import { VideogameService } from '@/services/VideogameService';
import { useAuthStore } from '@/stores/authstore';

// Variables
const router = useRouter();
const authStore = useAuthStore();
const genreFilter = ref('');
const studioFilter = ref('');

// Selectors
const isAdmin = computed(() => authStore.currentUser?.role === 'Admin');

const videogames = computed(() => {
  let games = VideogameService.getVideogames();

  if (genreFilter.value) {
    games = games.filter((game) => game.genre === genreFilter.value);
  }

  if (studioFilter.value) {
    games = games.filter((game) => game.studioId === Number(studioFilter.value));
  }

  return games;
});

const genreOptions = computed(() =>
  VideogameService.getUniqueGenres().map((genre) => ({
    value: genre,
    label: genre,
  })),
);

const studioOptions = computed(() =>
  StudioService.getStudios().map((studio) => ({
    value: String(studio.id),
    label: studio.name,
  })),
);

const salesChartData = computed(() => VideogameService.getSalesByGame());

const genreChartData = computed(() => VideogameService.getVideogamesByGenre());

const releaseYearChartData = computed(() => VideogameService.getGamesByReleaseYear());

const onlineVsOfflineChartData = computed(() => VideogameService.getOnlineVsOffline());

const totalVideogames = computed(() => VideogameService.getTotalVideogames());

// Functions
function getStudioName(studioId: number): string {
  const studio = StudioService.getStudioById(studioId);
  return studio?.name || 'Unknown';
}

function handleDelete(id: number): void {
  if (confirm('Are you sure you want to delete this videogame?')) {
    VideogameService.deleteVideogame(id);
  }
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-center text-3xl font-bold text-[#F2F3D9]">Videogames List</h1>

    <div class="flex flex-wrap items-start justify-between gap-6">
      <div class="flex flex-wrap gap-4">
        <div class="w-72">
          <BarChart :chartData="salesChartData" title="Top Sales" />
        </div>
        <div class="w-72">
          <BarChart :chartData="releaseYearChartData" title="By Release Year" />
        </div>
        <div class="w-64">
          <DoughnutChart :chartData="genreChartData" title="By Genre" />
        </div>
        <div class="w-64">
          <DoughnutChart :chartData="onlineVsOfflineChartData" title="Online vs Offline" />
        </div>
      </div>

      <div class="flex flex-col items-end gap-4">
        <StatCard :value="totalVideogames" label="Registered games" />
        <button
          v-if="isAdmin"
          class="rounded-md bg-[#5CE1E6] px-4 py-2 font-semibold text-[#030027] transition hover:bg-[#4BC8CD]"
          @click="router.push('/videogames/create')"
        >
          + Add Videogame
        </button>
      </div>
    </div>

    <div class="flex gap-4">
      <div class="w-40">
        <SelectInput
          v-model="genreFilter"
          label="Genre"
          :options="genreOptions"
          placeholder="All"
        />
      </div>
      <div class="w-40">
        <SelectInput
          v-model="studioFilter"
          label="Studio"
          :options="studioOptions"
          placeholder="All"
        />
      </div>
    </div>

    <div class="overflow-hidden rounded-lg border border-[#151E3F]">
      <table class="w-full">
        <thead>
          <tr class="border-b border-[#151E3F] bg-[#151E3F]">
            <th class="px-4 py-3 text-left text-sm font-semibold text-[#F2F3D9]">NAME</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-[#F2F3D9]">GENRE</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-[#F2F3D9]">RELEASE YEAR</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-[#F2F3D9]">ONLINE</th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-[#F2F3D9]">STUDIO'S NAME</th>
            <th class="px-4 py-3 text-center text-sm font-semibold text-[#F2F3D9]">OPTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="game in videogames"
            :key="game.id"
            class="border-b border-[#151E3F] bg-[#030027] transition hover:bg-[#151E3F]/50"
          >
            <td class="px-4 py-3 text-sm text-[#F2F3D9]">{{ game.name }}</td>
            <td class="px-4 py-3 text-sm text-[#F2F3D9]">{{ game.genre }}</td>
            <td class="px-4 py-3 text-sm text-[#F2F3D9]">{{ game.releaseYear }}</td>
            <td class="px-4 py-3 text-sm text-[#F2F3D9]">{{ game.online ? 'True' : 'False' }}</td>
            <td class="px-4 py-3 text-sm text-[#F2F3D9]">{{ getStudioName(game.studioId) }}</td>
            <td class="px-4 py-3">
              <div class="flex items-center justify-center gap-2">
                <button
                  v-if="isAdmin"
                  class="rounded p-1 text-[#C16E70] transition hover:bg-[#C16E70]/20"
                  title="Delete"
                  @click="handleDelete(game.id)"
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

                <button
                  v-if="isAdmin"
                  class="rounded p-1 text-[#5CE1E6] transition hover:bg-[#5CE1E6]/20"
                  title="Edit"
                  @click="router.push(`/videogames/edit/${game.id}`)"
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

                <button
                  class="rounded p-1 text-[#DC9E82] transition hover:bg-[#DC9E82]/20"
                  title="View Detail"
                  @click="router.push(`/videogames/${game.id}`)"
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
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="videogames.length === 0">
            <td colspan="6" class="px-4 py-8 text-center text-[#F2F3D9]/60">No videogames found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
