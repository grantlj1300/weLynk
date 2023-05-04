import Link from "next/link";
import React from "react";
import styles from "../../styles/Carousel/Carousel.module.css";
import CarouselCard from "./CarouselCard";

export default function Carousel({ events, empty }) {
    function renderCarouselItems() {
        if (events === "none") {
            return (
                <div className={styles.none}>
                    Uh oh, it looks like {empty} any events!
                </div>
            );
        } else if (events === "fetching") {
            return (
                <div className={styles.item}>
                    <CarouselCard event={"fetching"} />
                </div>
            );
        } else {
            return events.map((event, index) => (
                <Link
                    key={index}
                    href={`/event/${event._id}`}
                    className={styles.item}
                >
                    <CarouselCard event={event} />
                </Link>
            ));
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.items}>{renderCarouselItems()}</div>
        </div>
    );
}
