import React, { useState } from "react";
import styles from "../styles/CreatePost.module.css";
import PlaceSearch from "./PlaceSearch";

export default function CreatePost() {
    const [formData, setFormData] = useState({
        title: "",
        address: "",
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

    function handlePlaceSelect(addressObject) {
        setFormData((prevData) => ({
            ...prevData,
            address: addressObject.formatted_address,
            lon: addressObject.geometry.location.lng(),
            lat: addressObject.geometry.location.lat(),
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!formData.address || !formData.lon || !formData.lat) return;
        await postEvent();
    }

    async function postEvent() {
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
        <form className={styles.formContent} onSubmit={handleSubmit}>
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
                Address:
                <PlaceSearch
                    handlePlaceSelect={handlePlaceSelect}
                    showSearch={true}
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
