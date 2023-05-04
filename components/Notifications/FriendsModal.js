import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styles from "../../styles/Notifications/FriendsModal.module.css";
import FriendRow from "./FriendRow";

export default function FriendsModal({ user, setUser, closeModal, event }) {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        getFriends();
        // eslint-disable-next-line
    }, []);

    async function getFriends() {
        try {
            const current = user.friends
                .filter(
                    (friend) =>
                        friend.status === 2 &&
                        !event.members.includes(friend._id)
                )
                .map((friend) => friend.user);
            if (current.length === 0) setFriends([]);
            const res = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(current),
            });
            const result = await res.json();
            setFriends(result);
        } catch (error) {
            console.log(error);
        }
    }

    const current = friends.map((result, i) => (
        <FriendRow
            key={i}
            user={user}
            setUser={setUser}
            friend={result}
            last={i + 1 == friends.length}
            type={"Invite"}
            eventId={event._id}
        />
    ));

    return (
        <div className={styles.screen}>
            <div className={styles.header}>
                <AiOutlineClose
                    className={styles.button}
                    size={25}
                    onClick={() => closeModal()}
                />
                <h3>Invite Friends</h3>
            </div>
            <div className={styles.body}>{current}</div>
        </div>
    );
}
