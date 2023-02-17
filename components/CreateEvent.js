import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/CreateEvent.module.css";
import { AiTwotoneCalendar } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import EventDetails from "./CreateForm/EventDetails";
import LocationDetails from "./CreateForm/LocationDetails";
import PhotoSelection from "./CreateForm/PhotoSelection";
import Success from "./CreateForm/Success";
import ProgressBar from "./CreateForm/ProgressBar";

export default function CreateEvent({ user }) {
    const [formStep, setFormStep] = useState(1);
    const [formData, setFormData] = useState({
        admin: user._id,
        members: [user._id],
        title: "",
        photo: "",
        address: "",
        lon: "",
        lat: "",
        description: "",
        date: "",
        time: "",
    });
    const [stepStyles, setStepStyles] = useState([
        `${styles.progressIconContainer} ${styles.completed}`,
        `${styles.progressIconContainer}`,
        `${styles.progressIconContainer}`,
        `${styles.progressIconContainer}`,
    ]);

    function prevStep() {
        const newStyles = stepStyles.map((style, idx) =>
            idx < formStep - 1
                ? `${styles.progressIconContainer} ${styles.completed}`
                : `${styles.progressIconContainer}`
        );
        setStepStyles(newStyles);
        setFormStep((prev) => prev - 1);
    }

    function nextStep() {
        setTimeout(() => {
            const newStyles = stepStyles.map((style, idx) =>
                idx <= formStep
                    ? `${styles.progressIconContainer} ${styles.completed}`
                    : `${styles.progressIconContainer}`
            );
            setStepStyles(newStyles);
        }, 800);
        setFormStep((prev) => prev + 1);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    function renderForm() {
        switch (formStep) {
            case 1:
                return (
                    <EventDetails
                        nextStep={nextStep}
                        handleChange={handleChange}
                        formData={formData}
                    />
                );
            case 2:
                return (
                    <LocationDetails
                        prevStep={prevStep}
                        nextStep={nextStep}
                        handlePlaceSelect={handlePlaceSelect}
                        setFormData={setFormData}
                        formData={formData}
                    />
                );
            case 3:
                return (
                    <PhotoSelection
                        prevStep={prevStep}
                        nextStep={nextStep}
                        handlePhotoCrop={handlePhotoCrop}
                        postEvent={postEvent}
                    />
                );
            case 4:
                return <Success />;
            default:
        }
    }

    function handlePlaceSelect(addressObject) {
        setFormData((prevData) => ({
            ...prevData,
            address: addressObject.formatted_address,
            lon: addressObject.geometry.location.lng(),
            lat: addressObject.geometry.location.lat(),
        }));
    }

    function handlePhotoCrop(photo) {
        setFormData((prevData) => ({
            ...prevData,
            photo: photo,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!formData.address || !formData.lon || !formData.lat) return;
        await postEvent();
    }

    async function joinEvent(eventId) {
        try {
            const prevAttending = user?.events ? user.events : [];
            const reqBody = {
                userId: user._id,
                events: [...prevAttending, eventId],
            };
            const res = await fetch("/api/user", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reqBody),
            });
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async function postEvent() {
        try {
            const res = await fetch("/api/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            const joined = await joinEvent(data._id);
            return joined;
        } catch (error) {
            console.log(error);
        }
    }

    function formatDate() {
        const [year, month, day] = formData.date.split("-");
        return month + "/" + day + "/" + year;
    }
    function formatTime() {
        let formattedTime = formData.time.split(":");
        const timeOfDay = formattedTime[0] < 12 ? " AM" : " PM";
        const hours = formattedTime[0] % 12 || 12;
        return hours + ":" + formattedTime[1] + timeOfDay;
    }

    return (
        <div className={styles.container}>
            <h1>Build Your Event</h1>
            <div className={styles.body}>
                <div className={styles.formContainer}>
                    <ProgressBar step={formStep} stepStyles={stepStyles} />
                    {renderForm()}
                </div>
                <div className={styles.previewContainer}>
                    <div className={styles.imageContainer}>
                        <Image
                            src={
                                formData.photo
                                    ? formData.photo
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
                                {formData.date ? formatDate() : "Date"} -{" "}
                                {formData.time ? formatTime() : "Time"}
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
