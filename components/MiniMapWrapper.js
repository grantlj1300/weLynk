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

export default function MiniMapWrapper({
    regionView,
    pin,
    locationClick,
    setUserView,
}) {
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
        if (regionView) {
            if (regionView.minLon > regionView.maxLon) {
                if (regionView.minLon > 0) {
                    regionView.minLon -= 360;
                } else {
                    regionView.maxLon += 360;
                }
            }
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
        locationClick
            ? initialMap.on("click", handleMapClick)
            : initialMap.on("moveend", handleMapMove);
        mapRef.current = initialMap;
        setMap(initialMap);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (map && regionView && !setUserView) {
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

    function handleMapMove(e) {
        var [left, bottom, right, top] = transformExtent(
            e.frameState.extent,
            "EPSG:3857",
            "EPSG:4326"
        );
        if (left <= -180) {
            let wraps = Math.floor(left / -180);
            left += (wraps + (wraps % 2)) * 180;
        } else if (left >= 180) {
            let wraps = Math.floor(left / 180);
            left -= (wraps + (wraps % 2)) * 180;
        }
        if (right <= -180) {
            let wraps = Math.floor(right / -180);
            right += (wraps + (wraps % 2)) * 180;
        } else if (right >= 180) {
            let wraps = Math.floor(right / 180);
            right -= (wraps + (wraps % 2)) * 180;
        }
        console.log(left, right);
        setUserView({
            minLon: left,
            minLat: bottom,
            maxLon: right,
            maxLat: top,
        });
    }

    useEffect(() => {
        if (markerSource && pin && pin.length === 2) {
            markerSource.current.clear();
            const feature = new Feature({
                geometry: new Point(fromLonLat([pin[0], pin[1]])),
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
