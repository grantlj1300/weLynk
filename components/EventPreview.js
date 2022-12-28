import React from "react";
import Image from "next/image";
import styles from "../styles/EventPreview.module.css";
import { AiOutlineClose, AiTwotoneCalendar } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";

export default function EventPreview({ event, show, closeEventPreview }) {
    function formatDate() {
        const [year, month, day] = event.date.split("-");
        return month + "/" + day + "/" + year;
    }
    function formatTime() {
        let formattedTime = event.time.split(":");
        const timeOfDay = formattedTime[0] < 12 ? " AM" : " PM";
        const hours = formattedTime[0] % 12 || 12;
        return hours + ":" + formattedTime[1] + timeOfDay;
    }
    return (
        <div id={styles.infoBox} className={show ? styles.show : undefined}>
            <div className={styles.imageContainer}>
                <AiOutlineClose
                    className={styles.closeIcon}
                    size={25}
                    onClick={() => closeEventPreview()}
                />
                <Image
                    src={
                        event?.photo
                            ? event.photo
                            : "/assets/img/img-not-available.jpg"
                    }
                    alt="event"
                    fill={true}
                    className={styles.image}
                    sizes="100%"
                />
            </div>
            {event && (
                <div className={styles.previewContent}>
                    <div className={styles.previewHeader}>
                        <h1>{event.title}</h1>
                        <h5 className={styles.subheader}>
                            <AiTwotoneCalendar
                                size={20}
                                className={styles.bodyIcon}
                            />
                            {formatDate()} - {formatTime()}
                        </h5>
                        <h5 className={styles.subheader}>
                            <IoLocationSharp
                                size={20}
                                className={styles.bodyIcon}
                            />
                            {event.address}
                        </h5>
                    </div>
                    <p className={styles.description}>{event.description}</p>
                </div>
            )}
        </div>
    );
}
