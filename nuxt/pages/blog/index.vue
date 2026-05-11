<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">Gaming Blog</h1>
      <p class="page-subtitle">Deep dives into the world of videogames, studios, and player culture.</p>
    </div>

    <div class="articles-list">
      <NuxtLink
        v-for="article in articles"
        :key="article.slug"
        :to="`/blog/${article.slug}`"
        class="article-card"
      >
        <div class="article-meta">
          <span class="article-author">{{ article.author }}</span>
          <span class="separator">·</span>
          <span>{{ formatDate(article.date) }}</span>
          <span class="separator">·</span>
          <span>{{ article.readTime }} read</span>
        </div>
        <h2 class="article-title">{{ article.title }}</h2>
        <p class="article-excerpt">{{ article.excerpt }}</p>
        <span class="article-cta">Read article →</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { articles } from '~/data/blog'

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
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

.articles-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.article-card {
  background-color: #12121a;
  border: 1px solid #1e1e2e;
  border-radius: 1rem;
  padding: 2rem;
  display: block;
  transition: all 0.2s;
}

.article-card:hover {
  border-color: #7c3aed;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(124, 58, 237, 0.15);
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.875rem;
}

.article-author {
  color: #9ca3af;
  font-weight: 500;
}

.separator {
  color: #374151;
}

.article-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #e5e7eb;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.article-excerpt {
  color: #9ca3af;
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

.article-cta {
  color: #7c3aed;
  font-weight: 600;
  font-size: 0.9375rem;
}
</style>
