import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import MapWrapper from "../components/MapWrapper";
import styles from "../styles/Posts.module.css";
import PlaceSearch from "../components/PlaceSearch";

export default function Posts() {
    const [regionView, setRegionView] = useState(null);
    const [events, setEvents] = useState([]);

    async function getEvents() {
        try {
            const res = await fetch("/api/posts", {
                method: "GET",
            });
            const data = await res.json();
            setEvents(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getEvents();
        // eslint-disable-next-line
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>MeetUp | Posts</title>
            </Head>
            <PlaceSearch
                style={styles.searchBox}
                setRegionView={setRegionView}
            />
            <MapWrapper regionView={regionView} events={events} />
        </div>
    );
}
