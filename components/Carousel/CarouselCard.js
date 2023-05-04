import Image from "next/image";
import React from "react";
import styles from "../../styles/Carousel/CarouselCard.module.css";
import { formatDate, formatTime } from "../../lib/utils/utils.js";

export default function CarouselCard({ event }) {
    if (event === "fetching") {
        return (
            <div className={`${styles.container} ${styles.fetching}`}>
                <div className={styles.ellipsis}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
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
            <div className={styles.info}>
                <h1 className={styles.title}>{event.title}</h1>

                <div className={styles.bodyText}>{event.address}</div>
                <div className={styles.bodyText}>
                    {formatDate(event.date)} - {formatTime(event.time)}
                </div>
            </div>
        </div>
    );
}
