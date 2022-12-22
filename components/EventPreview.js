import React from "react";
import styles from "../styles/EventPreview.module.css";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";

export default function EventPreview({ event, closeEventPreview }) {
    return (
        <div id={styles.infoBox} className={event ? styles.show : undefined}>
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
                <div className={styles.previewBody}>
                    <h1>{event.title}</h1>
                    <h5>
                        {event.time} {event.date}
                    </h5>
                    <p>{event.description}</p>
                </div>
            )}
        </div>
    );
}
