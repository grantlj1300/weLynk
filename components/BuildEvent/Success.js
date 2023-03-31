import React from "react";
import styles from "../../styles/BuildEvent.module.css";

export default function Success() {
    return (
        <div className={`${styles.formBody} ${styles.success}`}>
            <h1>Event successfully posted!</h1>
        </div>
    );
}
