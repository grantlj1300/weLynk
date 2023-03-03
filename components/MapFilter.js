import React, { useEffect, useState } from "react";
import styles from "../styles/MapFilter.module.css";
import { AiOutlineDoubleLeft } from "react-icons/ai";

export default function EventPreview({
    show,
    setShowFilter,
    setShowSearch,
    filterEvents,
    setFilter,
    filter,
}) {
    const checkedTypes = {
        misc: "Miscellaneous",
        sports: "Sports & Athletics",
        outdoors: "Outdoors & Adventures",
        arts: "Arts & Crafts",
        music: "Music & Concerts",
        games: "Fun & Games",
        food: "Food & Drink",
        party: "Parties & Celebrations",
        health: "Health & Wellness",
        network: "Business & Networking",
        volunteer: "Charity & Volunteering",
    };

    const eventCheckboxes = Object.entries(checkedTypes).map(
        ([name, label]) => {
            return (
                <label key={name} className={styles.option}>
                    <input
                        className={styles.optionCheck}
                        type="checkbox"
                        checked={filter.includes(name)}
                        name={name}
                        onChange={handleCheckboxClick}
                    />
                    {label}
                </label>
            );
        }
    );

    function handleCheckboxClick(e) {
        const { name, checked } = e.target;
        if (filter === "all") setFilter("");
        if (checked) setFilter((prev) => [...prev, name]);
        else setFilter((prev) => prev.filter((type) => type !== name));
    }

    function handleRadioClick() {
        setFilter("all");
    }

    async function handleFilter(e) {
        e.preventDefault();
        await filterEvents();
        setShowFilter(false);
    }

    return (
        <div
            className={`${styles.container} ${show ? styles.show : undefined}`}
        >
            <AiOutlineDoubleLeft
                className={styles.closeIcon}
                size={25}
                onClick={() => {
                    setShowFilter(false);
                    setShowSearch(true);
                }}
            />
            <form className={styles.form}>
                <h2>Filter by type:</h2>
                <label className={styles.option}>
                    <input
                        className={styles.optionCheck}
                        type="radio"
                        checked={filter === "all"}
                        onChange={handleRadioClick}
                    />
                    All
                </label>
                <div className={styles.checkContainer}>{eventCheckboxes}</div>
                <button className={styles.submit} onClick={handleFilter}>
                    Filter Events
                </button>
            </form>
        </div>
    );
}
