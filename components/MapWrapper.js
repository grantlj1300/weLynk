import React, { useState, useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ";
import { transform } from "ol/proj";

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
                    // Google Maps Terrain
                    new TileLayer({
                        source: new XYZ({
                            url: "http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}",
                        }),
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
            const america = transform(
                [regionView.lon, regionView.lat],
                "EPSG:4326",
                "EPSG:3857"
            );
            initialMap.getView().setCenter(america);
            initialMap.getView().setZoom(4);
            initialMap.on("click", handleMapClick);
            mapRef.current = initialMap;
            setMap(initialMap);
            setFeaturesLayer(initalFeaturesLayer);
        }
    }, []);

    useEffect(() => {
        if (map) {
            const newCenter = transform(
                [regionView.lon, regionView.lat],
                "EPSG:4326",
                "EPSG:3857"
            );

            map.getView().setCenter(newCenter);
        }
    }, [regionView]);

    // useEffect(() => {
    //     if (props.features.length) {
    //         featuresLayer.setSource(
    //             new VectorSource({
    //                 features: props.features,
    //             })
    //         );

    //         map.getView().fit(featuresLayer.getSource().getExtent(), {
    //             padding: [100, 100, 100, 100],
    //         });
    //     }
    // }, [props.features]);

    const handleMapClick = (event) => {
        const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);

        const transormedCoord = transform(
            clickedCoord,
            "EPSG:3857",
            "EPSG:4326"
        );

        setSelectedCoord(transormedCoord);

        console.log(transormedCoord);
    };

    return (
        <div
            style={{ width: "80%", height: "500px" }}
            ref={mapElement}
            className="map-container"
        />
    );
}
