<!-- Made by: Luciana Hoyos -->
<script setup lang="ts">
// External Imports
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Internal Imports
import SelectInput from '@/components/SelectInput.vue';
import TextInput from '@/components/TextInput.vue';
import { COUNTRIES } from '@/constants/countries';
import type { CreateStudioDTO } from '@/dtos/CreateStudioDTO';
import { StudioService } from '@/services/StudioService';

// Variables
const route = useRoute();
const router = useRouter();

const isEditMode = computed(() => !!route.params.id);
const studioId = computed(() => (route.params.id ? Number(route.params.id) : null));

const form = ref<CreateStudioDTO>({
  name: '',
  country: '',
  foundedYear: new Date().getFullYear(),
});

const isSubmitting = ref(false);

const countryOptions = computed(() => {
  return COUNTRIES.map((country) => ({
    value: country,
    label: country,
  }));
});

// Functions
async function handleSubmit(): Promise<void> {
  if (!form.value.name.trim() || !form.value.country) {
    return;
  }

  isSubmitting.value = true;
  try {
    if (isEditMode.value && studioId.value) {
      await StudioService.updateStudio(studioId.value, form.value);
    } else {
      await StudioService.createStudio(form.value);
    }
    router.push('/studios');
  } finally {
    isSubmitting.value = false;
  }
}

function handleCancel(): void {
  router.push('/studios');
}

// Lifecycle
onMounted(async () => {
  if (isEditMode.value && studioId.value) {
    const studio = await StudioService.getStudioById(studioId.value);
    if (studio) {
      form.value = {
        name: studio.name,
        country: studio.country,
        foundedYear: studio.foundedYear,
      };
    }
  }
});
</script>

<template>
  <!-- Admin area: distinct full-page red/crimson theme -->
  <div class="-m-6 min-h-full bg-linear-to-br from-[#1a0505] via-[#130310] to-[#0a0010] p-8">
    <div class="mx-auto max-w-3xl">

      <!-- Admin page header -->
      <div class="mb-8 flex items-start justify-between">
        <div class="flex items-center gap-4">
          <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-red-900/40 ring-2 ring-red-700/60">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <p class="mb-0.5 text-xs font-bold uppercase tracking-widest text-red-500">Panel de administración</p>
            <h1 class="text-3xl font-bold text-white">Studio Form</h1>
            <p class="mt-1 text-sm text-white/40">Creation / editing of videogame studios</p>
          </div>
        </div>
        <span class="rounded-full border border-red-700/50 bg-red-950/60 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-red-400">
          Admin Only
        </span>
      </div>

      <!-- Divider -->
      <div class="mb-8 h-px bg-linear-to-r from-red-800/60 via-red-600/30 to-transparent"></div>

      <!-- Form card -->
      <div class="overflow-hidden rounded-xl border border-red-900/40 bg-[#1a0808]/80 shadow-2xl shadow-red-950/50 backdrop-blur-sm">
        <div class="h-0.5 bg-linear-to-r from-red-700 via-red-500 to-transparent"></div>
        <div class="p-8">
          <form class="space-y-6" @submit.prevent="handleSubmit">
            <TextInput v-model="form.name" label="Name" placeholder="Enter studio name" />

            <SelectInput
              v-model="form.country"
              label="Country"
              :options="countryOptions"
              placeholder="Select country"
            />

            <TextInput
              v-model="form.foundedYear"
              label="Founded Year"
              type="number"
              placeholder="Enter founded year"
            />

            <div class="flex items-center justify-center gap-4 pt-4">
              <button
                type="button"
                class="rounded-md border border-white/20 px-6 py-2 font-medium text-white/70 transition hover:border-white/40 hover:text-white"
                @click="handleCancel"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="isSubmitting || !form.name.trim() || !form.country"
                class="rounded-md bg-red-700 px-6 py-2 font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Save Information
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>
