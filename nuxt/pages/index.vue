<template>
  <div>
    <section class="hero">
      <h1 class="hero-title">
        Welcome to <span class="accent">The Players Realm</span>
      </h1>
      <p class="hero-subtitle">
        Your ultimate gaming hub — discover games, read insights, and explore the world of interactive entertainment.
      </p>
      <div class="hero-actions">
        <NuxtLink to="/videogames" class="btn btn-primary">Explore Games</NuxtLink>
        <NuxtLink to="/blog" class="btn btn-secondary">Read Blog</NuxtLink>
      </div>
    </section>

    <section class="sections-grid">
      <NuxtLink to="/blog" class="section-card">
        <div class="section-icon">📝</div>
        <h2 class="section-title">Blog</h2>
        <p class="section-desc">
          Read in-depth articles about gaming trends, studio insights, and the psychology behind why we play.
        </p>
        <span class="section-link">Read articles →</span>
      </NuxtLink>

      <NuxtLink to="/videogames" class="section-card">
        <div class="section-icon">🕹️</div>
        <h2 class="section-title">Videogames</h2>
        <p class="section-desc">
          Browse our curated catalog of top-rated videogames from legendary studios around the world.
        </p>
        <span class="section-link">Browse games →</span>
      </NuxtLink>

      <NuxtLink to="/info" class="section-card">
        <div class="section-icon">ℹ️</div>
        <h2 class="section-title">Info</h2>
        <p class="section-desc">
          Get answers to frequently asked questions and use our interactive tools to enhance your gaming experience.
        </p>
        <span class="section-link">Learn more →</span>
      </NuxtLink>
    </section>
  </div>
</template>

<style scoped>
.hero {
  text-align: center;
  padding: 4rem 2rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.accent {
  background: linear-gradient(135deg, #7c3aed, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.125rem;
  color: #9ca3af;
  max-width: 600px;
  margin: 0 auto 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s;
  display: inline-block;
}

.btn-primary {
  background: linear-gradient(135deg, #7c3aed, #5b21b6);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(124, 58, 237, 0.4);
}

.btn-secondary {
  background-color: #1e1e2e;
  color: #e5e7eb;
  border: 1px solid #374151;
}

.btn-secondary:hover {
  background-color: #2a2a3e;
  transform: translateY(-2px);
}

.sections-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.section-card {
  background-color: #12121a;
  border: 1px solid #1e1e2e;
  border-radius: 1rem;
  padding: 2rem;
  display: block;
  transition: all 0.2s;
}

.section-card:hover {
  border-color: #7c3aed;
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(124, 58, 237, 0.2);
}

.section-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #e5e7eb;
}

.section-desc {
  color: #9ca3af;
  font-size: 0.9375rem;
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

.section-link {
  color: #7c3aed;
  font-weight: 600;
  font-size: 0.9375rem;
}
</style>
