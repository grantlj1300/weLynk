import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import MapWrapper from "../components/MapWrapper";
import styles from "../styles/Posts.module.css";

let autoComplete;

export default function Posts() {
    const [query, setQuery] = useState("");
    const [regionView, setRegionView] = useState(null);
    const [events, setEvents] = useState([]);
    const autoCompleteRef = useRef(null);

    async function getEvents() {
        try {
            const res = await fetch("/api/posts", {
                method: "GET",
            });
            const data = await res.json();
            setEvents(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    function handleScriptLoad(updateQuery, autoCompleteRef) {
        // autoComplete = new window.google.maps.places.Autocomplete(
        //     autoCompleteRef.current,
        //     { types: ["(cities)"], componentRestrictions: { country: "us" } }
        // );
        autoComplete = new window.google.maps.places.Autocomplete(
            autoCompleteRef.current
        );
        autoComplete.setFields([
            "address_components",
            "formatted_address",
            "geometry",
        ]);
        autoComplete.addListener("place_changed", () =>
            handlePlaceSelect(updateQuery)
        );
    }

    async function handlePlaceSelect(updateQuery) {
        const addressObject = autoComplete.getPlace();
        const query = addressObject.formatted_address;
        updateQuery(query);
        const newView = {
            maxLon: addressObject.geometry.viewport.getNorthEast().lng(),
            minLon: addressObject.geometry.viewport.getSouthWest().lng(),
            maxLat: addressObject.geometry.viewport.getNorthEast().lat(),
            minLat: addressObject.geometry.viewport.getSouthWest().lat(),
        };
        setRegionView(newView);
        console.log(addressObject);
        console.log(newView);
    }

    function loadScript(url, callback) {
        let script = document.createElement("script");
        script.type = "text/javascript";

        if (script.readyState) {
            script.onreadystatechange = function () {
                if (
                    script.readyState === "loaded" ||
                    script.readyState === "complete"
                ) {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = () => callback();
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    useEffect(() => {
        getEvents().then(() => {
            console.log("here");
            loadScript(
                `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAP_API_KEY}&libraries=places`,
                () => handleScriptLoad(setQuery, autoCompleteRef)
            );
        });
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>MeetUp | Posts</title>
            </Head>
            <input
                className={styles.searchBox}
                ref={autoCompleteRef}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Enter a City"
                value={query}
            />
            <MapWrapper regionView={regionView} events={events} />
        </div>
    );
}
