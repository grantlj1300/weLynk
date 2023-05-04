import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/Layout/NotificationPopup.module.css";
import { IoMdNotificationsOutline } from "react-icons/io";
import FriendRow from "../Notifications/FriendRow";

export default function NotificationPopup({ user, setUser }) {
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const closeNotificationsRef = useRef();

    const useOutsideClick = (ref, callback) => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                callback();
            }
        };

        useEffect(() => {
            document.addEventListener("click", handleClick);

            return () => {
                document.removeEventListener("click", handleClick);
            };
        });
    };

    useOutsideClick(closeNotificationsRef, () => {
        setShowNotifications(false);
    });

    useEffect(() => {
        getRequests();
        // eslint-disable-next-line
    }, [user]);

    async function getRequests() {
        try {
            const pending = user.friends
                .filter((friend) => friend.status === 1)
                .map((friend) => friend.user);
            if (pending.length === 0) setNotifications([]);
            const res = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pending),
            });
            const result = await res.json();
            setNotifications(result);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    const userList = notifications.map((result, i) => (
        <FriendRow
            key={i}
            user={user}
            setUser={setUser}
            friend={result}
            last={i + 1 == notifications.length}
            linkClick={() => setShowNotifications(false)}
            type={"Friend"}
        />
    ));

    return (
        <div
            ref={closeNotificationsRef}
            className={`${styles.container} ${
                showNotifications ? styles.show : ""
            }`}
        >
            <div className={styles.iconContainer}>
                <IoMdNotificationsOutline
                    className={styles.icon}
                    onClick={() => setShowNotifications((prev) => !prev)}
                />
            </div>
            {showNotifications && (
                <div className={styles.rowContainer}>
                    {userList.length > 0 ? (
                        userList
                    ) : (
                        <div className={styles.emptyRow}>No new activity</div>
                    )}
                    <Link
                        className={`${styles.emptyRow} ${styles.allLink}`}
                        onClick={() => setShowNotifications(false)}
                        href={`/activity`}
                    >
                        View all activity
                    </Link>
                </div>
            )}
        </div>
    );
}
