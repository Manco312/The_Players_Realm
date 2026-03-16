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

function getMaxStudioCount(): number {
  const counts = Object.values(studioCountByCountry.value);
  return counts.length > 0 ? Math.max(...counts) : 1;
}

function getStudioCountForFeature(feature: GeoJSON.Feature): number {
  const countryCode = feature.properties?.ISO_A3 || feature.properties?.iso_a3;
  const countryAdmin = feature.properties?.ADMIN;
  const studioData = studioCountByCountry.value;

  // Debug for Poland
  if (countryAdmin === 'Poland') {
    console.log('[v0] Poland feature:', { countryCode, countryAdmin });
    console.log('[v0] Studio data:', studioData);
    console.log('[v0] Poland in data?', studioData['Poland']);
    console.log('[v0] COUNTRY_CODE_MAP Poland:', COUNTRY_CODE_MAP['Poland']);
  }

  // Skip invalid country codes (GeoJSON uses -99 for territories without ISO code)
  if (!countryCode || countryCode === '-99') {
    return 0;
  }

  // 1. Try to match by ADMIN name from GeoJSON (e.g., "Japan", "Poland", "Russia")
  if (countryAdmin && studioData[countryAdmin] !== undefined) {
    return studioData[countryAdmin];
  }

  // 2. Try to match by country code directly (e.g., "USA" stored as country name)
  if (studioData[countryCode] !== undefined) {
    return studioData[countryCode];
  }

  // 3. Try reverse lookup: our stored country maps to this ISO code
  for (const [storedCountry, count] of Object.entries(studioData)) {
    const storedCountryCode = COUNTRY_CODE_MAP[storedCountry];
    if (storedCountryCode === countryCode) {
      return count;
    }
  }

  return 0;
}

function styleFeature(feature: GeoJSON.Feature | undefined): L.PathOptions {
  if (!feature) return {};

  const studioCount = getStudioCountForFeature(feature);
  const maxCount = getMaxStudioCount();

  return {
    fillColor: getColor(studioCount, maxCount),
    weight: 1,
    opacity: 1,
    color: '#030027',
    fillOpacity: 0.8,
  };
}

function onEachFeature(feature: GeoJSON.Feature, layer: L.Layer): void {
  const countryName = feature.properties?.ADMIN || feature.properties?.name || 'Unknown';
  const studioCount = getStudioCountForFeature(feature);

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
  console.log('[v0] updateMap called');
  console.log('[v0] studioStore.studios:', studioStore.studios);
  console.log('[v0] studioCountByCountry.value:', studioCountByCountry.value);
  
  if (!mapInstance.value || !geoJsonData.value) return;

  if (geoJsonLayer.value) {
    mapInstance.value.removeLayer(geoJsonLayer.value);
  }

  geoJsonLayer.value = L.geoJSON(geoJsonData.value, {
    style: styleFeature,
    onEachFeature: onEachFeature,
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
