<template>
  <div>
    <NuxtLink to="/blog" class="back-link">← Back to Blog</NuxtLink>

    <article v-if="article" class="article">
      <div class="article-meta">
        <span class="article-author">{{ article.author }}</span>
        <span class="separator">·</span>
        <span>{{ formatDate(article.date) }}</span>
        <span class="separator">·</span>
        <span>{{ article.readTime }} read</span>
      </div>
      <h1 class="article-title">{{ article.title }}</h1>
      <div class="article-content">
        <p v-for="(paragraph, index) in paragraphs" :key="index" class="paragraph">
          {{ paragraph }}
        </p>
      </div>
    </article>

    <div v-else class="not-found">
      <h1>Article not found</h1>
      <p>The article you are looking for does not exist.</p>
      <NuxtLink to="/blog" class="back-link">← Back to Blog</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { articles } from '~/data/blog'

const route = useRoute()

const article = computed(() => articles.find((a) => a.slug === route.params.slug))

const paragraphs = computed(() =>
  article.value?.content
    .split('\n')
    .map((p) => p.trim())
    .filter((p) => p.length > 0) ?? [],
)

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
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

.article {
  max-width: 800px;
  margin: 0 auto;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.article-author {
  color: #9ca3af;
  font-weight: 500;
}

.separator {
  color: #374151;
}

.article-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 2.5rem;
  line-height: 1.2;
  color: #e5e7eb;
}

.article-content {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.paragraph {
  color: #d1d5db;
  font-size: 1.0625rem;
  line-height: 1.8;
}

.not-found {
  text-align: center;
  padding: 4rem;
  color: #9ca3af;
}

.not-found h1 {
  font-size: 2rem;
  color: #e5e7eb;
  margin-bottom: 1rem;
}

.not-found p {
  margin-bottom: 2rem;
}
</style>
