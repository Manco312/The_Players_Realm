<script setup lang="ts">
// Made by: Luciana Hoyos

// Variables
interface FaqItem {
  question: string
  answer: string
}

const openIndex = ref<number | null>(null)

const faqs: FaqItem[] = [
  {
    question: 'What is The Players Realm?',
    answer: 'The Players Realm is a comprehensive gaming dashboard where you can explore videogames, read gaming articles, and discover top studios. Our platform is built for passionate gamers who want to stay informed about the industry.',
  },
  {
    question: 'How are games rated on this platform?',
    answer: 'Games are evaluated across gameplay quality, story depth, graphics, sound design, and overall value. Our Rating Calculator tool lets you build your own custom score for any game across those five dimensions.',
  },
  {
    question: 'Can I add my own games or reviews?',
    answer: 'Currently, our catalog is curated by our team. User-submitted games and reviews are planned for a future update — stay tuned!',
  },
  {
    question: 'What does "Online" vs "Offline" mean for games?',
    answer: '"Online" games require an internet connection to play, either because they are multiplayer-focused or require online authentication. "Offline" games can be played entirely without a connection.',
  },
  {
    question: 'Are free-to-play games included?',
    answer: 'Yes! Games listed with a $0 price are free to download and play. Some may offer optional in-game purchases, which are noted in the game details.',
  },
  {
    question: 'How often is the catalog updated?',
    answer: 'We update the catalog regularly. Major releases are typically added within one week of their launch date.',
  },
]

// Functions
function toggle(index: number): void {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <div>
    <NuxtLink to="/info" class="d-inline-block text-info fw-medium mb-4">← Back to Info</NuxtLink>

    <div class="mb-4 pb-4 border-bottom">
      <h1 class="display-5 fw-bold mb-2">Frequently Asked Questions</h1>
      <p class="text-secondary fs-5 mb-0">Got questions? We have answers.</p>
    </div>

    <div class="accordion mx-auto" style="max-width: 800px">
      <div v-for="(item, index) in faqs" :key="index" class="accordion-item">
        <h2 class="accordion-header">
          <button
            type="button"
            class="accordion-button"
            :class="{ collapsed: openIndex !== index }"
            @click="toggle(index)"
          >
            {{ item.question }}
          </button>
        </h2>
        <Transition name="faq">
          <div v-if="openIndex === index" class="accordion-collapse">
            <div class="accordion-body text-secondary">{{ item.answer }}</div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.faq-enter-active,
.faq-leave-active {
  transition: opacity 0.25s ease;
}
.faq-enter-from,
.faq-leave-to {
  opacity: 0;
}
</style>
