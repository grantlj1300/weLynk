import React, { useState } from "react";
import styles from "../styles/CreatePost.module.css";
import PlaceSearch from "./PlaceSearch";
import Image from "next/image";

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
    const [selectedImg, setSelectedImg] = useState();

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

    // function selectPhoto(idx, image) {
    //     setSelectedImg(idx);
    // setFormData((prev) => ({
    //     ...prev,
    //     photoURL: image.getURL(),
    // }));
    // }

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
    );
}
