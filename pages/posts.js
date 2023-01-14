import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import MapWrapper from "../components/MapWrapper";
import styles from "../styles/Posts.module.css";
import PlaceSearch from "../components/PlaceSearch";

export default function Posts() {
    const [regionView, setRegionView] = useState(null);
    const [events, setEvents] = useState("loading");
    const [showSearch, setShowSearch] = useState(false);

    async function getEvents() {
        try {
            const res = await fetch("/api/posts", {
                method: "GET",
            });
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
                <title>weLynk | Posts</title>
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
            />
        </div>
    );
}
