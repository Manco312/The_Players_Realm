<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="min-h-screen bg-[#030027] text-[#F2F3D9]">
    <!-- Navbar -->
    <header class="bg-[#151E3F]">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <div class="flex items-center">
          <img src="/images/logo.png" alt="The Player's Realm logo" class="h-20 w-auto md:h-24" />
        </div>

        <nav>
          <RouterLink
            to="/login"
            class="text-xl font-semibold text-[#F2F3D9] transition hover:text-[#DC9E82]"
          >
            Login
          </RouterLink>
        </nav>
      </div>
    </header>

    <!-- Hero -->
    <section class="flex min-h-[58vh] flex-col items-center justify-center px-6 text-center">
      <div class="mx-auto max-w-5xl">
        <h1 class="text-4xl font-bold leading-tight md:text-6xl">Welcome to The Player’s Realm!</h1>

        <RouterLink
          to="/login"
          class="mt-8 inline-block rounded-lg bg-[#C16E70] px-10 py-4 text-lg font-semibold text-[#030027] shadow-md transition hover:scale-105 hover:bg-[#DC9E82]"
        >
          Enter the Realm!
        </RouterLink>

        <p class="mx-auto mt-12 max-w-4xl text-lg font-semibold leading-relaxed md:text-2xl">
          A videogame dashboard to explore games, studios, genres, and industry insights in one
          place.
        </p>
      </div>
    </section>

    <!-- Bottom section -->
    <section class="bg-[#C16E70] px-6 py-12 md:px-10">
      <div class="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
        <!-- Image 1 placeholder -->
        <img
          src="/images/landing-1.png"
          alt="Landing preview 1"
          class="h-56 w-full rounded-sm object-cover shadow-sm"
        />

        <!-- Image 2 placeholder -->
        <img
          src="/images/landing-2.png"
          alt="Landing preview 2"
          class="h-56 w-full rounded-sm object-cover shadow-sm"
        />
      </div>

      <div class="mx-auto mt-6 max-w-6xl text-center">
        <p class="text-xl font-bold text-[#F2F3D9] md:text-2xl">
          Project by: Luciana Hoyos, Juan Pablo Padilla and Santiago Manco
        </p>
      </div>
    </section>
  </div>
</template>
