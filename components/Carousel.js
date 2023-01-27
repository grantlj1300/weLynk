import React, { useEffect, useState } from "react";
import styles from "../styles/Carousel.module.css";
import CarouselCard from "./CarouselCard";

export default function Carousel({ events }) {
    const [eventData, setEventData] = useState();

    useEffect(() => {
        if (events) {
            getEvents();
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

    const carouselItems = eventData ? (
        eventData.map((event, index) => (
            <div key={index} className={styles.item}>
                <CarouselCard event={event} />
            </div>
        ))
    ) : (
        <div className={styles.item}>
            <CarouselCard />
        </div>
    );

    return (
        <div className={styles.container}>
            <div className={styles.items}>{carouselItems}</div>
        </div>
    );
}
