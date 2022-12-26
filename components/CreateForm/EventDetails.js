import React from "react";
import styles from "../../styles/CreatePost.module.css";

export default function EventDetails({ nextStep, handleChange, formData }) {
    return (
        <div className={styles.detailsContainer}>
            <label className={styles.label}>Event Name:</label>
            <input
                className={styles.input}
                type="text"
                name="title"
                placeholder="Enter a title for your event"
                value={formData.name}
                onChange={handleChange}
            />
            <label className={styles.label}>Date:</label>
            <input
                className={styles.input}
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
            />
            <label className={styles.label}>Time:</label>
            <input
                className={styles.input}
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}
            />
            <label className={styles.label}>Description:</label>
            <textarea
                name="description"
                rows={4}
                style={{ resize: "none" }}
                value={formData.description}
                onChange={handleChange}
            />
            <button onClick={nextStep}>Next</button>
        </div>
    );
}
