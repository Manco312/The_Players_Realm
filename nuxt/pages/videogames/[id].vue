<template>
  <div>
    <NuxtLink to="/videogames" class="back-link">← Back to Videogames</NuxtLink>

    <div v-if="pending" class="status-message">Loading game...</div>

    <div v-else-if="error" class="status-message error">
      <h1>Game not found</h1>
      <p>The game you are looking for does not exist.</p>
      <NuxtLink to="/videogames" class="back-link" style="display: inline-block; margin-top: 1rem">
        ← Back to Videogames
      </NuxtLink>
    </div>

    <div v-else-if="data" class="game-detail">
      <div class="game-top">
        <div class="badges">
          <span class="badge-genre">{{ data.genre }}</span>
          <span :class="['badge-mode', data.online ? 'online' : 'offline']">
            {{ data.online ? '🌐 Online' : '💻 Offline' }}
          </span>
        </div>
        <h1 class="game-title">{{ data.name }}</h1>
        <p class="game-studio">by {{ data.studio }}</p>
      </div>

      <div class="game-body">
        <p class="game-description">{{ data.description }}</p>

        <div class="stats-grid">
          <div class="stat">
            <span class="stat-label">Director</span>
            <span class="stat-value">{{ data.director }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Release Year</span>
            <span class="stat-value">{{ data.releaseYear }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Price</span>
            <span class="stat-value stat-price">{{ data.price > 0 ? `$${data.price}` : 'Free to Play' }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Total Sales</span>
            <span class="stat-value">{{ formatSales(data.totalSales) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Videogame } from '~/types/videogame'

const route = useRoute()
const { data, pending, error } = await useFetch<Videogame>(`/api/videogames/${route.params.id}`)

function formatSales(sales: number): string {
  if (sales === 0) return 'N/A'
  if (sales >= 1_000_000) return `${(sales / 1_000_000).toFixed(1)}M units`
  return `${sales.toLocaleString()} units`
}
</script>

<style scoped>
.back-link {
  display: inline-block;
  color: #7c3aed;
  font-weight: 500;
  margin-bottom: 2rem;
  transition: color 0.2s;
}

.back-link:hover {
  color: #9061f9;
}

.status-message {
  text-align: center;
  padding: 4rem;
  color: #9ca3af;
  font-size: 1.125rem;
}

.status-message.error {
  color: #e5e7eb;
}

.status-message.error h1 {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.status-message.error p {
  color: #9ca3af;
}

.game-detail {
  max-width: 900px;
  margin: 0 auto;
}

.game-top {
  margin-bottom: 2rem;
}

.badges {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.badge-genre {
  background-color: rgba(124, 58, 237, 0.2);
  color: #a78bfa;
  padding: 0.25rem 0.875rem;
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 600;
}

.badge-mode {
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.25rem 0.875rem;
  border-radius: 9999px;
  background-color: #1e1e2e;
}

.badge-mode.online {
  color: #06b6d4;
}

.badge-mode.offline {
  color: #6b7280;
}

.game-title {
  font-size: 2.75rem;
  font-weight: 800;
  color: #e5e7eb;
  margin-bottom: 0.5rem;
  line-height: 1.15;
}

.game-studio {
  color: #7c3aed;
  font-size: 1.125rem;
  font-weight: 500;
}

.game-body {
  background-color: #12121a;
  border: 1px solid #1e1e2e;
  border-radius: 1rem;
  padding: 2rem;
}

.game-description {
  color: #d1d5db;
  font-size: 1.0625rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #1e1e2e;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.stat-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
}

.stat-value {
  font-size: 1.125rem;
  font-weight: 600;
  color: #e5e7eb;
}

.stat-price {
  color: #10b981;
}
</style>
