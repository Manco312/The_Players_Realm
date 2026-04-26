<script setup lang="ts">
// Made by: Luciana Hoyos

// External Imports
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { computed, onMounted, ref, shallowRef } from 'vue';

// Internal Imports
import StatCard from '@/components/StatCard.vue';
import { StudioService } from '@/services/StudioService';
import { createOnEachFeature, createStyleFunction } from '@/utils/MapUtils';
import type { StudioInterface } from '@/interfaces/StudioInterface';

// Variables
const studios = ref<StudioInterface[]>([]);
const mapContainer = ref<HTMLElement | null>(null);
const mapInstance = shallowRef<L.Map | null>(null);
const geoJsonLayer = shallowRef<L.GeoJSON<any> | null>(null);
const geoJsonData = ref<GeoJSON.FeatureCollection | null>(null);

const studioCountByCountry = computed(() => StudioService.getStudioCountByCountry(studios.value));
const countriesWithStudios = computed(() => Object.keys(studioCountByCountry.value).length);
const countryWithMost = computed(() => StudioService.getCountryWithMostStudios(studios.value));
const countryWithLeast = computed(() => StudioService.getCountryWithLeastStudios(studios.value));

// Functions
async function loadGeoJson(): Promise<void> {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson',
    );

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    geoJsonData.value = (await response.json()) as GeoJSON.FeatureCollection;
    updateMap();
  } catch (error) {
    console.error('Error loading GeoJSON:', error);
  }
}

function updateMap(): void {
  if (!mapInstance.value || !geoJsonData.value) return;

  if (geoJsonLayer.value) {
    geoJsonLayer.value.remove();
    geoJsonLayer.value = null;
  }

  const studioData = studioCountByCountry.value;
  console.log('studioData', studioData);

  geoJsonLayer.value = L.geoJSON(geoJsonData.value, {
    style: createStyleFunction(studioData),
    onEachFeature: createOnEachFeature(studioData, geoJsonLayer),
  }).addTo(mapInstance.value!);
}

function initMap(): void {
  if (!mapContainer.value || mapInstance.value) return;

  mapInstance.value = L.map(mapContainer.value, {
    center: [20, 0],
    zoom: 2,
    minZoom: 1,
    maxZoom: 6,
    worldCopyJump: true,
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  }).addTo(mapInstance.value!);

  loadGeoJson();
}

onMounted(async () => {
  studios.value = await StudioService.getStudios();
  initMap();
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-center text-3xl font-bold italic text-[#F2F3D9]">Studios around the WORLD!</h1>

    <div class="overflow-hidden rounded-lg border-2 border-[#151E3F] bg-[#F2F3D9]">
      <div ref="mapContainer" class="h-[450px] w-full"></div>
    </div>

    <div class="flex flex-wrap justify-center gap-6">
      <StatCard :value="countriesWithStudios" label="Countries with videogame studios" />

      <StatCard
        :value="countryWithMost?.country || 'N/A'"
        label="is the country with most studios"
      />

      <StatCard
        :value="countryWithLeast?.country || 'N/A'"
        label="is the country with less studios"
      />
    </div>
  </div>
</template>

<style>
.leaflet-popup-content-wrapper {
  background-color: #151e3f;
  color: #f2f3d9;
  border-radius: 8px;
}

.leaflet-popup-tip {
  background-color: #151e3f;
}

.leaflet-popup-content {
  margin: 8px 12px;
}
</style>
