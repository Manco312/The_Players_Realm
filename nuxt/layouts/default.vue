<template>
  <div class="app-wrapper">
    <header class="nav">
      <div class="nav-container">
        <NuxtLink to="/" class="nav-logo">
          <span class="logo-icon">🎮</span>
          <span class="logo-text">The Players Realm</span>
        </NuxtLink>
        <nav class="nav-links">
          <NuxtLink to="/blog" class="nav-link">Blog</NuxtLink>
          <NuxtLink to="/videogames" class="nav-link">Videogames</NuxtLink>
          <NuxtLink to="/info" class="nav-link">Info</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <slot />
    </main>

    <footer class="footer">
      <p>© 2025 The Players Realm. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.nav {
  background-color: #12121a;
  border-bottom: 1px solid #1e1e2e;
  position: sticky;
  top: 0;
  z-index: 50;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: #e5e7eb;
}

.logo-icon {
  font-size: 1.5rem;
}

.logo-text {
  background: linear-gradient(135deg, #7c3aed, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #9ca3af;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #7c3aed;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
}

.footer {
  background-color: #12121a;
  border-top: 1px solid #1e1e2e;
  text-align: center;
  padding: 1.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}
</style>
