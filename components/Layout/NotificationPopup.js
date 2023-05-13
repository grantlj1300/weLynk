import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/Layout/NotificationPopup.module.css";
import { IoMdNotificationsOutline } from "react-icons/io";
import FriendRow from "../Notifications/FriendRow";
import InvitationRow from "../Notifications/InvitationRow";

export default function NotificationPopup({ user, setUser }) {
    const [showNotifications, setShowNotifications] = useState(false);
    const [friendRequests, setFriendRequests] = useState([]);
    const [invitations, setInvitations] = useState([]);
    const [viewed, setViewed] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
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
        getInvitations();
        // eslint-disable-next-line
    }, [user]);

    useEffect(() => {
        if (showNotifications && unreadCount > 0) {
            viewNotifications();
        } else if (!showNotifications && viewed.length > 0) {
            setInvitations(viewed);
            setViewed([]);
        }
        // eslint-disable-next-line
    }, [showNotifications]);

    async function viewNotifications() {
        try {
            const res = await fetch(`/api/invitations/${user.username}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            setViewed(data);
            setUnreadCount(0);
            return data;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async function getRequests() {
        try {
            const pending = user.friends
                .filter((friend) => friend.status === 1)
                .map((friend) => friend.user);
            if (pending.length === 0) {
                setFriendRequests([]);
                return;
            }
            const res = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pending),
            });
            const result = await res.json();
            setFriendRequests(result);
        } catch (error) {
            console.log(error);
        }
    }
    async function getInvitations() {
        try {
            const res = await fetch(`/api/invitations/${user.username}`, {
                method: "GET",
            });
            const result = await res.json();
            setInvitations(result);
            const unread = result.filter(
                (invitation) => invitation.viewed === false
            ).length;
            setUnreadCount(unread);
        } catch (error) {
            console.log(error);
        }
    }

    const userList = friendRequests.map((result, i) => (
        <FriendRow
            key={i}
            user={user}
            setUser={setUser}
            friend={result}
            last={i + 1 == friendRequests.length && invitations.length === 0}
            linkClick={() => setShowNotifications(false)}
            type={"Friend"}
        />
    ));

    const displayInvitations = invitations.map((result, i) => (
        <InvitationRow
            key={i}
            user={user}
            setUser={setUser}
            friend={result.sender}
            last={i + 1 == invitations.length}
            viewed={result.viewed}
            event={result.event}
            mini={true}
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
                {unreadCount > 0 && (
                    <div className={styles.count}>{unreadCount}</div>
                )}
            </div>
            {showNotifications && (
                <div className={styles.rowContainer}>
                    {userList}
                    {displayInvitations}
                    {friendRequests.length === 0 &&
                        invitations.length === 0 && (
                            <div className={styles.emptyRow}>
                                No new activity
                            </div>
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
