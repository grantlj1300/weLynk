import React, { useEffect, useState } from "react";
import Image from "next/image";
import { formatDate, formatTime } from "../lib/utils/utils.js";
import styles from "../styles/EventPreview.module.css";
import { AiOutlineClose, AiTwotoneCalendar } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import Link from "next/link.js";

export default function EventPreview({
    event,
    setEvent,
    show,
    closeEventPreview,
    user,
    setUser,
}) {
    const [attending, setAttending] = useState(false);
    const [joining, setJoining] = useState(false);

    useEffect(() => {
        if (event && user.events && user.events.includes(event._id))
            setAttending(true);
        else setAttending(false);
        // eslint-disable-next-line
    }, [event]);

    // Duplicated
    async function addEventToUser() {
        try {
            const prevAttending = user?.events ? user.events : [];
            const reqBody = {
                userId: user._id,
                events: [...prevAttending, event._id],
            };
            const res = await fetch("/api/user", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reqBody),
            });
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async function addUserToEvent() {
        try {
            const prevMembers = event?.members ? event.members : [];
            const reqBody = {
                eventId: event._id,
                updated: {
                    members: [...prevMembers, user._id],
                },
            };
            const res = await fetch("/api/events", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reqBody),
            });
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async function handleEventJoin() {
        setJoining(true);
        const updatedEvent = await addUserToEvent();
        const updatedUser = await addEventToUser();
        setEvent(updatedEvent);
        setUser(updatedUser);
        setJoining(false);
    }

    function renderButton() {
        if (attending)
            return (
                <button className={styles.button}>
                    <Link href={`/event/${event._id}`} className="link">
                        Visit Event Page
                    </Link>
                </button>
            );
        else if (joining)
            return (
                <button className={styles.button}>
                    <div className="spin" />
                </button>
            );
        else
            return (
                <button className={styles.button} onClick={handleEventJoin}>
                    Join Event
                </button>
            );
    }

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
                        event?.photo
                            ? event.photo
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
                        <div className={styles.subline}>
                            <AiTwotoneCalendar
                                size={20}
                                className={styles.bodyIcon}
                            />
                            <h5 className={styles.subheader}>
                                {formatDate(event.date)} -{" "}
                                {formatTime(event.time)}
                            </h5>
                        </div>
                        <div className={styles.subline}>
                            <IoLocationSharp
                                size={20}
                                className={styles.bodyIcon}
                            />
                            <h5 className={styles.subheader}>
                                {event.address}
                            </h5>
                        </div>
                    </div>
                    <div className={styles.bodyContainer}>
                        <p className={styles.description}>
                            {event.description}
                        </p>
                        {renderButton()}
                    </div>
                </div>
            )}
        </div>
    );
}
