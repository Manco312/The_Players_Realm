<script setup lang="ts">
// Made by: Santiago Manco

// External Imports
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Internal Imports
import ReviewModal from '@/components/ReviewModal.vue';
import { ReviewService } from '@/services/ReviewService';
import { StudioService } from '@/services/StudioService';
import { UserService } from '@/services/UserService';
import { VideogameService } from '@/services/VideogameService';
import type { ReviewInterface } from '@/interfaces/ReviewInterface';
import type { StudioInterface } from '@/interfaces/StudioInterface';
import type { UserInterface } from '@/interfaces/UserInterface';
import type { VideogameInterface } from '@/interfaces/VideogameInterface';

// Variables
const route = useRoute();
const router = useRouter();

const videogameId = computed(() => Number(route.params.id));
const isReviewModalOpen = ref(false);

const videogame = ref<VideogameInterface | null>(null);
const studio = ref<StudioInterface | null>(null);
const reviews = ref<ReviewInterface[]>([]);
const users = ref<UserInterface[]>([]);

const reviewsWithUsers = computed(() =>
  reviews.value.map((review) => ({
    ...review,
    user: users.value.find((u) => u.id === review.userId),
  })),
);

// Lifecycle
onMounted(async () => {
  const id = videogameId.value;
  const [vg, gameReviews, allUsers] = await Promise.all([
    VideogameService.getVideogameById(id),
    ReviewService.getReviewsByVideogameId(id),
    UserService.getUsers(),
  ]);

  videogame.value = vg;
  reviews.value = gameReviews;
  users.value = allUsers;

  if (vg?.studioId) {
    studio.value = await StudioService.getStudioById(vg.studioId);
  }
});

// Functions
function handleOpenReviewModal(): void {
  isReviewModalOpen.value = true;
}

function handleCloseReviewModal(): void {
  isReviewModalOpen.value = false;
}

async function handleReviewSubmitted(): Promise<void> {
  reviews.value = await ReviewService.getReviewsByVideogameId(videogameId.value);
  isReviewModalOpen.value = false;
}

function renderStars(rating: number): string {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}
</script>

<template>
  <div class="space-y-6">
    <div v-if="!videogame" class="text-center text-[#F2F3D9]">
      <p class="text-lg">Videogame not found</p>
      <button
        class="mt-4 rounded-md bg-[#C16E70] px-4 py-2 text-sm font-medium text-[#F2F3D9] transition hover:bg-[#C16E70]/80"
        @click="router.push('/videogames')"
      >
        Go Back
      </button>
    </div>

    <div v-else>
      <div class="flex flex-wrap gap-8">
        <div class="w-80 flex-shrink-0">
          <img
            :src="videogame.imageUrl || '/images/placeholder-game.png'"
            :alt="videogame.name"
            class="h-64 w-full rounded-lg object-cover shadow-lg"
          />
        </div>

        <div class="flex-1 space-y-3">
          <h1 class="text-2xl font-bold text-[#F2F3D9]">{{ videogame.name }}</h1>

          <span
            class="inline-block rounded bg-[#5CE1E6] px-3 py-1 text-sm font-medium text-[#030027]"
          >
            {{ videogame.genre }}
          </span>

          <p class="text-3xl font-bold text-[#F2F3D9]">
            <span class="text-lg">$</span>{{ videogame.price.toFixed(2) }}
          </p>

          <div class="space-y-1 text-sm text-[#F2F3D9]/80">
            <p><span class="font-medium">Studio:</span> {{ studio?.name || 'Unknown' }}</p>
            <p><span class="font-medium">Release Year:</span> {{ videogame.releaseYear }}</p>
            <p>
              <span class="font-medium">Online:</span> {{ videogame.online ? 'True' : 'False' }}
            </p>
            <p>
              <span class="font-medium">Total Sales:</span>
              {{ videogame.totalSales.toLocaleString() }}
            </p>
            <p><span class="font-medium">Director:</span> {{ videogame.director }}</p>
          </div>

          <div class="mt-4 rounded-lg bg-[#DC9E82] p-4">
            <h3 class="mb-2 font-semibold text-[#C16E70]">Description</h3>
            <p class="text-sm text-[#030027]">{{ videogame.description }}</p>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <h2 class="mb-4 text-lg font-bold text-[#F2F3D9]">Game Reviews:</h2>

        <div class="space-y-4">
          <div
            v-for="review in reviewsWithUsers"
            :key="review.id"
            class="rounded-lg bg-[#DC9E82] p-4"
          >
            <div class="mb-2 text-[#030027]">
              <span class="text-amber-500">{{ renderStars(Number(review.rating)) }}</span>
            </div>
            <p class="text-sm text-[#030027]">{{ review.comment }}</p>
            <div class="mt-3 flex items-center gap-2">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-full bg-[#151E3F] text-xs font-bold text-[#F2F3D9]"
              >
                {{ review.user?.username?.charAt(0).toUpperCase() || 'U' }}
              </div>
              <span class="text-sm font-medium text-[#030027]">
                {{ review.user?.username || 'Anonymous' }}
              </span>
            </div>
          </div>

          <p v-if="reviews.length === 0" class="text-sm text-[#F2F3D9]/60">
            No reviews yet. Be the first to review!
          </p>
        </div>
      </div>

      <div class="mt-6 flex gap-3">
        <button
          class="rounded-md bg-[#5CE1E6] px-4 py-2 text-sm font-medium text-[#030027] transition hover:bg-[#5CE1E6]/80"
          @click="router.push('/videogames')"
        >
          Go Back
        </button>
        <button
          class="rounded-md bg-[#C16E70] px-4 py-2 text-sm font-medium text-[#F2F3D9] transition hover:bg-[#C16E70]/80"
          @click="handleOpenReviewModal"
        >
          Add a Review
        </button>
      </div>
    </div>

    <ReviewModal
      :is-open="isReviewModalOpen"
      :videogame-id="videogameId"
      @close="handleCloseReviewModal"
      @submitted="handleReviewSubmitted"
    />
  </div>
</template>
