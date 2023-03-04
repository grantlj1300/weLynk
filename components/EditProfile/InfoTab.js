import React, { useState } from "react";
import styles from "../../styles/EditProfile/Info.module.css";

export default function InfoTab({ infoForm, setInfoForm, active }) {
    function handleChange(e) {
        const { name, value } = e.target;
        setInfoForm((prevData) => ({ ...prevData, [name]: value }));
    }
    return (
        <div className={`${styles.container} ${active ? styles.show : ""}`}>
            <div className={styles.infoNamesContainer}>
                <label className={styles.label}>
                    First
                    <input
                        className={styles.input}
                        name="first"
                        value={infoForm.first}
                        onChange={handleChange}
                        placeholder="First"
                        maxLength={20}
                    />
                </label>
                <label className={styles.label}>
                    Last
                    <input
                        className={styles.input}
                        name="last"
                        value={infoForm.last}
                        onChange={handleChange}
                        placeholder="Last"
                        maxLength={20}
                    />
                </label>
            </div>
            <label className={styles.label}>
                Email
                <input
                    className={styles.input}
                    name="email"
                    value={infoForm.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
            </label>
            <label className={styles.label}>Bio</label>
            <textarea
                name="bio"
                placeholder="Enter a bio"
                className={styles.inputBio}
                rows={4}
                value={infoForm.bio}
                onChange={handleChange}
            />
        </div>
    );
}
