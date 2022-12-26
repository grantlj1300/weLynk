import React from "react";
import PlaceSearch from "../PlaceSearch";

export default function LocationDetails({
    prevStep,
    nextStep,
    handlePlaceSelect,
    formData,
}) {
    return (
        <div>
            <label>
                Address:
                <PlaceSearch
                    handlePlaceSelect={handlePlaceSelect}
                    showSearch={true}
                />
            </label>
            <button onClick={prevStep}>Previous</button>
            <button onClick={nextStep}>Next</button>
        </div>
    );
}
