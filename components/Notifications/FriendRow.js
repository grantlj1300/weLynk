import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../../styles/Notifications/FriendRow.module.css";
import FriendButton from "./FriendButton";
import InviteButton from "./InviteButton";

export default function FriendRow({
    user,
    setUser,
    friend,
    last,
    linkClick,
    type,
    eventId,
}) {
    return (
        <div className={`${styles.row} ${last ? styles.lastRow : ""}`}>
            <Link
                className={styles.link}
                onClick={linkClick}
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
                    <div>{friend.name}</div>
                </div>
            </Link>
            {type === "Friend" ? (
                <FriendButton
                    user={user}
                    setUser={setUser}
                    otherUser={friend}
                />
            ) : (
                <InviteButton
                    user={user}
                    otherUser={friend}
                    eventId={eventId}
                />
            )}
        </div>
    );
}
