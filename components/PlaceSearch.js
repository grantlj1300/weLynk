import React, { useRef, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { IoMdRefresh } from "react-icons/io";
import { BsFilterLeft } from "react-icons/bs";
import styles from "../styles/PlaceSearch.module.css";

export default function PlaceSearch({
    handlePlaceSelect,
    showSearch,
    refresh,
    regionView,
    filter,
}) {
    const [query, setQuery] = useState("");
    const autoCompleteRef = useRef(null);

    async function selectPlace() {
        const addressObject = autoCompleteRef.current.getPlace();
        const query = addressObject.formatted_address;
        setQuery(query);
        handlePlaceSelect(addressObject);
    }
    console.log(autoCompleteRef.current);
    return (
        <Autocomplete
            onLoad={(ref) => (autoCompleteRef.current = ref)}
            onPlaceChanged={selectPlace}
            fields={["address_components", "formatted_address", "geometry"]}
        >
            <div
                className={`${styles.container} ${
                    showSearch ? styles.show : ""
                } ${refresh ? "" : styles.mini} ${
                    query.length > 0 ? styles.dropdown : ""
                }`}
            >
                <input
                    className={`${styles.search} ${refresh ? styles.main : ""}`}
                    ref={autoCompleteRef}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search a location"
                    value={query}
                />
                {filter && (
                    <BsFilterLeft
                        className={`${styles.button} ${styles.filter}`}
                        size={30}
                        onClick={() => filter()}
                    />
                )}
                {refresh && (
                    <IoMdRefresh
                        className={styles.button}
                        size={25}
                        onClick={() => refresh(regionView)}
                    />
                )}
            </div>
        </Autocomplete>
    );
}
