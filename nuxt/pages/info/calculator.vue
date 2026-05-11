<template>
  <div>
    <NuxtLink to="/info" class="back-link">← Back to Info</NuxtLink>

    <div class="page-header">
      <h1 class="page-title">Game Rating Calculator</h1>
      <p class="page-subtitle">Score a game across five categories to get a custom overall rating.</p>
    </div>

    <div class="calculator">
      <div class="criteria-panel">
        <div v-for="criterion in criteria" :key="criterion.key" class="criterion">
          <div class="criterion-header">
            <div class="criterion-label">
              <span class="criterion-icon">{{ criterion.icon }}</span>
              <span class="criterion-name">{{ criterion.name }}</span>
            </div>
            <span class="criterion-score">{{ scores[criterion.key] }}/10</span>
          </div>
          <input
            v-model.number="scores[criterion.key]"
            type="range"
            min="0"
            max="10"
            step="1"
            class="slider"
          />
          <div class="slider-ticks">
            <span>0</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>
      </div>

      <div class="result-panel">
        <div class="result-ring" :style="{ '--ring-color': ringColor }">
          <span class="result-number">{{ overallScore }}</span>
          <span class="result-unit">/10</span>
        </div>
        <div class="result-info">
          <h2 class="result-label">{{ ratingLabel }}</h2>
          <p class="result-description">{{ ratingDescription }}</p>
        </div>
      </div>

      <button class="reset-button" @click="resetScores">Reset All Scores</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const criteria = [
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

const overallScore = computed(() => {
  const sum = Object.values(scores).reduce((acc, val) => acc + val, 0)
  return (sum / criteria.length).toFixed(1)
})

const ratingLabel = computed(() => {
  const score = parseFloat(overallScore.value)
  if (score >= 9) return 'Masterpiece'
  if (score >= 7.5) return 'Great'
  if (score >= 6) return 'Good'
  if (score >= 4) return 'Average'
  if (score >= 2) return 'Below Average'
  return 'Poor'
})

const ratingDescription = computed(() => {
  const score = parseFloat(overallScore.value)
  if (score >= 9) return 'An exceptional experience that sets new standards for the industry.'
  if (score >= 7.5) return 'A solid and enjoyable game that delivers on its promises and then some.'
  if (score >= 6) return 'A competent game worth playing, though it may have some rough edges.'
  if (score >= 4) return 'A mediocre experience that neither impresses nor disappoints significantly.'
  if (score >= 2) return 'A game with notable flaws that detract from the overall experience.'
  return 'A game that falls short in most categories and is difficult to recommend.'
})

const ringColor = computed(() => {
  const hue = (parseFloat(overallScore.value) / 10) * 120
  return `hsl(${hue}, 70%, 55%)`
})

function resetScores() {
  for (const key of Object.keys(scores)) {
    scores[key] = 5
  }
}
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

.calculator {
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.criteria-panel {
  background-color: #12121a;
  border: 1px solid #1e1e2e;
  border-radius: 1rem;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.criterion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.criterion-label {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.criterion-icon {
  font-size: 1.25rem;
}

.criterion-name {
  font-weight: 600;
  color: #e5e7eb;
}

.criterion-score {
  font-weight: 700;
  font-size: 1.125rem;
  color: #7c3aed;
  min-width: 3.5rem;
  text-align: right;
}

.slider {
  width: 100%;
  accent-color: #7c3aed;
  cursor: pointer;
  height: 6px;
}

.slider-ticks {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

.result-panel {
  background-color: #12121a;
  border: 1px solid #1e1e2e;
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.result-ring {
  flex-shrink: 0;
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
  color: #e5e7eb;
  line-height: 1;
}

.result-unit {
  font-size: 0.875rem;
  color: #6b7280;
}

.result-info {
  flex: 1;
}

.result-label {
  font-size: 1.75rem;
  font-weight: 800;
  color: #e5e7eb;
  margin-bottom: 0.625rem;
}

.result-description {
  color: #9ca3af;
  line-height: 1.6;
}

.reset-button {
  padding: 0.875rem;
  background-color: #1e1e2e;
  border: 1px solid #374151;
  border-radius: 0.5rem;
  color: #9ca3af;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.reset-button:hover {
  background-color: #2a2a3e;
  color: #e5e7eb;
  border-color: #4b5563;
}
</style>
