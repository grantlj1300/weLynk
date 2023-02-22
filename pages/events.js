import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import MapWrapper from "../components/MapWrapper";
import styles from "../styles/Events.module.css";
import PlaceSearch from "../components/PlaceSearch";

export default function Events({ user, setUser }) {
    const [regionView, setRegionView] = useState(user.defaultRegion);
    const [events, setEvents] = useState("loading");
    const [showSearch, setShowSearch] = useState(false);

    async function getEvents() {
        try {
            const res = await fetch(
                "/api/events?" +
                    new URLSearchParams({
                        minLon: user.defaultRegion.minLon,
                        maxLon: user.defaultRegion.maxLon,
                        minLat: user.defaultRegion.minLat,
                        maxLat: user.defaultRegion.maxLat,
                    }),
                {
                    method: "GET",
                }
            );
            const data = await res.json();
            setEvents(data);
            setShowSearch(true);
        } catch (error) {
            console.log(error);
        }
    }

    function handlePlaceSelect(addressObject) {
        if (!addressObject.geometry) return;
        const newView = {
            maxLon: addressObject.geometry.viewport.getNorthEast().lng(),
            minLon: addressObject.geometry.viewport.getSouthWest().lng(),
            maxLat: addressObject.geometry.viewport.getNorthEast().lat(),
            minLat: addressObject.geometry.viewport.getSouthWest().lat(),
        };
        setRegionView(newView);
    }

    useEffect(() => {
        getEvents();
        // eslint-disable-next-line
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>weLynk | Events</title>
            </Head>
            <PlaceSearch
                idStyle={styles.searchBox}
                classStyle={styles.showBox}
                handlePlaceSelect={handlePlaceSelect}
                showSearch={showSearch}
            />
            <MapWrapper
                regionView={regionView}
                events={events}
                setShowSearch={setShowSearch}
                user={user}
                setUser={setUser}
            />
        </div>
    );
}
