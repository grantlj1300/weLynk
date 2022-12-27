import React from "react";
import Image from "next/image";
import styles from "../styles/EventPreview.module.css";
import { AiOutlineClose, AiTwotoneCalendar } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";

export default function EventPreview({ event, show, closeEventPreview }) {
    // const [year, month, day] = event.split("-");
    // const formattedDate = month + "/" + day + "/" + year;
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
                        event?.photoURL
                            ? event.photoURL
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
                            {event.date} - {event.time}
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
