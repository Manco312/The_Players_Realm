<script setup lang="ts">
// Made by: Santiago Manco

// External Imports
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Internal Imports
import type { ChartData } from '@/services/DashboardStatsService';

// Chart.js Registration
ChartJS.register(Title, Tooltip, Legend, ArcElement);

// Props
defineProps<{
  chartData: ChartData;
  title?: string;
}>();

// Variables
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'left' as const,
      labels: {
        color: '#030027',
        font: {
          size: 11,
        },
        padding: 8,
      },
    },
    title: {
      display: false,
    },
  },
};
</script>

<template>
  <div class="h-full w-full rounded-lg bg-[#F2F3D9] p-4">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>
