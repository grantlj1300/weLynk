import React, { useRef, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";

export default function PlaceSearch({ style, handlePlaceSelect, showSearch }) {
    const [query, setQuery] = useState("");
    const autoCompleteRef = useRef(null);

    async function selectPlace() {
        const addressObject = autoCompleteRef.current.getPlace();
        const query = addressObject.formatted_address;
        setQuery(query);
        handlePlaceSelect(addressObject);
    }

    return (
        <Autocomplete
            onLoad={(ref) => (autoCompleteRef.current = ref)}
            onPlaceChanged={selectPlace}
            fields={["address_components", "formatted_address", "geometry"]}
        >
            <input
                className={style}
                style={
                    showSearch
                        ? { visibility: "visible" }
                        : { visibility: "hidden" }
                }
                ref={autoCompleteRef}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a location"
                value={query}
            />
        </Autocomplete>
    );
}
