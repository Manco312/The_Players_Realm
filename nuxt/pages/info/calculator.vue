<script setup lang="ts">
// Made by: Luciana Hoyos

// Variables
interface Criterion {
  key: string
  name: string
  icon: string
}

const criteria: Criterion[] = [
  { key: 'gameplay', name: 'Gameplay', icon: '🕹️' },
  { key: 'story', name: 'Story & Narrative', icon: '📖' },
  { key: 'graphics', name: 'Graphics & Art', icon: '🎨' },
  { key: 'sound', name: 'Sound & Music', icon: '🎵' },
  { key: 'value', name: 'Value for Money', icon: '💰' },
]

const scores = reactive<Record<string, number>>({
  gameplay: 5,
  story: 5,
  graphics: 5,
  sound: 5,
  value: 5,
})

const overallScore = computed((): string => {
  const sum = Object.values(scores).reduce((acc: number, val: number) => acc + val, 0)
  return (sum / criteria.length).toFixed(1)
})

const ratingLabel = computed((): string => {
  const score = parseFloat(overallScore.value)
  if (score >= 9) return 'Masterpiece'
  if (score >= 7.5) return 'Great'
  if (score >= 6) return 'Good'
  if (score >= 4) return 'Average'
  if (score >= 2) return 'Below Average'
  return 'Poor'
})

const ratingDescription = computed((): string => {
  const score = parseFloat(overallScore.value)
  if (score >= 9) return 'An exceptional experience that sets new standards for the industry.'
  if (score >= 7.5) return 'A solid and enjoyable game that delivers on its promises and then some.'
  if (score >= 6) return 'A competent game worth playing, though it may have some rough edges.'
  if (score >= 4) return 'A mediocre experience that neither impresses nor disappoints significantly.'
  if (score >= 2) return 'A game with notable flaws that detract from the overall experience.'
  return 'A game that falls short in most categories and is difficult to recommend.'
})

const ringColor = computed((): string => {
  const hue = (parseFloat(overallScore.value) / 10) * 120
  return `hsl(${hue}, 70%, 55%)`
})

// Functions
function resetScores(): void {
  for (const key of Object.keys(scores)) {
    scores[key] = 5
  }
}
</script>

<template>
  <div>
    <NuxtLink to="/info" class="d-inline-block text-info fw-medium mb-4">← Back to Info</NuxtLink>

    <div class="mb-4 pb-4 border-bottom">
      <h1 class="display-5 fw-bold mb-2">Game Rating Calculator</h1>
      <p class="text-secondary fs-5 mb-0">Score a game across five categories to get a custom overall rating.</p>
    </div>

    <div class="mx-auto d-flex flex-column gap-4" style="max-width: 700px">
      <div class="card">
        <div class="card-body p-4 d-flex flex-column gap-4">
          <div v-for="criterion in criteria" :key="criterion.key">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <div class="d-flex align-items-center gap-2">
                <span class="fs-5">{{ criterion.icon }}</span>
                <span class="fw-semibold">{{ criterion.name }}</span>
              </div>
              <span class="fw-bold text-primary">{{ scores[criterion.key] }}/10</span>
            </div>
            <input
              v-model.number="scores[criterion.key]"
              type="range"
              min="0"
              max="10"
              step="1"
              class="form-range"
            />
            <div class="d-flex justify-content-between text-secondary small">
              <span>0</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-body p-4 d-flex align-items-center gap-4">
          <div class="result-ring flex-shrink-0" :style="{ '--ring-color': ringColor }">
            <span class="result-number">{{ overallScore }}</span>
            <span class="text-secondary small">/10</span>
          </div>
          <div>
            <h2 class="h3 fw-bold mb-2">{{ ratingLabel }}</h2>
            <p class="text-secondary mb-0">{{ ratingDescription }}</p>
          </div>
        </div>
      </div>

      <button class="btn btn-outline-secondary w-100" @click="resetScores">Reset All Scores</button>
    </div>
  </div>
</template>

<style scoped>
.result-ring {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 6px solid var(--ring-color, #7c3aed);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: border-color 0.4s ease;
}

.result-number {
  font-size: 2.25rem;
  font-weight: 800;
  line-height: 1;
}
</style>
