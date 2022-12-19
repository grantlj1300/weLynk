import React, { useState, useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { fromLonLat, transform, transformExtent } from "ol/proj";
import MapboxVector from "ol/layer/MapboxVector";
import { Feature } from "ol";
import { Point } from "ol/geom";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";

export default function MapWrapper({ regionView, events }) {
    const [map, setMap] = useState();
    const [markerSource, setMarkerSource] = useState();
    const mapElement = useRef();
    const mapRef = useRef();

    useEffect(() => {
        if (!mapRef.current) {
            console.log(events);
            const features = events.map(
                (event) =>
                    new Feature({
                        geometry: new Point(fromLonLat([event.lon, event.lat])),
                    })
            );
            const markers = new VectorLayer({
                source: new VectorSource({
                    features: features,
                }),
                style: new Style({
                    image: new Icon({
                        src: "https://docs.maptiler.com/openlayers/default-marker/marker-icon.png",
                        anchor: [0.5, 1],
                    }),
                }),
            });
            setMarkerSource(markers.getSource());
            const initialMap = new Map({
                target: mapElement.current,
                layers: [
                    new MapboxVector({
                        styleUrl: "mapbox://styles/mapbox/streets-v12",
                        accessToken:
                            "pk.eyJ1IjoiZ3JhbnRsajEzMDAiLCJhIjoiY2xic2ZmZXNsMDJlNDNvcGY5Z2x4aTlvdiJ9.qfeMh-gZ1kixcbZQNKI99w",
                    }),
                    markers,
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
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (map && regionView) {
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
        // eslint-disable-next-line
    }, [regionView]);

    useEffect(() => {
        if (map) {
            markerSource.clear();
            const features = events.map((event) => {
                const feature = new Feature({
                    geometry: new Point(fromLonLat([event.lon, event.lat])),
                    name: event.title,
                });
                feature.setId(event._id);
                return feature;
            });
            markerSource.addFeatures(features);
        }
        // eslint-disable-next-line
    }, [events]);

    function handleMapClick(e) {
        // const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);
        // const transformedCoord = transform(
        //     clickedCoord,
        //     "EPSG:3857",
        //     "EPSG:4326"
        // );
        // console.log(transformedCoord);
        const clicked = mapRef.current.getFeaturesAtPixel(e.pixel);
        console.log(clicked[0]);
    }

    return (
        <div
            style={{ width: "100%", height: "90vh" }}
            ref={mapElement}
            className="map-container"
        />
    );
}
