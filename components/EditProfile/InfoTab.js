import React, { useState } from "react";
import styles from "../../styles/EditProfile/Info.module.css";

export default function InfoTab({
    infoForm,
    setInfoForm,
    errors,
    setErrors,
    active,
}) {
    function handleChange(e) {
        const { name, value } = e.target;
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
        setInfoForm((prevData) => ({ ...prevData, [name]: value }));
    }

    return (
        <div className={`${styles.container} ${active ? styles.show : ""}`}>
            <div className={styles.miniBlock}>
                <label className={styles.label}>
                    Display Name
                    {errors.name && (
                        <div className={styles.error}>{errors.name}</div>
                    )}
                    <input
                        className={styles.input}
                        name="name"
                        value={infoForm.name}
                        onChange={handleChange}
                        placeholder="Name"
                        maxLength={20}
                    />
                </label>
            </div>
            <div className={styles.miniBlock}>
                <label className={styles.label}>
                    Email
                    {errors.email && (
                        <div className={styles.error}>{errors.email}</div>
                    )}
                    <input
                        className={styles.input}
                        name="email"
                        value={infoForm.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                </label>
            </div>
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
