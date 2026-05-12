<script setup lang="ts">
// Made by: Juan Pablo Padilla

// Internal Imports
import { articles } from '~/data/blog'

// Functions
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <div>
    <div class="mb-4 pb-4 border-bottom">
      <h1 class="display-5 fw-bold mb-2">Gaming Blog</h1>
      <p class="text-secondary fs-5 mb-0">Deep dives into the world of videogames, studios, and player culture.</p>
    </div>

    <div class="d-flex flex-column gap-3">
      <NuxtLink
        v-for="article in articles"
        :key="article.slug"
        :to="`/blog/${article.slug}`"
        class="card text-decoration-none"
      >
        <div class="card-body p-4">
          <div class="d-flex align-items-center gap-2 text-secondary small mb-2">
            <span class="fw-medium">{{ article.author }}</span>
            <span>·</span>
            <span>{{ formatDate(article.date) }}</span>
            <span>·</span>
            <span>{{ article.readTime }} read</span>
          </div>
          <h2 class="card-title h4 fw-bold mb-2">{{ article.title }}</h2>
          <p class="card-text text-secondary mb-3">{{ article.excerpt }}</p>
          <span class="text-primary fw-semibold">Read article →</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
