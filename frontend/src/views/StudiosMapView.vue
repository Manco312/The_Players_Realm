<script setup lang="ts">
// Made by: Santiago Manco

// External Imports
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { computed, onMounted, ref, watch } from 'vue';

// Internal Imports
import StatCard from '@/components/StatCard.vue';
import { COUNTRY_CODE_MAP } from '@/constants/countryCodeMap';
import { StudioService } from '@/services/StudioService';
import { useStudioStore } from '@/stores/studiostore';

// Variables
const studioStore = useStudioStore();
const mapContainer = ref<HTMLElement | null>(null);
const mapInstance = ref<L.Map | null>(null);
const geoJsonLayer = ref<L.GeoJSON | null>(null);
const geoJsonData = ref<GeoJSON.FeatureCollection | null>(null);

// Selectors - use StudioService methods
const studioCountByCountry = computed(() => StudioService.getStudioCountByCountry());

const countriesWithStudios = computed(() => StudioService.getCountriesWithStudiosCount());

const countryWithMost = computed(() => StudioService.getCountryWithMostStudios());

const countryWithLeast = computed(() => StudioService.getCountryWithLeastStudios());

// Functions
function getColor(studioCount: number, maxCount: number): string {
  if (studioCount === 0) return '#E0E0E0';

  const ratio = studioCount / maxCount;

  if (ratio >= 0.8) return '#C16E70';
  if (ratio >= 0.6) return '#E07A3D';
  if (ratio >= 0.4) return '#F4A940';
  if (ratio >= 0.2) return '#F7DC6F';
  return '#82E0AA';
}

function getStudioCountForFeature(
  feature: GeoJSON.Feature,
  studioData: Record<string, number>,
): number {
  const props = feature.properties;
  const countryCode = props?.ISO_A3;
  const countryName = props?.name;

  // Skip invalid country codes
  if (!countryCode || countryCode === '-99') {
    return 0;
  }

  // 1. Match by country name (Japan, Poland, Russia)
  if (countryName && countryName in studioData) {
    return studioData[countryName];
  }

  // 2. Match by ISO code directly (USA stored matches ISO_A3 "USA")
  if (countryCode in studioData) {
    return studioData[countryCode];
  }

  // 3. Reverse lookup: stored country name maps to this ISO code
  for (const [storedCountry, count] of Object.entries(studioData)) {
    if (COUNTRY_CODE_MAP[storedCountry] === countryCode) {
      return count;
    }
  }

  return 0;
}

function createStyleFunction(
  studioData: Record<string, number>,
): (feature: GeoJSON.Feature | undefined) => L.PathOptions {
  const counts = Object.values(studioData);
  const maxCount = counts.length > 0 ? Math.max(...counts) : 1;

  return (feature: GeoJSON.Feature | undefined): L.PathOptions => {
    if (!feature) return {};

    const studioCount = getStudioCountForFeature(feature, studioData);

    return {
      fillColor: getColor(studioCount, maxCount),
      weight: 1,
      opacity: 1,
      color: '#030027',
      fillOpacity: 0.8,
    };
  };
}

function createOnEachFeature(
  studioData: Record<string, number>,
): (feature: GeoJSON.Feature, layer: L.Layer) => void {
  return (feature: GeoJSON.Feature, layer: L.Layer): void => {
    const countryName = feature.properties?.ADMIN || feature.properties?.name || 'Unknown';
    const studioCount = getStudioCountForFeature(feature, studioData);

    const popupContent = `
      <div class="p-2">
        <strong>${countryName}</strong><br/>
        Studios: ${studioCount}
      </div>
    `;

    layer.bindPopup(popupContent);

    layer.on({
      mouseover: (e: L.LeafletMouseEvent) => {
        const target = e.target as L.Path;
        target.setStyle({
          weight: 3,
          color: '#F2F3D9',
          fillOpacity: 1,
        });
        target.bringToFront();
      },
      mouseout: () => {
        if (geoJsonLayer.value) {
          geoJsonLayer.value.resetStyle(layer as L.Path);
        }
      },
    });
  };
}

async function loadGeoJson(): Promise<void> {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson',
    );
    geoJsonData.value = await response.json();
    updateMap();
  } catch (error) {
    console.error('Error loading GeoJSON:', error);
  }
}

function updateMap(): void {
  if (!mapInstance.value || !geoJsonData.value) return;

  if (geoJsonLayer.value) {
    mapInstance.value.removeLayer(geoJsonLayer.value);
  }

  // Get current studio data and pass it to the style/feature functions
  const studioData = studioCountByCountry.value;

  geoJsonLayer.value = L.geoJSON(geoJsonData.value, {
    style: createStyleFunction(studioData),
    onEachFeature: createOnEachFeature(studioData),
  }).addTo(mapInstance.value);
}

function initMap(): void {
  if (!mapContainer.value) return;

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
  }).addTo(mapInstance.value);

  loadGeoJson();
}

// Lifecycle
onMounted(() => {
  initMap();
});

// Watch for changes in studio data
watch(
  () => studioStore.studios,
  () => {
    updateMap();
  },
  { deep: true },
);
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Title -->
    <h1 class="text-center text-3xl font-bold italic text-[#F2F3D9]">
      Studios around the WORLD!
    </h1>

    <!-- Map Container -->
    <div class="overflow-hidden rounded-lg border-2 border-[#151E3F] bg-[#F2F3D9]">
      <div ref="mapContainer" class="h-[450px] w-full"></div>
    </div>

    <!-- Stats -->
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
