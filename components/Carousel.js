import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../styles/Carousel.module.css";
import CarouselCard from "./CarouselCard";

export default function Carousel({ events }) {
    const [eventData, setEventData] = useState("fetching");
    console.log(eventData);
    useEffect(() => {
        if (events) {
            getEvents();
        } else {
            setEventData("none");
        }
        // eslint-disable-next-line
    }, []);

    async function getEvents() {
        try {
            const res = await fetch("/api/eventlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(events),
            });
            const result = await res.json();
            setEventData(result);
        } catch (error) {
            console.log(error);
        }
    }

    function renderCarouselItems() {
        if (eventData === "none") {
            return (
                <div className={styles.item}>
                    <CarouselCard />
                </div>
            );
        } else if (eventData === "fetching") {
            return (
                <div className={styles.item}>
                    <CarouselCard event={"fetching"} />
                </div>
            );
        } else {
            return eventData.map((event, index) => (
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
