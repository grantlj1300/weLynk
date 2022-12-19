import React, { useState } from "react";
import styles from "../../styles/CreatePost.module.css";

export default function create() {
    const [formData, setFormData] = useState({
        title: "",
        lon: "",
        lat: "",
        description: "",
        date: "",
        time: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    async function postEvent(e) {
        e.preventDefault();
        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className={styles.formContent} onSubmit={postEvent}>
            <label>
                Event Name:
                <input
                    type="text"
                    name="title"
                    value={formData.name}
                    onChange={handleChange}
                />
            </label>
            <label>
                Lon:
                <input
                    type="text"
                    name="lon"
                    value={formData.lon}
                    onChange={handleChange}
                />
                Lat:
                <input
                    type="text"
                    name="lat"
                    value={formData.lat}
                    onChange={handleChange}
                />
            </label>
            <label>
                Description:
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </label>
            <label>
                Date:
                <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                />
            </label>
            <label>
                Time:
                <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                />
            </label>
            <input type="submit" />
        </form>
    );
}
