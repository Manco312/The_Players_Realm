<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">Videogames</h1>
      <p class="page-subtitle">Explore our curated collection of top-rated videogames.</p>
    </div>

    <div v-if="pending" class="status-message">Loading games...</div>

    <div v-else-if="error" class="status-message error">
      Failed to load games. Please try again later.
    </div>

    <div v-else class="games-grid">
      <NuxtLink
        v-for="game in data"
        :key="game.id"
        :to="`/videogames/${game.id}`"
        class="game-card"
      >
        <div class="game-card-header">
          <span class="badge-genre">{{ game.genre }}</span>
          <span :class="['badge-mode', game.online ? 'online' : 'offline']">
            {{ game.online ? '🌐 Online' : '💻 Offline' }}
          </span>
        </div>
        <h2 class="game-name">{{ game.name }}</h2>
        <p class="game-studio">{{ game.studio }}</p>
        <p class="game-desc">{{ game.description }}</p>
        <div class="game-footer">
          <span class="game-year">{{ game.releaseYear }}</span>
          <span class="game-price">{{ game.price > 0 ? `$${game.price}` : 'Free' }}</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Videogame } from '~/types/videogame'

const { data, pending, error } = await useFetch<Videogame[]>('/api/videogames')
</script>

<style scoped>
.page-header {
  margin-bottom: 3rem;
  border-bottom: 1px solid #1e1e2e;
  padding-bottom: 2rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
}

.page-subtitle {
  color: #9ca3af;
  font-size: 1.125rem;
}

.status-message {
  text-align: center;
  padding: 4rem;
  color: #9ca3af;
  font-size: 1.125rem;
}

.status-message.error {
  color: #ef4444;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.game-card {
  background-color: #12121a;
  border: 1px solid #1e1e2e;
  border-radius: 1rem;
  padding: 1.75rem;
  display: block;
  transition: all 0.2s;
}

.game-card:hover {
  border-color: #7c3aed;
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(124, 58, 237, 0.2);
}

.game-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.badge-genre {
  background-color: rgba(124, 58, 237, 0.2);
  color: #a78bfa;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 600;
}

.badge-mode {
  font-size: 0.8125rem;
  font-weight: 500;
}

.badge-mode.online {
  color: #06b6d4;
}

.badge-mode.offline {
  color: #6b7280;
}

.game-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #e5e7eb;
  margin-bottom: 0.25rem;
}

.game-studio {
  color: #7c3aed;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.875rem;
}

.game-desc {
  color: #9ca3af;
  font-size: 0.9375rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.game-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #1e1e2e;
  padding-top: 1rem;
}

.game-year {
  color: #6b7280;
  font-size: 0.875rem;
}

.game-price {
  font-size: 1.125rem;
  font-weight: 700;
  color: #10b981;
}
</style>
