import React, { useState } from "react";
import styles from "../../styles/EditProfile/Location.module.css";
import MiniMapWrapper from "../MiniMapWrapper";

export default function LocationTab({ userView, setUserView, active }) {
    return (
        <div className={`${styles.container} ${active ? styles.show : ""}`}>
            <MiniMapWrapper regionView={userView} setUserView={setUserView} />
        </div>
    );
}
