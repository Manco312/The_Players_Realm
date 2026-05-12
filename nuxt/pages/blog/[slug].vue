<script setup lang="ts">
// Made by: Juan Pablo Padilla

// Internal Imports
import { articles } from '~/data/blog'

// Variables
const route = useRoute()

const article = computed(() => articles.find((a) => a.slug === route.params.slug))

const paragraphs = computed((): string[] =>
  article.value?.content
    .split('\n')
    .map((p: string) => p.trim())
    .filter((p: string) => p.length > 0) ?? [],
)

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
    <NuxtLink to="/blog" class="d-inline-block text-primary fw-medium mb-4">← Back to Blog</NuxtLink>

    <article v-if="article" class="mx-auto" style="max-width: 800px">
      <div class="d-flex align-items-center gap-2 text-secondary small mb-4">
        <span class="fw-medium">{{ article.author }}</span>
        <span>·</span>
        <span>{{ formatDate(article.date) }}</span>
        <span>·</span>
        <span>{{ article.readTime }} read</span>
      </div>
      <h1 class="display-5 fw-bold mb-4">{{ article.title }}</h1>
      <div class="d-flex flex-column gap-3">
        <p v-for="(paragraph, index) in paragraphs" :key="index" class="text-secondary lh-lg mb-0">
          {{ paragraph }}
        </p>
      </div>
    </article>

    <div v-else class="text-center py-5 text-secondary">
      <h1 class="h2 mb-3">Article not found</h1>
      <p class="mb-4">The article you are looking for does not exist.</p>
      <NuxtLink to="/blog" class="text-primary fw-medium">← Back to Blog</NuxtLink>
    </div>
  </div>
</template>
