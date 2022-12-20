import React from "react";
import styles from "../styles/EventPreview.module.css";

export default function EventPreview({ event }) {
    return event ? (
        <div className={styles.infoBox}>
            <h1>{event.title}</h1>
            <h5>
                {event.time} {event.date}
            </h5>
            <p>{event.description}</p>
        </div>
    ) : (
        <div />
    );
}
