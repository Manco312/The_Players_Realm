<script setup lang="ts">
// Made by: Santiago Manco

// Internal Imports
import type { Videogame } from '~/types/videogame'

// Variables
const { data, pending, error } = await useFetch<Videogame[]>('/api/videogames')
</script>

<template>
  <div>
    <div class="mb-4 pb-4 border-bottom">
      <h1 class="display-5 fw-bold mb-2">Videogames</h1>
      <p class="text-secondary fs-5 mb-0">Explore our curated collection of top-rated videogames.</p>
    </div>

    <div v-if="pending" class="text-center py-5 text-secondary fs-5">Loading games...</div>

    <div v-else-if="error" class="text-center py-5 text-danger fs-5">
      Failed to load games. Please try again later.
    </div>

    <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div v-for="game in data" :key="game.id" class="col">
        <NuxtLink :to="`/videogames/${game.id}`" class="card h-100 text-decoration-none">
          <div class="card-body p-4 d-flex flex-column">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <span class="badge rounded-pill bg-primary bg-opacity-25 text-primary">{{ game.genre }}</span>
              <span :class="game.online ? 'text-info' : 'text-secondary'" class="small fw-medium">
                {{ game.online ? '🌐 Online' : '💻 Offline' }}
              </span>
            </div>
            <h2 class="card-title h5 fw-bold mb-1">{{ game.name }}</h2>
            <p class="text-primary small fw-medium mb-3">{{ game.studio }}</p>
            <p
              class="card-text text-secondary small mb-3 flex-grow-1"
              style="-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden"
            >
              {{ game.description }}
            </p>
            <div class="d-flex align-items-center justify-content-between border-top pt-3">
              <span class="text-secondary small">{{ game.releaseYear }}</span>
              <span class="fw-bold text-success">{{ game.price > 0 ? `$${game.price}` : 'Free' }}</span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
