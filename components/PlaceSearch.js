import React, { useRef, useState } from "react";
import {
    StandaloneSearchBox,
    LoadScript,
    Autocomplete,
} from "@react-google-maps/api";

const libraries = ["places"];

export default function PlaceSearch({ style, setRegionView }) {
    const [query, setQuery] = useState("");
    const autoCompleteRef = useRef(null);

    async function handlePlaceSelect() {
        const addressObject = autoCompleteRef.current.getPlace();
        const query = addressObject.formatted_address;
        console.log(addressObject);
        setQuery(query);
        const newView = {
            maxLon: addressObject.geometry.viewport.getNorthEast().lng(),
            minLon: addressObject.geometry.viewport.getSouthWest().lng(),
            maxLat: addressObject.geometry.viewport.getNorthEast().lat(),
            minLat: addressObject.geometry.viewport.getSouthWest().lat(),
        };
        setRegionView(newView);
    }

    // function handleScriptLoad(updateQuery, autoCompleteRef) {
    //     // autoComplete = new window.google.maps.places.Autocomplete(
    //     //     autoCompleteRef.current,
    //     //     { types: ["(cities)"], componentRestrictions: { country: "us" } }
    //     // );
    //     autoComplete = new window.google.maps.places.Autocomplete(
    //         autoCompleteRef.current
    //     );
    //     autoComplete.setFields([
    //         "address_components",
    //         "formatted_address",
    //         "geometry",
    //     ]);
    //     autoComplete.addListener("place_changed", () =>
    //         handlePlaceSelect(updateQuery)
    //     );
    // }

    return (
        <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_MAP_API_KEY}
            libraries={libraries}
        >
            <Autocomplete
                onLoad={(ref) => (autoCompleteRef.current = ref)}
                onPlaceChanged={handlePlaceSelect}
                fields={["address_components", "formatted_address", "geometry"]}
            >
                <input
                    className={style}
                    ref={autoCompleteRef}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Enter a City"
                    value={query}
                />
            </Autocomplete>
        </LoadScript>
    );
}
