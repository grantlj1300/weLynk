import React, { useState } from "react";
import styles from "../styles/CreatePost.module.css";
import PlaceSearch from "./PlaceSearch";
import Image from "next/image";
import { AiTwotoneCalendar } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";

export default function CreatePost() {
    const [formData, setFormData] = useState({
        title: "",
        photoURL: "",
        address: "",
        lon: "",
        lat: "",
        description: "",
        date: "",
        time: "",
    });
    const [imageOptions, setImageOptions] = useState([]);

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
        setImageOptions(addressObject.photos);
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

    function getImageOptionStyle(match) {
        if (match) return `${styles.imageOption} ${styles.selected}`;
        else return styles.imageOption;
    }

    const googlePhotos =
        imageOptions &&
        imageOptions.map((image, idx) => {
            const url = image.getUrl();
            return (
                <Image
                    src={url}
                    alt="googleOpt"
                    className={getImageOptionStyle(url === formData.photoURL)}
                    width={300}
                    height={200}
                    key={idx}
                    onClick={() =>
                        setFormData((prev) => ({
                            ...prev,
                            photoURL: url,
                        }))
                    }
                />
            );
        });

    return (
        <div className={styles.container}>
            <h1>Build Your Event</h1>
            <div className={styles.body}>
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
                    <div className={styles.imageOptions}>{googlePhotos}</div>
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
                <div className={styles.infoBox}>
                    <div className={styles.imageContainer}>
                        <Image
                            src={
                                formData.photoURL
                                    ? formData.photoURL
                                    : "/assets/img/img-not-available.jpg"
                            }
                            alt="event"
                            fill={true}
                            className={styles.image}
                            sizes="100%"
                        />
                    </div>
                    <div className={styles.previewContent}>
                        <div className={styles.previewHeader}>
                            <h1>{formData.title || "Event Title"}</h1>
                            <h5 className={styles.subheader}>
                                <AiTwotoneCalendar
                                    size={20}
                                    className={styles.bodyIcon}
                                />
                                {formData.date || "Date"} -{" "}
                                {formData.time || "Time"}
                            </h5>
                            <h5 className={styles.subheader}>
                                <IoLocationSharp
                                    size={20}
                                    className={styles.bodyIcon}
                                />
                                {formData.address || "Address"}
                            </h5>
                        </div>
                        <p className={styles.description}>
                            {formData.description || "Description"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
