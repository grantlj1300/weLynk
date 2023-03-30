import React, { useState } from "react";
import Image from "next/image";
import styles from "../../styles/CreateEvent.module.css";
import { AiTwotoneCalendar } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { formatDate, formatTime } from "../../lib/utils/utils.js";
import EventDetails from "./EventDetails";
import LocationDetails from "./LocationDetails";
import PhotoSelection from "./PhotoSelection";
import Success from "./Success";
import ProgressBar from "./ProgressBar";

export default function CreateEvent({ user, event, submitForm, deleteEvent }) {
    const [formStep, setFormStep] = useState(1);
    const [formData, setFormData] = useState(
        event
            ? event
            : {
                  admin: user._id,
                  members: [user._id],
                  title: "",
                  photo: "",
                  address: "",
                  location: { type: "Point", coordinates: [] },
                  description: "",
                  date: "",
                  time: "",
                  eventType: "misc",
              }
    );
    const [deleting, setDeleting] = useState(false);
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
                        image={formData.photo}
                        handlePhotoCrop={handlePhotoCrop}
                        submitForm={() => submitForm(formData)}
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
            location: {
                type: "Point",
                coordinates: [
                    addressObject.geometry.location.lng(),
                    addressObject.geometry.location.lat(),
                ],
            },
        }));
    }

    function handlePhotoCrop(photo) {
        setFormData((prevData) => ({
            ...prevData,
            photo: photo,
        }));
    }

    return (
        <div className={styles.container}>
            <h1>Build Your Event</h1>
            {event &&
                (deleting ? (
                    <div className={styles.confirmRow}>
                        Are you sure?
                        <button className={styles.prompt} onClick={deleteEvent}>
                            Yes
                        </button>
                        <button
                            className={styles.prompt}
                            onClick={() => setDeleting(false)}
                        >
                            No
                        </button>
                    </div>
                ) : (
                    <button
                        className={styles.delete}
                        onClick={() => setDeleting(true)}
                    >
                        Delete Event
                    </button>
                ))}
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
                            <div className={styles.subline}>
                                <AiTwotoneCalendar
                                    size={20}
                                    className={styles.bodyIcon}
                                />
                                <h5 className={styles.subheader}>
                                    {formData.date
                                        ? formatDate(formData.date)
                                        : "Date"}{" "}
                                    -{" "}
                                    {formData.time
                                        ? formatTime(formData.time)
                                        : "Time"}
                                </h5>
                            </div>
                            <div className={styles.subline}>
                                <IoLocationSharp
                                    size={20}
                                    className={styles.bodyIcon}
                                />
                                <h5 className={styles.subheader}>
                                    {formData.address || "Address"}
                                </h5>
                            </div>
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
