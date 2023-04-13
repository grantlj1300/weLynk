import { useState, useEffect } from "react";
import Head from "next/head";
import MapWrapper from "../components/MapWrapper";
import styles from "../styles/Events.module.css";
import PlaceSearch from "../components/PlaceSearch";

export default function Events({ user, setUser }) {
    const [regionView, setRegionView] = useState(
        user.defaultRegion ? user.defaultRegion : null
    );
    const [viewport, setViewport] = useState(
        user.defaultRegion ? user.defaultRegion : null
    );
    const [events, setEvents] = useState("loading");
    const [showFilter, setShowFilter] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [showList, setShowList] = useState(false);
    const [filter, setFilter] = useState("all");
    const [activeFilter, setActiveFilter] = useState(filter);
    const [keywords, setKeywords] = useState([]);
    const [activeKeywords, setActiveKeywords] = useState(keywords);

    async function getEvents(coordinates) {
        const keywordStr = keywords
            .map((keyword) => {
                if (keyword.includes(" ")) {
                    return `\"${keyword}\"`;
                }
                return keyword;
            })
            .join(" ");
        const friends = user.friends
            .filter((friend) => friend.status === 2)
            .map((friend) => friend.user);
        const params = {
            ...coordinates,
            filter: filter,
            keywords: keywordStr,
            friends: [...friends, user._id],
        };
        setActiveFilter(filter);
        setActiveKeywords(keywords);
        try {
            const res = await fetch(
                "/api/events?" + new URLSearchParams(params),
                {
                    method: "GET",
                }
            );
            const data = await res.json();
            setEvents(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function handlePlaceSelect(addressObject) {
        if (!addressObject.geometry) return;
        const newView = {
            maxLon: addressObject.geometry.viewport.getNorthEast().lng(),
            minLon: addressObject.geometry.viewport.getSouthWest().lng(),
            maxLat: addressObject.geometry.viewport.getNorthEast().lat(),
            minLat: addressObject.geometry.viewport.getSouthWest().lat(),
        };
        await getEvents(newView);
        setRegionView(newView);
    }

    useEffect(() => {
        getEvents(regionView);
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
                showSearch={!showFilter && !showList && !showPreview}
                refresh={() => getEvents(viewport)}
                filter={() => {
                    setFilter(activeFilter);
                    setKeywords(activeKeywords);
                    setShowFilter(true);
                }}
            />
            <MapWrapper
                regionView={regionView}
                events={events}
                user={user}
                setUser={setUser}
                viewport={viewport}
                setViewport={setViewport}
                showFilter={showFilter}
                setShowFilter={setShowFilter}
                showList={showList}
                setShowList={setShowList}
                filterEvents={() => getEvents(viewport)}
                filter={filter}
                setFilter={setFilter}
                keywords={keywords}
                setKeywords={setKeywords}
                showPreview={showPreview}
                setShowPreview={setShowPreview}
            />
        </div>
    );
}
