import React, { useEffect, useState } from "react";
import styles from "../styles/MapFilter.module.css";
import { AiOutlineDoubleLeft } from "react-icons/ai";

export default function EventPreview({ show, closeFilter, setShowSearch }) {
    const [checkedTypes, setCheckedTypes] = useState([]);
    const eventTypes = [
        { name: "misc", label: "Miscellaneous" },
        { name: "sports", label: "Sports & Athletics" },
        { name: "outdoors", label: "Outdoors & Adventures" },
        { name: "arts", label: "Arts & Crafts" },
        { name: "music", label: "Music & Concerts" },
        { name: "games", label: "Fun & Games" },
        { name: "food", label: "Food & Drink" },
        { name: "party", label: "Parties & Celebrations" },
        { name: "health", label: "Health & Wellness" },
        { name: "network", label: "Business & Networking" },
        { name: "volunteer", label: "Charity & Volunteering" },
    ];

    const eventCheckboxes = eventTypes.map(({ name, label }) => (
        <Checkbox
            key={name}
            label={label}
            value={false}
            onChange={handleChange}
        />
    ));

    function handleChange(e) {
        console.log(e.target.checked);
        return;
    }
    return (
        <div
            className={`${styles.container} ${show ? styles.show : undefined}`}
        >
            <AiOutlineDoubleLeft
                className={styles.closeIcon}
                size={25}
                onClick={() => {
                    closeFilter();
                    setShowSearch(true);
                }}
            />
            <h2>Filter by type:</h2>
            {eventCheckboxes}
        </div>
    );
}

const Checkbox = ({ label, value, onChange }) => {
    return (
        <label>
            <input type="checkbox" checked={value} onChange={onChange} />
            {label}
        </label>
    );
};
