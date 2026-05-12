<script setup lang="ts">
// Made by: Santiago Manco
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <nav class="navbar navbar-expand-md sticky-top border-bottom bg-body">
      <div class="container-xl">
        <NuxtLink class="navbar-brand fw-bold fs-5" to="/">
          <span>🎮</span>
          <span class="logo-gradient ms-2">The Players Realm</span>
        </NuxtLink>
        <div class="navbar-nav flex-row gap-3 ms-auto">
          <NuxtLink to="/blog" class="nav-link" active-class="active">Blog</NuxtLink>
          <NuxtLink to="/videogames" class="nav-link" active-class="active">Videogames</NuxtLink>
          <NuxtLink to="/info" class="nav-link" active-class="active">Info</NuxtLink>
        </div>
      </div>
    </nav>

    <main class="container-xl py-4 flex-grow-1">
      <slot />
    </main>

    <footer class="border-top py-3 text-center">
      <p class="text-secondary small mb-0">© 2026 The Players Realm. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
.logo-gradient {
  background: linear-gradient(135deg, #7c3aed, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
