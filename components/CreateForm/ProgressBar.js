import React, { useState } from "react";
import styles from "../../styles/CreateEvent.module.css";
import { TfiWrite } from "react-icons/tfi";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlinePhoto } from "react-icons/hi2";
import { BsPatchCheck } from "react-icons/bs";

export default function ProgressBar({ step, stepStyles }) {
    function setStyles(thisStep) {
        if (thisStep < step) {
            return `${styles.progressLine} ${styles.completed}`;
        } else return `${styles.progressLine}`;
    }

    return (
        <div className={styles.progressBarContainer}>
            <div className={styles.progressStep}>
                <div className={stepStyles[0]}>
                    <TfiWrite className={styles.progressIcon} size={20} />
                </div>
                <div>Details</div>
            </div>
            <div className={setStyles(1)} />
            <div className={styles.progressStep}>
                <div className={stepStyles[1]}>
                    <IoLocationOutline
                        className={styles.progressIcon}
                        size={20}
                    />
                </div>
                <div>Location</div>
            </div>
            <div className={setStyles(2)} />
            <div className={styles.progressStep}>
                <div className={stepStyles[2]}>
                    <HiOutlinePhoto className={styles.progressIcon} size={20} />
                </div>
                <div>Photo</div>
            </div>
            <div className={setStyles(3)} />
            <div className={styles.progressStep}>
                <div className={stepStyles[3]}>
                    <BsPatchCheck className={styles.progressIcon} size={20} />
                </div>
                <div>Success</div>
            </div>
        </div>
    );
}
