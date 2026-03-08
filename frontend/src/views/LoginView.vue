<script setup lang="ts">
// Made by: Santiago Manco
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authstore.js';

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const router = useRouter();
const authStore = useAuthStore();

const handleLogin = () => {
  errorMessage.value = '';

  const success = authStore.login(email.value, password.value);

  if (!success) {
    errorMessage.value = 'Invalid email or password.';
    return;
  }

  router.push('/');
};
</script>

<template>
  <section class="min-h-screen bg-[#030027] px-6 py-10 md:px-10">
    <div class="mx-auto flex min-h-[85vh] max-w-5xl items-center justify-center">
      <div class="grid w-full overflow-hidden rounded-sm shadow-2xl md:grid-cols-2">
        <div
          class="flex flex-col items-center justify-between bg-[#151E3F] px-8 py-10 text-center md:px-12"
        >
          <div class="w-full flex justify-start">
            <RouterLink
              to="/"
              class="text-sm font-semibold text-[#F2F3D9] transition hover:text-[#DC9E82]"
            >
              ← Back
            </RouterLink>
          </div>

          <div class="flex flex-1 flex-col items-center justify-center">
            <img
              src="/images/logo.png"
              alt="The Player's Realm logo"
              class="mb-10 h-40 w-auto md:h-48"
            />

            <h1 class="text-4xl font-bold leading-tight text-[#F2F3D9] md:text-6xl">
              Prepare for the adventure!
            </h1>
          </div>

          <div class="h-6"></div>
        </div>

        <div class="bg-[#F2F3D9] px-8 py-12 md:px-14">
          <div class="mx-auto max-w-sm">
            <h2 class="mb-10 text-center text-5xl font-bold text-[#030027]">Login</h2>

            <form class="space-y-6" @submit.prevent="handleLogin">
              <div>
                <label for="email" class="mb-2 block text-sm font-medium text-[#151E3F]">
                  Email
                </label>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="Your email here"
                  class="w-full rounded-md border border-transparent bg-white px-4 py-3 text-[#151E3F] outline-none transition placeholder:text-gray-400 focus:border-[#DC9E82] focus:ring-2 focus:ring-[#DC9E82]"
                />
              </div>

              <div>
                <label for="password" class="mb-2 block text-sm font-medium text-[#151E3F]">
                  Password
                </label>
                <input
                  id="password"
                  v-model="password"
                  type="password"
                  placeholder="Your password here"
                  class="w-full rounded-md border border-transparent bg-white px-4 py-3 text-[#151E3F] outline-none transition placeholder:text-gray-400 focus:border-[#DC9E82] focus:ring-2 focus:ring-[#DC9E82]"
                />
              </div>

              <p v-if="errorMessage" class="text-sm font-medium text-red-600">
                {{ errorMessage }}
              </p>

              <button
                type="submit"
                class="w-full rounded-md border border-[#151E3F]/30 bg-[#C16E70] px-4 py-3 font-semibold text-[#151E3F] transition hover:bg-[#DC9E82]"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
