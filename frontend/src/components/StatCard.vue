<script setup lang="ts">
// Made by: Santiago Manco

// Props
defineProps<{
  value: number | string;
  label: string;
  icon?: 'clock' | 'users';
}>();
</script>

<template>
  <div
    class="flex flex-col items-center justify-center rounded-lg bg-[#F2F3D9] p-6 text-center shadow-sm"
  >
    <svg
      v-if="icon === 'clock'"
      xmlns="http://www.w3.org/2000/svg"
      class="mb-2 h-10 w-10 text-[#030027]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>

    <svg
      v-if="icon === 'users'"
      xmlns="http://www.w3.org/2000/svg"
      class="mb-2 h-10 w-10 text-[#030027]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>

    <div class="text-3xl font-bold text-[#030027]">{{ value }}</div>
    <div class="mt-1 text-sm text-[#030027]/70">{{ label }}</div>
  </div>
</template>
