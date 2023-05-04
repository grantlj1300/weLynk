import React, { useState } from "react";
import styles from "../../styles/Notifications/FriendButton.module.css";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { AiOutlineFieldTime } from "react-icons/ai";

export default function FriendButton({ user, setUser, otherUser }) {
    const [friendship, setFriendship] = useState(
        user.friends?.find((friend) => friend.user === otherUser._id)
    );

    async function acceptFriend() {
        setFriendship("loading");
        try {
            const res = await fetch("/api/friends", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sender: user._id,
                    recipient: otherUser._id,
                }),
            });
            const data = await res.json();
            const newFriendship = { user: otherUser._id, status: 2 };
            setUser(data.user);
            setFriendship(newFriendship);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async function removeFriend() {
        setFriendship("loading");
        try {
            const res = await fetch("/api/friends", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sender: user._id,
                    recipient: otherUser._id,
                }),
            });
            const data = await res.json();
            setUser(data.user);
            setFriendship(undefined);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async function sendRequest() {
        setFriendship("loading");
        try {
            const res = await fetch("/api/friends", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sender: user._id,
                    recipient: otherUser._id,
                }),
            });
            const data = await res.json();
            const newFriendship = { user: otherUser._id, status: 0 };
            setUser(data.user);
            setFriendship(newFriendship);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    if (friendship === undefined) {
        return (
            <div className={styles.container} onClick={sendRequest}>
                <BsFillPersonPlusFill className={styles.icon} />
                Add Friend
            </div>
        );
    } else if (friendship.status === 0) {
        return (
            <div className={styles.container} onClick={removeFriend}>
                <AiOutlineFieldTime className={styles.icon} size={25} />
                Requested
            </div>
        );
    } else if (friendship.status === 1) {
        return (
            <div className={styles.dual}>
                <div className={styles.container} onClick={acceptFriend}>
                    Accept
                </div>
                <div className={styles.container} onClick={removeFriend}>
                    Reject
                </div>
            </div>
        );
    } else if (friendship.status === 2) {
        return (
            <div className={styles.container} onClick={removeFriend}>
                <FaUserFriends className={styles.icon} />
                Friends
            </div>
        );
    } else {
        return (
            <div className={styles.container}>
                <div className={styles.spin} />
            </div>
        );
    }
}
