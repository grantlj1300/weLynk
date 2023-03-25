import Image from "next/image";
import React from "react";
import styles from "../styles/CarouselCard.module.css";

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
                    {formatDate()} - {formatTime()}
                </div>
            </div>
        </div>
    );
}
