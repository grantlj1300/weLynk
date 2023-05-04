import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../../styles/Notifications/InvitationRow.module.css";

export default function InvitationRow({ user, setUser, friend, last, event }) {
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
        await addUserToEvent();
        await addEventToUser();
        await removeInvitation();
    }

    async function removeInvitation() {
        try {
            const res = await fetch(`/api/invitations/${user.username}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    eventId: event._id,
                }),
            });
            const data = await res.json();
            setUser(data);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    return (
        <div className={`${styles.row} ${last ? styles.lastRow : ""}`}>
            <div className={styles.inviteText}>
                <Link
                    className={styles.link}
                    href={`/profile/${friend.username}`}
                >
                    <Image
                        className={styles.avatar}
                        src={
                            friend.avatar?.length > 0
                                ? friend.avatar
                                : "/assets/img/default-avi.jpeg"
                        }
                        alt="Avatar"
                        width={40}
                        height={40}
                    />
                    <div className={styles.rowText}>
                        <h3>@{friend.username}</h3>
                    </div>
                </Link>
                <div className={styles.invite}>invited you to join</div>
                <Link className={styles.link} href={`/event/${event._id}`}>
                    <div className={styles.rowText}>
                        <h3>{event.title}</h3>
                    </div>
                </Link>
            </div>
            <div className={styles.buttons}>
                <div className={styles.button} onClick={handleEventJoin}>
                    Accept
                </div>
                <div className={styles.button} onClick={removeInvitation}>
                    Reject
                </div>
            </div>
        </div>
    );
}
