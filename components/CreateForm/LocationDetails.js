import React, { useState } from "react";
import styles from "../../styles/CreatePost.module.css";
import PlaceSearch from "../PlaceSearch";
import MiniMapWrapper from "../MiniMapWrapper";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

export default function LocationDetails({
    prevStep,
    nextStep,
    handlePlaceSelect,
    formData,
}) {
    const [regionView, setRegionView] = useState(null);

    function selectPlace(addressObject) {
        if (!addressObject.geometry) return;
        const newView = {
            maxLon: addressObject.geometry.viewport.getNorthEast().lng(),
            minLon: addressObject.geometry.viewport.getSouthWest().lng(),
            maxLat: addressObject.geometry.viewport.getNorthEast().lat(),
            minLat: addressObject.geometry.viewport.getSouthWest().lat(),
        };
        setRegionView(newView);
        handlePlaceSelect(addressObject);
    }

    return (
        <div className={styles.formBody}>
            <label className={styles.label}>
                Address:
                <PlaceSearch
                    handlePlaceSelect={selectPlace}
                    showSearch={true}
                />
            </label>
            <MiniMapWrapper regionView={regionView} />
            <div className={styles.buttonContainer}>
                <MdNavigateBefore
                    className={styles.button}
                    onClick={prevStep}
                    size={35}
                />
                <MdNavigateNext
                    className={styles.button}
                    onClick={nextStep}
                    size={35}
                />
            </div>
        </div>
    );
}
