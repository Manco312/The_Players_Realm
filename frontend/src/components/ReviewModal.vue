<script setup lang="ts">
// Made by: Santiago Manco

// External Imports
import { ref, watch } from 'vue';

// Internal Imports
import SelectInput from '@/components/SelectInput.vue';
import TextAreaInput from '@/components/TextAreaInput.vue';
import { ReviewService } from '@/services/ReviewService';
import { useAuthStore } from '@/stores/authstore';
import type { CreateReviewDTO } from '@/dtos/CreateReviewDTO';

// Props
const props = defineProps<{
  isOpen: boolean;
  videogameId: number;
}>();

// Emits
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'submitted'): void;
}>();

// Variables
const authStore = useAuthStore();

const form = ref<CreateReviewDTO>({
  videogameId: props.videogameId,
  rating: 5,
  comment: '',
  userId: authStore.currentUser?.id || 0,
});

const ratingOptions = [
  { value: '5', label: '5 Stars' },
  { value: '4', label: '4 Stars' },
  { value: '3', label: '3 Stars' },
  { value: '2', label: '2 Stars' },
  { value: '1', label: '1 Star' },
];

// Watchers
watch(
  () => props.videogameId,
  (newId) => {
    form.value.videogameId = newId;
  },
);

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      form.value = {
        videogameId: props.videogameId,
        rating: 5,
        comment: '',
        userId: authStore.currentUser?.id || 0,
      };
    }
  },
);

// Functions
function handleSubmit(): void {
  if (!form.value.comment.trim()) return;

  ReviewService.createReview({
    ...form.value,
    comment: form.value.comment.trim(),
  });

  emit('submitted');
  emit('close');
}

function handleClose(): void {
  emit('close');
}
</script>

<template>
  <!-- Modal Backdrop -->
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    @click.self="handleClose"
  >
    <!-- Modal Content -->
    <div class="w-full max-w-md rounded-lg bg-[#151E3F] p-6 shadow-xl">
      <h2 class="mb-4 text-xl font-bold text-[#F2F3D9]">Add a Review</h2>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <SelectInput v-model="form.rating" label="Rating" :options="ratingOptions" />

        <TextAreaInput
          v-model="form.comment"
          label="Comment"
          placeholder="Write your review..."
          :rows="4"
        />

        <div class="flex justify-end gap-3 pt-4">
          <button
            type="button"
            class="rounded-md bg-[#030027] px-4 py-2 text-sm font-medium text-[#F2F3D9] transition hover:bg-[#030027]/80"
            @click="handleClose"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="!form.comment.trim()"
            class="rounded-md bg-[#C16E70] px-4 py-2 text-sm font-medium text-[#F2F3D9] transition hover:bg-[#C16E70]/80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
