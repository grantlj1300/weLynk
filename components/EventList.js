import React from "react";
import styles from "../styles/EventList.module.css";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import Image from "next/image";

export default function EventList({
    events,
    show,
    setShowList,
    selected,
    setSelected,
    setShowPreview,
}) {
    const eventCards = events?.map((event, idx) => (
        <div
            className={`${styles.event} ${
                event._id === selected?._id ? styles.active : ""
            }`}
            key={idx}
            onClick={() => {
                setSelected(event);
                setShowPreview(true);
            }}
        >
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
            <div className={styles.body}>
                <h2>{event.title}</h2>
            </div>
        </div>
    ));

    return (
        <div
            className={`${styles.container} ${show ? styles.show : undefined}`}
        >
            <AiOutlineDoubleLeft
                className={styles.closeIcon}
                size={25}
                onClick={() => setShowList(false)}
            />
            <div className={styles.eventCards}>{eventCards}</div>
        </div>
    );
}
