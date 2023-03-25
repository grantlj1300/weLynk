import React from "react";
import styles from "../styles/MapFilter.module.css";
import { AiOutlineDoubleLeft, AiOutlinePlusCircle } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";

export default function EventPreview({
    show,
    setShowFilter,
    filterEvents,
    setFilter,
    filter,
    keywords,
    setKeywords,
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
        ([name, label]) => (
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
        )
    );

    const keywordInputs = keywords.map((keyword, idx) => (
        <div key={idx} className={styles.input}>
            <IoTrashOutline
                size={19}
                className={styles.deleteButton}
                onClick={() => handleInputDelete(idx)}
            />
            <input
                className={styles.inputField}
                placeholder="Keyword"
                value={keyword}
                onChange={(e) => handleKeywordChange(e, idx)}
            />
        </div>
    ));

    function handleCheckboxClick(e) {
        const { name, checked } = e.target;
        if (filter === "all") setFilter("");
        if (checked) setFilter((prev) => [...prev, name]);
        else setFilter((prev) => prev.filter((type) => type !== name));
    }

    function handleRadioClick() {
        setFilter("all");
    }

    function handleAddKeyword() {
        setKeywords((prev) => [...prev, ""]);
    }

    function handleInputDelete(idx) {
        let updatedKeywords = [...keywords];
        updatedKeywords.splice(idx, 1);
        setKeywords(updatedKeywords);
    }

    function handleKeywordChange(e, idx) {
        let updatedKeywords = [...keywords];
        updatedKeywords[idx] = e.target.value;
        setKeywords(updatedKeywords);
    }

    async function handleFilter(e) {
        e.preventDefault();
        setKeywords(keywords.filter((keyword) => keyword !== ""));
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
                onClick={() => setShowFilter(false)}
            />
            <form className={styles.form}>
                <h2>Filter by type:</h2>
                <div className={styles.line} />
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
                <h2>Filter by keywords:</h2>
                <div className={styles.line} />
                <div className={styles.checkContainer}>
                    {keywordInputs}
                    {!keywords.includes("") && (
                        <div className={styles.add} onClick={handleAddKeyword}>
                            <AiOutlinePlusCircle
                                size={17}
                                className={styles.addButton}
                            />
                            Add keyword
                        </div>
                    )}
                </div>
                <button className={styles.submit} onClick={handleFilter}>
                    Filter Events
                </button>
            </form>
        </div>
    );
}
