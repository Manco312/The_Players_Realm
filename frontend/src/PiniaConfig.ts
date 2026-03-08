import { createPinia } from 'pinia';
import { watch } from 'vue';

import { userSeeder } from '@/stores/userseeder.js';
import { studioSeeder } from '@/stores/studioseeder.js';
import { videogameSeeder } from '@/stores/videogameseeder.js';
import { reviewSeeder } from '@/stores/reviewseeder.js';

export default class PiniaConfig {
  public static init() {
    const pinia = createPinia();

    const savedState = localStorage.getItem('piniaState');

    if (savedState) {
      pinia.state.value = JSON.parse(savedState);
    } else {
      // initialize the state with the seeders
      pinia.state.value = {
        user: {
          users: userSeeder,
        },
        studio: {
          studios: studioSeeder,
        },
        videogame: {
          videogames: videogameSeeder,
        },
        review: {
          reviews: reviewSeeder,
        },
      };

      // save initial state
      localStorage.setItem('piniaState', JSON.stringify(pinia.state.value));
    }

    // persist state changes
    watch(
      pinia.state,
      (state) => {
        localStorage.setItem('piniaState', JSON.stringify(state));
      },
      { deep: true },
    );

    return pinia;
  }
}
