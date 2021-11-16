import {comunidadNacional} from "../../persistence/comunidad_nacional";
import L, {LatLng, LatLngBounds, Layer, LayerGroup} from 'leaflet';
import * as geojson from 'geojson';
import {edadNacional} from "../../persistence/edad_nacional";
import {AnyObject} from "../../utils/CommonUtils";
import {ColorsByAgeRange} from "../../persistence/AgeRanges";

const BoundsByLanguage = (language: string) => {
    if (language === "Kichwa") {
        return 18;
    } else if (language === "Siapedee") {
        return 3;
    }
    return 7;
};

export const FillLanguagesLayer = (languages: string[], map: any) => {
    let languagesLayer: AnyObject = {};
    const communities = comunidadNacional['features'];
    languages.map((language) => {
        languagesLayer[language] = [];
        communities.map((community: any) => {
            if (community.properties.lengua === language) {
                languagesLayer[language].push(community);
            }
        });
        languagesLayer[language] = new L.GeoJSON(languagesLayer[language], {
            pointToLayer(feature: geojson.Feature<geojson.Point, any>, latlng: LatLng): Layer {
                const bounds = new LatLngBounds(latlng, [latlng.lat - Number(`0.00${BoundsByLanguage(language)}`), latlng.lng - Number(`0.00${BoundsByLanguage(language)}`)]);
                let rectangle = L.rectangle(bounds, {
                    color: 'rgba(255, 0, 0, 0.5)',
                    fillOpacity: 1,
                    weight: 3,
                    className: "interactivo"
                });

                const communityName: string = feature.properties.Comunidad;
                let peopleLayer = new L.LayerGroup();
                const popUpTitle = `<span class='titlePopup'>${communityName}</span>`;
                rectangle.bindPopup(popUpTitle);
                rectangle.on('mouseover', function () {
                    const ages = FillAges(feature);
                    if (ages) {
                        peopleLayer = PeopleByCommunityLayer(communityName);
                        const popUpContent = ColorsByAgeRange.map((range, index, arr) => {
                            const startAge = index == 0 ? ">" : range.start.age;
                            const endAge = index == arr.length - 1 ? ">" : range.end.age;
                            const age = ages[range.start.age] !== undefined ? ages[range.start.age] : "n/a";
                            return `<text class="agesPopUp">${startAge} <span class='titlePopup'>-</span> ${endAge}: <span class='titlePopup'>${age}</span></text>`
                        })
                        rectangle.bindPopup(popUpTitle + popUpContent.join(" "));
                        peopleLayer.addTo(map);
                        rectangle.bringToFront();
                    }
                });
                rectangle.on('mouseout', () => {
                    peopleLayer.remove();
                })
                return rectangle;
            }
        });
    });
    return languagesLayer;
}

const ColorByAge = (age: number) => {
    return ColorsByAgeRange.find((range) => range.start.age >= age && age <= range.end.age)?.color;
}

const FillAges = (feature: geojson.Feature<geojson.Point, any>) => {
    let ages: AnyObject = {};
    edadNacional.features.map((person: any) => {
        if (person.properties.COMUNIDAD.toUpperCase() === feature.properties.Comunidad.toUpperCase()) {
            const age = person.properties.EDAD;
            ColorsByAgeRange.map((range) => {
                if (ages[range.start.age] === undefined) {
                    ages[range.start.age] = 0;
                }
                if (range.start.age >= age && age <= range.end.age) {
                    ages[range.start.age]++
                }
            });
        }
    });
    return ages;
};

const PeopleByCommunityLayer = (communityName: string): LayerGroup => {
    let layerGroup = new L.LayerGroup();
    // @ts-ignore
    let personLayers = new L.GeoJSON(edadNacional, {
        pointToLayer: (feature, LatLng) => L.circle(LatLng, {
            fillOpacity: 1,
            radius: 40,
            weight: 6,
            color: ColorByAge(feature.properties.EDAD)
        }),
        filter: feature => {
            if (feature.properties.COMUNIDAD.toUpperCase() === communityName.toUpperCase()) {
                return true;
            }
        }
    });
    layerGroup.addLayer(personLayers)
    return layerGroup;
}