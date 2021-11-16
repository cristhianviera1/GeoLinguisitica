import {FunctionComponent, useEffect, useState} from "react";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {MapContainer} from 'react-leaflet';
import {MaxBoxTiles} from "../../components/MapTiles";
import {CommunitiesLayer} from "../../components/Layers";
import {LanguagesFromData} from "../../components/Utils";
import {FillLanguagesLayer} from "./CommunityLayers";
import {comunidadNacional} from "../../persistence/comunidad_nacional";
import {AnyObject} from "../../utils/CommonUtils";
import {legend} from "./Controls";
import {EcuadorCenter, MapMaxZoom, MapZoom} from "../../persistence/MapConstants";

const ComunidadEdad: FunctionComponent = () => {
    const [map, setMap] = useState<L.Map>();
    useEffect(() => {
        if (map) {
            MaxBoxTiles.addTo(map);
            map.addLayer(CommunitiesLayer)
            // @ts-ignore
            const languages = LanguagesFromData(comunidadNacional.features);
            const languagesLayers = FillLanguagesLayer(languages, map);
            new L.Control({position: "topright"});
            L.control.layers(languagesLayers, undefined, {
                collapsed: false,
            }).addTo(map);
            updateControlLayer(map, languagesLayers)
            updateWeightRectangle(map);
            legend.addTo(map);
        }
    }, [map]);

    const updateControlLayer = (map: L.Map, languagesLayer: AnyObject) =>
        map.on('baselayerchange', (e: any) => {
            map.removeLayer(CommunitiesLayer)
            const languageLayer = languagesLayer[e.name].getBounds();
            const zoom = map.getBoundsZoom(languageLayer);
            const position = languageLayer;
            const lat = (position._northEast.lat + position._southWest.lat) / 2
            const lng = (position._northEast.lng + position._southWest.lng) / 2
            map.flyTo([lat, lng], zoom, {
                animate: true,
                duration: 0.6
            });
        })

    const updateWeightRectangle = (map: L.Map) =>
        map.on('zoomend', () => {
            let currentZoom = map.getZoom();
            map.eachLayer((layer: any) => {
                if (layer?.defaultOptions) {
                    if (currentZoom < 12) {
                        layer?.setStyle({weight: 6});
                    } else {
                        layer?.setStyle({weight: 2});
                    }
                }
            });
        });


    return (
        <MapContainer
            center={EcuadorCenter}
            zoom={MapZoom}
            maxZoom={MapMaxZoom}
            style={{height: "100vh"}}
            whenCreated={(map) => setMap(map)}
        >
        </MapContainer>
    )
}
export default ComunidadEdad;