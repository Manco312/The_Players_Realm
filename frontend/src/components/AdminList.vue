<script setup lang="ts">
// Made by: Santiago Manco

// Internal Imports
import type { UserInterface } from '@/interfaces/UserInterface';

// Props
defineProps<{
  admins: UserInterface[];
}>();

// Variables
const avatarColors = ['#5CE1E6', '#DC9E82', '#C16E70', '#151E3F', '#F2F3D9'];

// Functions
function getAvatarColor(index: number): string {
  return avatarColors[index % avatarColors.length];
}

function getInitials(username: string): string {
  return username.charAt(0).toUpperCase();
}
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="mb-3 flex -space-x-2">
      <div
        v-for="(admin, index) in admins"
        :key="admin.id"
        class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#030027] text-sm font-bold text-[#030027]"
        :style="{ backgroundColor: getAvatarColor(index) }"
        :title="admin.username"
      >
        {{ getInitials(admin.username) }}
      </div>
    </div>
    <p class="text-sm font-medium text-[#F2F3D9]">Our Admins</p>
  </div>
</template>
