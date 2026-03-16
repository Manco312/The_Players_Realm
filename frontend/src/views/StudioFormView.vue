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

// Selectors
const countryOptions = computed(() => {
  return COUNTRIES.map((country) => ({
    value: country,
    label: country,
  }));
});

// Functions
function handleSubmit(): void {
  if (!form.value.name.trim() || !form.value.country) {
    return;
  }

  isSubmitting.value = true;

  if (isEditMode.value && studioId.value) {
    StudioService.updateStudio(studioId.value, form.value);
  } else {
    StudioService.createStudio(form.value);
  }

  isSubmitting.value = false;
  router.push('/studios');
}

function handleCancel(): void {
  router.push('/studios');
}

// Lifecycle
onMounted(() => {
  if (isEditMode.value && studioId.value) {
    const studio = StudioService.getStudioById(studioId.value);
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
  <div class="mx-auto max-w-3xl">
    <div class="rounded-lg border border-[#F2F3D9]/20 bg-[#151E3F] p-6 shadow-lg">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-[#F2F3D9]">Studio Form</h1>
        <p class="text-sm text-[#F2F3D9]/60">
          Form for creation/editing videogame studios for the Realm!
        </p>
      </div>

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
            class="rounded-md border border-[#F2F3D9] px-6 py-2 font-medium text-[#F2F3D9] transition hover:bg-[#F2F3D9]/10"
            @click="handleCancel"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="isSubmitting || !form.name.trim() || !form.country"
            class="rounded-md bg-[#C16E70] px-6 py-2 font-medium text-[#F2F3D9] transition hover:bg-[#A85A5C] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save Information
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
