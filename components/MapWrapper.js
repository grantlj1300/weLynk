import React, { useState, useEffect, useRef } from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import styles from "../styles/MapWrapper.module.css";
import { Map, View, Feature, Overlay } from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { fromLonLat, transformExtent } from "ol/proj";
import MapboxVector from "ol/layer/MapboxVector";
import { Point } from "ol/geom";
import { Style, Icon } from "ol/style";
import EventPreview from "./EventPreview";
import MapFilter from "./MapFilter";
import EventList from "./EventList";

export default function MapWrapper({
    regionView,
    setViewport,
    events,
    user,
    setUser,
    showFilter,
    setShowFilter,
    filterEvents,
    filter,
    setFilter,
    keywords,
    setKeywords,
    showList,
    setShowList,
    showPreview,
    setShowPreview,
    eventVisibility,
    setEventVisibility,
}) {
    const [map, setMap] = useState();
    const [currentEvent, setCurrentEvent] = useState();
    const [markerSource, setMarkerSource] = useState();
    const overlaySource = useRef();
    const mapElement = useRef();
    const mapRef = useRef();

    useEffect(() => {
        if (mapRef.current) return;
        const markers = new VectorLayer({
            source: new VectorSource({
                features: [],
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
        const overlay = new Overlay({
            element: document.getElementById("popup"),
            positioning: "bottom-center",
            offset: [0, -62],
        });
        overlaySource.current = overlay;
        initialMap.addOverlay(overlay);
        initialMap.on("click", handleMapClick);
        initialMap.on("pointermove", handlePointerMove);
        initialMap.on("moveend", handleMapMove);
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

    useEffect(() => {
        if (map && currentEvent) {
            map.getView().animate({
                center: fromLonLat(currentEvent.location.coordinates),
            });
        }
        // eslint-disable-next-line
    }, [currentEvent]);

    useEffect(() => {
        if (map) {
            markerSource.clear();
            const features = events.map((event) => {
                const feature = new Feature({
                    geometry: new Point(
                        fromLonLat([
                            event.location.coordinates[0],
                            event.location.coordinates[1],
                        ])
                    ),
                    event: event,
                });
                const iconStyle = new Style({
                    image: new Icon({
                        src: "/assets/icons/" + event.eventType + ".png",
                        anchor: [0.5, 1],
                    }),
                });
                feature.setStyle(iconStyle);
                feature.setId(event._id);
                return feature;
            });

            markerSource.addFeatures(features);
        }
        // eslint-disable-next-line
    }, [events]);

    function handlePointerMove(e) {
        const hovered = mapRef.current.forEachFeatureAtPixel(
            e.pixel,
            (feature) => {
                return feature;
            }
        );
        if (hovered instanceof Feature) {
            var clickedon = mapRef.current.getCoordinateFromPixel(e.pixel);
            var offset = Math.floor(clickedon[0] / 40075016.68 + 0.5);
            const coord = hovered.getGeometry().getCoordinates();
            coord[0] += offset * 20037508.34 * 2;
            let container = document.getElementById("popup");
            container.innerHTML = `<div class="${
                styles.tail
            }"></div> <div class="${styles.borderTail}"></div> ${
                hovered.get("event").title
            }`;
            e.map.getTargetElement().style.cursor = "pointer";
            overlaySource.current.setPosition(coord);
        } else {
            overlaySource.current.setPosition(undefined);
            e.map.getTargetElement().style.cursor = "";
        }
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
        setViewport({
            minLon: left,
            minLat: bottom,
            maxLon: right,
            maxLat: top,
        });
    }

    function handleMapClick(e) {
        const clicked = mapRef.current.forEachFeatureAtPixel(
            e.pixel,
            (feature) => {
                return feature;
            }
        );
        setShowFilter(false);
        if (clicked instanceof Feature) {
            setCurrentEvent(clicked.get("event"));
            setShowPreview(true);
        } else {
            setShowList(false);
            closeEventPreview();
        }
    }

    function closeEventPreview() {
        setShowPreview(false);
        const prevEvent = currentEvent;
        setTimeout(() => {
            if (currentEvent === prevEvent) setCurrentEvent(null);
        }, 300);
    }

    return (
        <div ref={mapElement} className={styles.map}>
            <div id="popup" className={styles.popup}></div>
            {events === "loading" && (
                <div className={styles.loading}>
                    <div className={styles.spinner} />
                </div>
            )}
            {events !== "loading" && (
                <EventList
                    events={events}
                    show={showList}
                    setShowList={setShowList}
                    selected={currentEvent}
                    setSelected={setCurrentEvent}
                    setShowPreview={setShowPreview}
                />
            )}
            {!showList && (
                <AiOutlineDoubleRight
                    size={30}
                    className={styles.openList}
                    onClick={() => setShowList(true)}
                />
            )}
            <MapFilter
                show={showFilter}
                setShowFilter={setShowFilter}
                filterEvents={filterEvents}
                filter={filter}
                setFilter={setFilter}
                keywords={keywords}
                setKeywords={setKeywords}
                eventVisibility={eventVisibility}
                setEventVisibility={setEventVisibility}
            />
            <EventPreview
                event={currentEvent}
                setEvent={setCurrentEvent}
                show={showPreview}
                closeEventPreview={closeEventPreview}
                user={user}
                setUser={setUser}
            />
        </div>
    );
}
