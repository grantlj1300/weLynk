import React, { useState, useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ";
import { transform, transformExtent } from "ol/proj";
import MapboxVector from "ol/layer/MapboxVector";

export default function MapWrapper({ regionView }) {
    const [map, setMap] = useState();
    const [featuresLayer, setFeaturesLayer] = useState();
    const [selectedCoord, setSelectedCoord] = useState();
    const mapElement = useRef();

    const mapRef = useRef();

    useEffect(() => {
        if (!mapRef.current) {
            const initalFeaturesLayer = new VectorLayer({
                source: new VectorSource(),
            });

            const initialMap = new Map({
                target: mapElement.current,
                layers: [
                    new MapboxVector({
                        styleUrl: "mapbox://styles/mapbox/streets-v12",
                        accessToken:
                            "pk.eyJ1IjoiZ3JhbnRsajEzMDAiLCJhIjoiY2xic2ZmZXNsMDJlNDNvcGY5Z2x4aTlvdiJ9.qfeMh-gZ1kixcbZQNKI99w",
                    }),

                    initalFeaturesLayer,
                ],
                view: new View({
                    projection: "EPSG:3857",
                    center: [0, 0],
                    zoom: 2,
                }),
                controls: [],
            });
            if (regionView) {
                const extent = transformExtent(
                    [
                        regionView.minLon,
                        regionView.minLat,
                        regionView.maxLon,
                        regionView.maxLat,
                    ],
                    "EPSG:4326",
                    "EPSG:3857"
                );
                initialMap.getView().fit(extent);
            }
            initialMap.on("click", handleMapClick);
            mapRef.current = initialMap;
            setMap(initialMap);
            setFeaturesLayer(initalFeaturesLayer);
        }
    }, []);

    useEffect(() => {
        if (map) {
            const extent = transformExtent(
                [
                    regionView.minLon,
                    regionView.minLat,
                    regionView.maxLon,
                    regionView.maxLat,
                ],
                "EPSG:4326",
                "EPSG:3857"
            );
            map.getView().fit(extent);
        }
    }, [regionView]);

    const handleMapClick = (event) => {
        const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);

        const transormedCoord = transform(
            clickedCoord,
            "EPSG:3857",
            "EPSG:4326"
        );

        setSelectedCoord(transormedCoord);
    };

    return (
        <div
            style={{ width: "100%", height: "80vh" }}
            ref={mapElement}
            className="map-container"
        />
    );
}
