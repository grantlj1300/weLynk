import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/Layout/NotificationPopup.module.css";
import { IoMdNotificationsOutline } from "react-icons/io";
import FriendButton from "../FriendButton";

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
    }, []);

    async function getRequests() {
        try {
            const pending = user.friends
                .filter((friend) => friend.status === 1)
                .map((friend) => friend.user);
            if (pending.length === 0) return;
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
        <div className={styles.row} key={i}>
            <Link
                className={styles.link}
                onClick={() => setShowNotifications(false)}
                href={`/profile/${result.username}`}
            >
                <Image
                    className={styles.avatar}
                    src={
                        result.avatar?.length > 0
                            ? result.avatar
                            : "/assets/img/default-avi.jpeg"
                    }
                    alt="Avatar"
                    width={40}
                    height={40}
                />
                <div className={styles.rowText}>
                    <h3>@{result.username}</h3>
                    <div>{result.name}</div>
                </div>
            </Link>
            <FriendButton user={user} setUser={setUser} otherUser={result} />
        </div>
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
                        <div className={styles.emptyRow}>
                            No new notifications
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
