import {FunctionComponent, useEffect, useState} from "react";
import {MapContainer} from "react-leaflet";
import {EcuadorCenter, MapMaxZoom, MapZoom} from "../../persistence/MapConstants";
import L from "leaflet";
import {MaxBoxTiles} from "../../components/MapTiles";
import {LanguagesFromData} from "../../components/Utils";

const Intergenerational: FunctionComponent = () => {
    const [map, setMap] = useState<L.Map>();

    useEffect(() => {
        if (map) {
            MaxBoxTiles.addTo(map);
            // @ts-ignore
            const languages = LanguagesFromData(encuestaInfo.features);
        }
    }, [map]);

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
};
export default Intergenerational;