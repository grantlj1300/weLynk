import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../styles/Carousel.module.css";
import CarouselCard from "./CarouselCard";

export default function Carousel({ events }) {
    function renderCarouselItems() {
        if (events === "none") {
            return (
                <div className={styles.item}>
                    <CarouselCard />
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
