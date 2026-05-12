<script setup lang="ts">
// Made by: Luciana Hoyos
</script>

<template>
  <div>
    <div class="mb-4 pb-4 border-bottom">
      <h1 class="display-5 fw-bold mb-2">Info Center</h1>
      <p class="text-secondary fs-5 mb-0">Everything you need to know about The Players Realm.</p>
    </div>

    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div class="col">
        <NuxtLink to="/info/faq" class="card h-100 text-decoration-none">
          <div class="card-body p-4">
            <div class="fs-1 mb-3">❓</div>
            <h2 class="card-title h4 fw-bold">FAQ</h2>
            <p class="card-text text-secondary mb-3">
              Find answers to the most commonly asked questions about our platform, features, and community.
            </p>
            <span class="text-info fw-semibold">View FAQs →</span>
          </div>
        </NuxtLink>
      </div>
      <div class="col">
        <NuxtLink to="/info/calculator" class="card h-100 text-decoration-none">
          <div class="card-body p-4">
            <div class="fs-1 mb-3">🧮</div>
            <h2 class="card-title h4 fw-bold">Rating Calculator</h2>
            <p class="card-text text-secondary mb-3">
              Use our interactive tool to rate a game across five categories and get a custom overall score.
            </p>
            <span class="text-info fw-semibold">Try it out →</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
