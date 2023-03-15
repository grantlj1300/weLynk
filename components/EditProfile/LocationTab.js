import React, { useState } from "react";
import styles from "../../styles/EditProfile/Location.module.css";
import MiniMapWrapper from "../MiniMapWrapper";

export default function LocationTab({ userView, setUserView, active }) {
    return active ? (
        <div className={`${styles.container} ${active ? styles.show : ""}`}>
            <div className={styles.textContainer}>
                <h2 className={styles.header}>Select a default location</h2>
                <p className={styles.prompt}>
                    Pan to a region on the map to set as your default view
                </p>
            </div>
            <MiniMapWrapper regionView={userView} setUserView={setUserView} />
        </div>
    ) : (
        <div />
    );
}
