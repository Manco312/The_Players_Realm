<script setup lang="ts">
// Made by: Santiago Manco

// External Imports
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

// Internal Imports
import type { ChartData } from '@/types/ChartTypes';

// Chart.js Registration
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Props
const props = defineProps<{
  chartData: ChartData;
  title?: string;
}>();

// Variables
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: !!props.title,
      text: props.title || '',
      color: '#030027',
      font: {
        size: 14,
        weight: 'bold' as const,
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#030027',
      },
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        color: '#030027',
      },
      grid: {
        color: 'rgba(3, 0, 39, 0.1)',
      },
    },
  },
};
</script>

<template>
  <div class="h-full w-full rounded-lg bg-[#F2F3D9] p-4">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
