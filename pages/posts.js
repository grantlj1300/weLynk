import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import MapWrapper from "../components/MapWrapper";
import styles from "../styles/Posts.module.css";

let autoComplete;

export default function Posts() {
    const [query, setQuery] = useState("");
    const [regionView, setRegionView] = useState({
        lon: -95.54955,
        lat: 40.12426,
    });
    const autoCompleteRef = useRef(null);

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
            lon: addressObject.geometry.location.lng(),
            lat: addressObject.geometry.location.lat(),
        };
        setRegionView(newView);
        console.log(addressObject);
        console.log(addressObject.geometry.location.lat());
    }

    const loadScript = (url, callback) => {
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
    };

    useEffect(() => {
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAP_API_KEY}&libraries=places`,
            () => handleScriptLoad(setQuery, autoCompleteRef)
        );
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>MeetUp | Posts</title>
            </Head>
            <input
                ref={autoCompleteRef}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Enter a City"
                value={query}
            />
            <MapWrapper regionView={regionView} />
        </div>
    );
}
