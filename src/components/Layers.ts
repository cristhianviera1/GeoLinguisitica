import L from 'leaflet';
import {comunidadNacional} from "../persistence/comunidad_nacional";

// @ts-ignore
export const CommunitiesLayer = L.geoJSON(comunidadNacional, {
    pointToLayer: function (feature, LatLng) {
        const bounds = new L.LatLngBounds(LatLng, new L.LatLng(LatLng.lat - 0.001, LatLng.lng - 0.001));
        const rect = L.rectangle(bounds, {color: '#FF0000', fillOpacity: 0.9, weight: 1})
        return rect.bindPopup(feature.properties.lengua)
    }
})
