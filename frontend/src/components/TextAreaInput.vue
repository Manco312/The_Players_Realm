<!-- Made by: Santiago Manco -->
<script setup lang="ts">
// Props
defineProps<{
  label: string;
  placeholder?: string;
  rows?: number;
}>();

// Model
const model = defineModel<string>({ default: '' });
</script>

<template>
  <div class="flex flex-col gap-1">
    <label class="text-sm font-medium text-[#F2F3D9]">{{ label }}</label>
    <textarea
      v-model="model"
      :placeholder="placeholder || ''"
      :rows="rows || 3"
      class="w-full resize-y rounded-md border border-[#151E3F] bg-[#F2F3D9] px-4 py-2 text-sm text-[#030027] focus:outline-none focus:ring-2 focus:ring-[#5CE1E6]"
    />
  </div>
</template>
