<script setup lang="ts">
// Made by: Santiago Manco

// Variables
interface NavCard {
  to: string
  icon: string
  title: string
  desc: string
  cta: string
}

const cards: NavCard[] = [
  {
    to: '/blog',
    icon: '📝',
    title: 'Blog',
    desc: 'Read in-depth articles about gaming trends, studio insights, and the psychology behind why we play.',
    cta: 'Read articles →',
  },
  {
    to: '/videogames',
    icon: '🕹️',
    title: 'Videogames',
    desc: 'Browse our curated catalog of top-rated videogames from legendary studios around the world.',
    cta: 'Browse games →',
  },
  {
    to: '/info',
    icon: 'ℹ️',
    title: 'Info',
    desc: 'Get answers to frequently asked questions and use our interactive tools to enhance your gaming experience.',
    cta: 'Learn more →',
  },
]
</script>

<template>
  <div>
    <section class="text-center py-5">
      <h1 class="display-4 fw-bold mb-3">
        Welcome to <span class="text-gradient">The Players Realm</span>
      </h1>
      <p class="fs-5 text-secondary mx-auto mb-4" style="max-width: 600px">
        Your ultimate gaming hub — discover games, read insights, and explore the world of interactive entertainment.
      </p>
      <div class="d-flex gap-3 justify-content-center">
        <NuxtLink to="/videogames" class="btn btn-primary px-4">Explore Games</NuxtLink>
        <NuxtLink to="/blog" class="btn btn-outline-secondary px-4">Read Blog</NuxtLink>
      </div>
    </section>

    <div class="row row-cols-1 row-cols-md-3 g-4 mt-2">
      <div v-for="card in cards" :key="card.to" class="col">
        <NuxtLink :to="card.to" class="card h-100 text-decoration-none">
          <div class="card-body p-4">
            <div class="fs-1 mb-3">{{ card.icon }}</div>
            <h2 class="card-title h4 fw-bold">{{ card.title }}</h2>
            <p class="card-text text-secondary mb-3">{{ card.desc }}</p>
            <span class="text-primary fw-semibold">{{ card.cta }}</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-gradient {
  background: linear-gradient(135deg, #7c3aed, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
