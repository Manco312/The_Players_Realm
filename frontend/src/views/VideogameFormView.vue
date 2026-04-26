<!-- Made by: Santiago Manco -->
<script setup lang="ts">
// External Imports
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Internal Imports
import SelectInput from '@/components/SelectInput.vue';
import TextAreaInput from '@/components/TextAreaInput.vue';
import TextInput from '@/components/TextInput.vue';
import type { CreateVideogameDTO } from '@/dtos/CreateVideogameDTO';
import { StudioService } from '@/services/StudioService';
import { VideogameService } from '@/services/VideogameService';
import type { StudioInterface } from '@/interfaces/StudioInterface';
import type { VideogameInterface } from '@/interfaces/VideogameInterface';

// Variables
const route = useRoute();
const router = useRouter();

const isEditMode = computed(() => !!route.params.id);
const videogameId = computed(() => (route.params.id ? Number(route.params.id) : null));

const form = ref<CreateVideogameDTO>({
  name: '',
  genre: '',
  description: '',
  online: false,
  price: 0,
  imageUrl: '',
  totalSales: 0,
  releaseYear: new Date().getFullYear(),
  director: '',
  studioId: 0,
});

const isSubmitting = ref(false);
const imagePreview = ref<string | null>(null);

const studios = ref<StudioInterface[]>([]);
const videogames = ref<VideogameInterface[]>([]);

const studioOptions = computed(() =>
  studios.value.map((studio) => ({
    value: String(studio.id),
    label: studio.name,
  })),
);

const genreOptions = computed(() =>
  VideogameService.getUniqueGenres(videogames.value).map((genre) => ({
    value: genre,
    label: genre,
  })),
);

const onlineOptions = [
  { value: 'true', label: 'True' },
  { value: 'false', label: 'False' },
];

// Computed for v-model bindings
const selectedStudio = computed({
  get: () => String(form.value.studioId || ''),
  set: (val: string) => {
    form.value.studioId = Number(val) || 0;
  },
});

const selectedOnline = computed({
  get: () => String(form.value.online),
  set: (val: string) => {
    form.value.online = val === 'true';
  },
});

// Functions
function handleImageUpload(event: Event): void {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target?.result as string;
      form.value.imageUrl = base64String;
      imagePreview.value = base64String;

      // Save to localStorage
      const storedImages = JSON.parse(localStorage.getItem('videogame_images') || '{}');
      const imageKey = `videogame_${Date.now()}`;
      storedImages[imageKey] = base64String;
      localStorage.setItem('videogame_images', JSON.stringify(storedImages));
    };
    reader.readAsDataURL(file);
  }
}

async function handleSubmit(): Promise<void> {
  if (!form.value.name.trim() || !form.value.genre || !form.value.studioId) {
    return;
  }

  isSubmitting.value = true;
  try {
    if (isEditMode.value && videogameId.value) {
      await VideogameService.updateVideogame(videogameId.value, form.value);
    } else {
      await VideogameService.createVideogame(form.value);
    }
    router.push('/videogames');
  } finally {
    isSubmitting.value = false;
  }
}

function handleCancel(): void {
  router.push('/videogames');
}

// Lifecycle
onMounted(async () => {
  [studios.value, videogames.value] = await Promise.all([
    StudioService.getStudios(),
    VideogameService.getVideogames(),
  ]);

  if (isEditMode.value && videogameId.value) {
    const videogame = videogames.value.find((g) => g.id === videogameId.value);
    if (videogame) {
      form.value = {
        name: videogame.name,
        genre: videogame.genre,
        description: videogame.description,
        online: videogame.online,
        price: videogame.price,
        imageUrl: videogame.imageUrl,
        totalSales: videogame.totalSales,
        releaseYear: videogame.releaseYear,
        director: videogame.director,
        studioId: videogame.studioId,
      };
      if (videogame.imageUrl) {
        imagePreview.value = videogame.imageUrl;
      }
    }
  }
});
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <div class="rounded-lg bg-[#151E3F] p-6 shadow-lg">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-[#F2F3D9]">Videogame Form</h1>
        <p class="text-sm text-[#F2F3D9]/60">Form for creation/editing videogames for the Realm!</p>
      </div>

      <form class="space-y-6" @submit.prevent="handleSubmit">
        <TextInput v-model="form.name" label="Name" placeholder="Enter videogame name" />

        <SelectInput
          v-model="form.genre"
          label="Genre"
          :options="genreOptions"
          placeholder="Select genre"
        />

        <TextAreaInput
          v-model="form.description"
          label="Description"
          placeholder="Enter videogame description"
          :rows="4"
        />

        <SelectInput
          v-model="selectedOnline"
          label="Online"
          :options="onlineOptions"
          placeholder="Select online status"
        />

        <div class="grid grid-cols-4 gap-4">
          <TextInput v-model="form.price" label="Price" type="number" placeholder="0" />
          <TextInput v-model="form.totalSales" label="Total Sales" type="number" placeholder="0" />
          <TextInput
            v-model="form.releaseYear"
            label="Release Year"
            type="number"
            placeholder="2024"
          />
          <TextInput v-model="form.director" label="Director" placeholder="Director name" />
        </div>

        <SelectInput
          v-model="selectedStudio"
          label="Studio"
          :options="studioOptions"
          placeholder="Select studio"
        />

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-[#F2F3D9]">Videogame Image</label>
          <div class="flex items-center gap-4">
            <label
              class="cursor-pointer rounded-md bg-[#C16E70] px-4 py-2 text-sm font-medium text-[#F2F3D9] transition hover:bg-[#A85A5C]"
            >
              Upload Videogame Image
              <input type="file" accept="image/*" class="hidden" @change="handleImageUpload" />
            </label>
            <div
              v-if="imagePreview"
              class="h-16 w-16 overflow-hidden rounded-md border border-[#030027]"
            >
              <img :src="imagePreview" alt="Preview" class="h-full w-full object-cover" />
            </div>
          </div>
        </div>

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
            :disabled="isSubmitting || !form.name.trim() || !form.genre || !form.studioId"
            class="rounded-md bg-[#C16E70] px-6 py-2 font-medium text-[#F2F3D9] transition hover:bg-[#A85A5C] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save Information
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
