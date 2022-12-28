import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/MapWrapper.module.css";
import { Map, View, Feature } from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { fromLonLat, transform, transformExtent } from "ol/proj";
import MapboxVector from "ol/layer/MapboxVector";
import { Point } from "ol/geom";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";

export default function MiniMapWrapper({ regionView, pin, locationClick }) {
    const [map, setMap] = useState();
    const markerSource = useRef();
    const mapElement = useRef();
    const mapRef = useRef();

    useEffect(() => {
        if (mapRef.current) return;
        const markers = new VectorLayer({
            source: new VectorSource({
                features: [],
            }),
            style: new Style({
                image: new Icon({
                    src: "https://docs.maptiler.com/openlayers/default-marker/marker-icon.png",
                    anchor: [0.5, 1],
                }),
            }),
        });
        markerSource.current = markers.getSource();
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
        initialMap.on("click", handleMapClick);
        mapRef.current = initialMap;
        setMap(initialMap);
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
            //map.getView().fit(extent, { duration: 2000 });
            map.getView().fit(extent);
        }
        // eslint-disable-next-line
    }, [regionView]);

    function handleMapClick(e) {
        const [lon, lat] = transform(e.coordinate, "EPSG:3857", "EPSG:4326");
        locationClick(lon, lat);
    }

    useEffect(() => {
        if (markerSource && pin.lat && pin.lon) {
            markerSource.current.clear();
            const feature = new Feature({
                geometry: new Point(fromLonLat([pin.lon, pin.lat])),
            });
            markerSource.current.addFeature(feature);
        }
    }, [pin]);

    return (
        <div ref={mapElement} className={styles.miniMap}>
            {!map && (
                <div className={styles.loading}>
                    <div className={styles.spinner} />
                </div>
            )}
        </div>
    );
}
