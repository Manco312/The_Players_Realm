<script setup lang="ts">
// Made by: Santiago Manco

// External Imports
import { computed } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';

// Internal Imports
import { useAuthStore } from '@/stores/authstore';

// Variables
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

// Selectors
const isLandingLayout = computed(() => route.meta.layout === 'landing');
const currentUser = computed(() => authStore.currentUser);

// Functions
function handleLogout(): void {
  authStore.logout();
  router.push('/');
}
</script>

<template>
  <!-- Landing layout -->
  <div v-if="isLandingLayout" class="min-h-screen">
    <RouterView />
  </div>

  <!-- Dashboard layout -->
  <div v-else class="min-h-screen bg-[#030027]">
    <div class="flex h-screen overflow-hidden">
      <!-- Sidebar -->
      <aside class="fixed flex h-full w-52 flex-col bg-[#151E3F] text-[#F2F3D9]">
        <!-- Logo -->
        <div class="flex justify-center px-4 py-6">
          <img src="/images/logo.png" alt="The Player's Realm logo" class="h-24 w-auto" />
        </div>

        <!-- Navigation -->
        <nav class="flex-1 space-y-2 px-4">
          <RouterLink
            to="/home"
            class="block rounded-md px-4 py-3 text-lg font-semibold transition hover:bg-[#030027]/50"
            active-class="bg-[#030027]/30"
          >
            Home
          </RouterLink>

          <RouterLink
            to="/videogames"
            class="block rounded-md px-4 py-3 text-lg font-semibold transition hover:bg-[#030027]/50"
            active-class="bg-[#030027]/30"
          >
            Videogames List
          </RouterLink>

          <RouterLink
            to="/studios"
            class="block rounded-md px-4 py-3 text-lg font-semibold transition hover:bg-[#030027]/50"
            active-class="bg-[#030027]/30"
          >
            Studios List
          </RouterLink>
        </nav>

        <!-- User Section -->
        <div class="border-t border-[#030027]/30 p-4">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-full bg-[#DC9E82] text-sm font-bold text-[#030027]"
            >
              {{ currentUser?.username?.charAt(0).toUpperCase() || 'U' }}
            </div>
            <div class="flex-1">
              <p class="text-sm font-semibold">{{ currentUser?.username || 'User' }}</p>
              <p class="text-xs text-[#F2F3D9]/60">{{ currentUser?.role || 'Guest' }}</p>
            </div>
          </div>
          <button
            class="mt-3 w-full rounded-md px-3 py-2 text-left text-sm font-medium transition hover:bg-[#C16E70]/20"
            @click="handleLogout"
          >
            Log out
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="ml-52 flex flex-1 flex-col overflow-hidden">
        <main class="flex-1 overflow-y-auto p-6">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>
