import React from "react";
import styles from "../../styles/BuildEvent.module.css";
import { MdNavigateNext } from "react-icons/md";

export default function EventDetails({
    nextStep,
    handleChange,
    formData,
    setFormData,
}) {
    function handleNext() {
        const { title, date, time, description } = formData;
        if (title && date && time && description) nextStep();
    }
    console.log(formData.isPublic);
    return (
        <div className={styles.formBody}>
            <label className={styles.label}>Event Name:</label>
            <input
                className={styles.input}
                type="text"
                name="title"
                placeholder="Enter a title for your event"
                value={formData.title}
                onChange={handleChange}
            />
            <div className={styles.dateTime}>
                <div className={styles.entry}>
                    <label className={styles.label}>Date:</label>
                    <input
                        className={styles.input}
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.entry}>
                    <label className={styles.label}>Time:</label>
                    <input
                        className={styles.input}
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <label className={styles.label}>Visibility:</label>
            <div>
                <label className={styles.visibility}>
                    <input
                        type="radio"
                        name="isPublic"
                        value={true}
                        checked={formData.isPublic === true}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                isPublic: JSON.parse(e.target.value),
                            })
                        }
                    />{" "}
                    Public
                </label>
                <label className={styles.visibility}>
                    <input
                        type="radio"
                        name="isPublic"
                        value={false}
                        checked={formData.isPublic === false}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                isPublic: JSON.parse(e.target.value),
                            })
                        }
                    />{" "}
                    Friends Only
                </label>
            </div>
            <label className={styles.label}>Event Type:</label>
            <select
                className={styles.input}
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
            >
                <option value="misc">Miscellaneous</option>
                <option value="sports">Sports & Athletics</option>
                <option value="outdoors">Outdoors & Adventures</option>
                <option value="arts">Arts & Crafts</option>
                <option value="music">Music & Concerts</option>
                <option value="games">Fun & Games</option>
                <option value="food">Food & Drink</option>
                <option value="party">Parties & Celebrations</option>
                <option value="health">Health & Wellness</option>
                <option value="network">Business & Networking</option>
                <option value="volunteer">Charity & Volunteering</option>
            </select>
            <label className={styles.label}>Description:</label>
            <textarea
                name="description"
                rows={4}
                style={{ resize: "none" }}
                value={formData.description}
                onChange={handleChange}
                className={`${styles.input} ${styles.descInput}`}
            />
            <div className={styles.buttonContainer}>
                <div style={{ width: 150 }} />
                <MdNavigateNext
                    className={styles.button}
                    onClick={handleNext}
                    size={35}
                />
            </div>
        </div>
    );
}
