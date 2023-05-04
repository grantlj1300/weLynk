import React, { useState } from "react";
import styles from "../../styles/Notifications/FriendButton.module.css";
import { AiOutlineFieldTime, AiOutlineSend } from "react-icons/ai";

export default function InviteButton({ user, otherUser, eventId }) {
    const [invited, setInvited] = useState(
        otherUser.invitations?.some(
            (invitation) =>
                Object.is(invitation.sender, user._id) &&
                Object.is(invitation.event, eventId)
        )
    );

    async function sendRequest() {
        setInvited("loading");
        try {
            const res = await fetch(`/api/user/${otherUser.username}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    invitation: {
                        sender: user._id,
                        event: eventId,
                    },
                }),
            });
            const data = await res.json();
            console.log(data);
            setInvited(true);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    if (invited) {
        return (
            <div className={`${styles.container} ${styles.deactivated}`}>
                <AiOutlineFieldTime className={styles.icon} size={25} />
                Invited
            </div>
        );
    } else if (!invited) {
        return (
            <div className={styles.container} onClick={sendRequest}>
                <AiOutlineSend className={styles.icon} size={25} />
                Send Invite
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
