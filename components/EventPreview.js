import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/EventPreview.module.css";
import { AiOutlineClose, AiTwotoneCalendar } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import Link from "next/link";

export default function EventPreview({
    event,
    setEvent,
    show,
    closeEventPreview,
    user,
    setUser,
}) {
    const [attending, setAttending] = useState(false);

    useEffect(() => {
        if (event && user.events && user.events.includes(event._id))
            setAttending(true);
        else setAttending(false);
        // eslint-disable-next-line
    }, [event]);

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
                newMembers: [...prevMembers, user._id],
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
        const updatedEvent = await addUserToEvent();
        const updatedUser = await addEventToUser();
        setEvent(updatedEvent);
        setUser(updatedUser);
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
                        <h5 className={styles.subheader}>
                            <AiTwotoneCalendar
                                size={20}
                                className={styles.bodyIcon}
                            />
                            {formatDate()} - {formatTime()}
                        </h5>
                        <h5 className={styles.subheader}>
                            <IoLocationSharp
                                size={20}
                                className={styles.bodyIcon}
                            />
                            {event.address}
                        </h5>
                    </div>
                    <p className={styles.description}>{event.description}</p>

                    {attending ? (
                        <Link
                            href={`/event/${event._id}`}
                            className={styles.joinButton}
                        >
                            Visit Event Page
                        </Link>
                    ) : (
                        <button
                            className={styles.joinButton}
                            onClick={handleEventJoin}
                        >
                            Join Event
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
