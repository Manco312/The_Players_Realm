<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">Info Center</h1>
      <p class="page-subtitle">Everything you need to know about The Players Realm.</p>
    </div>

    <div class="info-grid">
      <NuxtLink to="/info/faq" class="info-card">
        <div class="info-icon">❓</div>
        <h2 class="info-title">FAQ</h2>
        <p class="info-desc">
          Find answers to the most commonly asked questions about our platform, features, and community.
        </p>
        <span class="info-cta">View FAQs →</span>
      </NuxtLink>

      <NuxtLink to="/info/calculator" class="info-card">
        <div class="info-icon">🧮</div>
        <h2 class="info-title">Rating Calculator</h2>
        <p class="info-desc">
          Use our interactive tool to rate a game across five categories and get a custom overall score.
        </p>
        <span class="info-cta">Try it out →</span>
      </NuxtLink>
    </div>
  </div>
</template>

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

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.info-card {
  background-color: #12121a;
  border: 1px solid #1e1e2e;
  border-radius: 1rem;
  padding: 2.5rem 2rem;
  display: block;
  transition: all 0.2s;
}

.info-card:hover {
  border-color: #06b6d4;
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(6, 182, 212, 0.15);
}

.info-icon {
  font-size: 3rem;
  margin-bottom: 1.25rem;
}

.info-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #e5e7eb;
}

.info-desc {
  color: #9ca3af;
  margin-bottom: 1.75rem;
  line-height: 1.7;
}

.info-cta {
  color: #06b6d4;
  font-weight: 600;
}
</style>
