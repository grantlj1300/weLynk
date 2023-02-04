import Image from "next/image";
import React from "react";
import styles from "../styles/CarouselCard.module.css";

export default function CarouselCard({ event }) {
    if (!event) {
        return (
            <div className={styles.container}>
                <div className={styles.info}>
                    <h1>No Events!</h1>
                </div>
            </div>
        );
    } else if (event === "fetching") {
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
                <h1>{event.title}</h1>
            </div>
        </div>
    );
}
