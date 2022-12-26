import React from "react";

export default function PhotoSelection({ prevStep, nextStep, formData }) {
    return (
        <div>
            PhotoSelection
            <button onClick={prevStep}>Previous</button>
            <button onClick={nextStep}>Next</button>
        </div>
    );
}
