<script setup lang="ts">
// Made by: Santiago Manco

// Internal Imports
import type { Videogame } from '~/types/videogame'

// Variables
interface Stat {
  label: string
  value: string
  valueClass?: string
}

const route = useRoute()
const { data, pending, error } = await useFetch<Videogame>(`/api/videogames/${route.params.id}`)

const stats = computed((): Stat[] =>
  data.value
    ? [
        { label: 'Director', value: data.value.director },
        { label: 'Release Year', value: String(data.value.releaseYear) },
        {
          label: 'Price',
          value: data.value.price > 0 ? `$${data.value.price}` : 'Free to Play',
          valueClass: 'fw-semibold text-success mb-0',
        },
        { label: 'Total Sales', value: formatSales(data.value.totalSales) },
      ]
    : [],
)

// Functions
function formatSales(sales: number): string {
  if (sales === 0) return 'N/A'
  if (sales >= 1_000_000) return `${(sales / 1_000_000).toFixed(1)}M units`
  return `${sales.toLocaleString()} units`
}
</script>

<template>
  <div>
    <NuxtLink to="/videogames" class="d-inline-block text-primary fw-medium mb-4">← Back to Videogames</NuxtLink>

    <div v-if="pending" class="text-center py-5 text-secondary fs-5">Loading game...</div>

    <div v-else-if="error" class="text-center py-5">
      <h1 class="h2 mb-2">Game not found</h1>
      <p class="text-secondary mb-4">The game you are looking for does not exist.</p>
      <NuxtLink to="/videogames" class="text-primary fw-medium">← Back to Videogames</NuxtLink>
    </div>

    <div v-else-if="data" class="mx-auto" style="max-width: 900px">
      <div class="mb-4">
        <div class="d-flex gap-2 mb-3">
          <span class="badge rounded-pill bg-primary bg-opacity-25 text-primary">{{ data.genre }}</span>
          <span :class="data.online ? 'text-info' : 'text-secondary'" class="badge rounded-pill bg-body-secondary">
            {{ data.online ? '🌐 Online' : '💻 Offline' }}
          </span>
        </div>
        <h1 class="display-5 fw-bold mb-1">{{ data.name }}</h1>
        <p class="text-primary fs-5 fw-medium">by {{ data.studio }}</p>
      </div>

      <div class="card">
        <div class="card-body p-4">
          <p class="text-secondary lh-lg mb-4 pb-4 border-bottom">{{ data.description }}</p>
          <div class="row row-cols-2 row-cols-md-4 g-3">
            <div v-for="stat in stats" :key="stat.label" class="col">
              <p class="text-secondary text-uppercase fw-semibold small mb-1" style="letter-spacing:.05em">
                {{ stat.label }}
              </p>
              <p :class="stat.valueClass ?? 'fw-semibold mb-0'">{{ stat.value }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
