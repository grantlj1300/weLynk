import React, { useState } from "react";
import styles from "../../styles/BuildEvent.module.css";
import PlaceSearch from "../PlaceSearch";
import MiniMapWrapper from "../MiniMapWrapper";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

export default function LocationDetails({
    prevStep,
    nextStep,
    handlePlaceSelect,
    setFormData,
    formData,
}) {
    const [regionView, setRegionView] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const geocoder = new google.maps.Geocoder();

    function selectPlace(addressObject) {
        if (!addressObject.geometry) return;
        setAddresses([]);
        const newView = {
            maxLon: addressObject.geometry.viewport.getNorthEast().lng(),
            minLon: addressObject.geometry.viewport.getSouthWest().lng(),
            maxLat: addressObject.geometry.viewport.getNorthEast().lat(),
            minLat: addressObject.geometry.viewport.getSouthWest().lat(),
        };
        setRegionView(newView);
        handlePlaceSelect(addressObject);
    }

    function locationClick(lon, lat) {
        geocoder.geocode({ location: { lat: lat, lng: lon } }).then((res) => {
            if (res.results[0]) {
                setFormData((prevData) => ({
                    ...prevData,
                    location: { type: "Point", coordinates: [lon, lat] },
                }));
                const addressList = res.results.flatMap((location) =>
                    location.types.includes("plus_code")
                        ? []
                        : location.formatted_address
                );
                setAddresses(addressList);
            }
        });
    }

    const addressOptions =
        addresses &&
        addresses.map((address, i) => (
            <div
                className={styles.addressOption}
                key={i}
                onClick={() =>
                    setFormData((prevData) => ({
                        ...prevData,
                        address: addresses[i],
                    }))
                }
            >
                {address}
            </div>
        ));

    function handleNext() {
        const { address, location } = formData;
        if (address && location.coordinates.length == 2) nextStep();
    }

    return (
        <div className={styles.formBody}>
            <label className={styles.label}>
                Search a Location:
                <PlaceSearch
                    handlePlaceSelect={selectPlace}
                    showSearch={true}
                />
            </label>
            <MiniMapWrapper
                regionView={regionView}
                pin={formData.location.coordinates}
                locationClick={locationClick}
            />
            <div className={styles.addressOptionsContainer}>
                {addressOptions}
            </div>
            <div className={styles.buttonContainer}>
                <MdNavigateBefore
                    className={styles.button}
                    onClick={prevStep}
                    size={35}
                />
                <MdNavigateNext
                    className={styles.button}
                    onClick={handleNext}
                    size={35}
                />
            </div>
        </div>
    );
}
