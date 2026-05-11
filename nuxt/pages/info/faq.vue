<template>
  <div>
    <NuxtLink to="/info" class="back-link">← Back to Info</NuxtLink>

    <div class="page-header">
      <h1 class="page-title">Frequently Asked Questions</h1>
      <p class="page-subtitle">Got questions? We have answers.</p>
    </div>

    <div class="faq-list">
      <div v-for="(item, index) in faqs" :key="index" class="faq-item">
        <button class="faq-question" @click="toggle(index)">
          <span>{{ item.question }}</span>
          <span :class="['faq-arrow', { open: openIndex === index }]">▼</span>
        </button>
        <Transition name="faq">
          <div v-if="openIndex === index" class="faq-answer">
            <p>{{ item.answer }}</p>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const openIndex = ref<number | null>(null)

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}

const faqs = [
  {
    question: 'What is The Players Realm?',
    answer:
      'The Players Realm is a comprehensive gaming dashboard where you can explore videogames, read gaming articles, and discover top studios. Our platform is built for passionate gamers who want to stay informed about the industry.',
  },
  {
    question: 'How are games rated on this platform?',
    answer:
      'Games are evaluated across gameplay quality, story depth, graphics, sound design, and overall value. Our Rating Calculator tool lets you build your own custom score for any game across those five dimensions.',
  },
  {
    question: 'Can I add my own games or reviews?',
    answer:
      'Currently, our catalog is curated by our team. User-submitted games and reviews are planned for a future update — stay tuned!',
  },
  {
    question: 'What does "Online" vs "Offline" mean for games?',
    answer:
      '"Online" games require an internet connection to play, either because they are multiplayer-focused or require online authentication. "Offline" games can be played entirely without a connection.',
  },
  {
    question: 'Are free-to-play games included?',
    answer:
      'Yes! Games listed with a $0 price are free to download and play. Some may offer optional in-game purchases, which are noted in the game details.',
  },
  {
    question: 'How often is the catalog updated?',
    answer:
      'We update the catalog regularly. Major releases are typically added within one week of their launch date.',
  },
]
</script>

<style scoped>
.back-link {
  display: inline-block;
  color: #06b6d4;
  font-weight: 500;
  margin-bottom: 2rem;
  transition: color 0.2s;
}

.back-link:hover {
  color: #22d3ee;
}

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

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  background-color: #12121a;
  border: 1px solid #1e1e2e;
  border-radius: 0.75rem;
  overflow: hidden;
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: none;
  border: none;
  color: #e5e7eb;
  font-size: 1rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition: color 0.2s;
}

.faq-question:hover {
  color: #06b6d4;
}

.faq-arrow {
  font-size: 0.75rem;
  color: #6b7280;
  transition: transform 0.3s ease, color 0.2s;
  flex-shrink: 0;
}

.faq-arrow.open {
  transform: rotate(180deg);
  color: #06b6d4;
}

.faq-answer {
  padding: 1rem 1.5rem 1.25rem;
  color: #9ca3af;
  line-height: 1.7;
  border-top: 1px solid #1e1e2e;
}

.faq-enter-active,
.faq-leave-active {
  transition: opacity 0.25s ease;
}

.faq-enter-from,
.faq-leave-to {
  opacity: 0;
}
</style>
