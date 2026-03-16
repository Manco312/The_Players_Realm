// Made by: Santiago Manco and Luciana Hoyos

import * as L from 'leaflet';
import type { Feature } from 'geojson';
import { COUNTRY_CODE_MAP } from '@/constants/countryCodeMap';

type CountryFeatureProperties = {
  name?: string;
  'ISO3166-1-Alpha-3'?: string;
};

export function getColor(studioCount: number, maxCount: number): string {
  if (studioCount === 0) return '#E0E0E0';

  const ratio = studioCount / maxCount;

  if (ratio >= 0.8) return '#C16E70';
  if (ratio >= 0.6) return '#E07A3D';
  if (ratio >= 0.4) return '#F4A940';
  if (ratio >= 0.2) return '#F7DC6F';
  return '#82E0AA';
}

export function getStudioCountForFeature(
  feature: Feature,
  studioData: Record<string, number>,
): number {
  const props = (feature.properties ?? {}) as CountryFeatureProperties;

  const countryCode = props['ISO3166-1-Alpha-3'];
  const countryName = props.name;

  if (!countryCode) {
    return 0;
  }

  if (studioData[countryCode] !== undefined) {
    return studioData[countryCode];
  }

  if (countryName && studioData[countryName] !== undefined) {
    return studioData[countryName];
  }

  for (const [storedCountry, count] of Object.entries(studioData)) {
    if (COUNTRY_CODE_MAP[storedCountry] === countryCode) {
      return count;
    }
  }

  return 0;
}

export function createStyleFunction(
  studioData: Record<string, number>,
): (feature?: Feature) => L.PathOptions {
  const counts = Object.values(studioData);
  const maxCount = counts.length > 0 ? Math.max(...counts) : 1;

  return (feature?: Feature): L.PathOptions => {
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

export function createOnEachFeature(
  studioData: Record<string, number>,
  geoJsonLayerRef: { value: L.GeoJSON | null },
): (feature: Feature, layer: L.Layer) => void {
  return (feature: Feature, layer: L.Layer): void => {
    const props = (feature.properties ?? {}) as CountryFeatureProperties;
    const countryName = props.name || 'Unknown';
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
        if (geoJsonLayerRef.value) {
          geoJsonLayerRef.value.resetStyle(layer as L.Path);
        }
      },
    });
  };
}
