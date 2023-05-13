import React, { useEffect, useState } from "react";
import styles from "../styles/Activity.module.css";
import Head from "next/head";
import FriendRow from "../components/Notifications/FriendRow";
import InvitationRow from "../components/Notifications/InvitationRow";

export default function Activity({ user, setUser }) {
    const [activeTab, setActiveTab] = useState("Friends");
    const [pendingFriends, setPendingFriends] = useState([]);
    const [currentFriends, setCurrentFriends] = useState([]);
    const [invitations, setInvitations] = useState([]);

    useEffect(() => {
        getPending();
        getCurrent();
        getInvitations();
        // eslint-disable-next-line
    }, [user]);

    async function getPending() {
        try {
            const pending = user.friends
                .filter((friend) => friend.status === 1)
                .map((friend) => friend.user);
            if (pending.length === 0) setPendingFriends([]);
            const res = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pending),
            });
            const result = await res.json();
            setPendingFriends(result);
        } catch (error) {
            console.log(error);
        }
    }

    async function getCurrent() {
        try {
            const current = user.friends
                .filter((friend) => friend.status === 2)
                .map((friend) => friend.user);
            if (current.length === 0) setCurrentFriends([]);
            const res = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(current),
            });
            const result = await res.json();
            setCurrentFriends(result);
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
        } catch (error) {
            console.log(error);
        }
    }

    const displayPendingFriends = pendingFriends.map((result, i) => (
        <FriendRow
            key={i}
            user={user}
            setUser={setUser}
            friend={result}
            last={i + 1 == pendingFriends.length}
            type={"Friend"}
        />
    ));

    const displayCurrentFriends = currentFriends.map((result, i) => (
        <FriendRow
            key={i}
            user={user}
            setUser={setUser}
            friend={result}
            last={i + 1 == currentFriends.length}
            type={"Friend"}
        />
    ));

    const displayInvitations = invitations.map((result, i) => (
        <InvitationRow
            key={i}
            user={user}
            setUser={setUser}
            friend={result.sender}
            viewed={result.viewed}
            last={i + 1 == invitations.length}
            event={result.event}
        />
    ));

    return (
        <div className={styles.page}>
            <Head>
                <title>weLynk | Activity</title>
            </Head>
            <div className={styles.tabs}>
                <div
                    className={`${styles.tab} ${
                        activeTab === "Friends"
                            ? styles.activeTab
                            : styles.inactiveTab
                    }`}
                    onClick={() => setActiveTab("Friends")}
                >
                    <h2 className={styles.text}>Friends</h2>
                </div>
                <div
                    className={`${styles.tab} ${
                        activeTab === "Invitations"
                            ? styles.activeTab
                            : styles.inactiveTab
                    }`}
                    onClick={() => setActiveTab("Invitations")}
                >
                    <h2 className={styles.text}>Invitations</h2>
                </div>
            </div>
            {activeTab === "Friends" ? (
                <div className={styles.container}>
                    {displayPendingFriends.length > 0 && (
                        <div className={styles.entryContainer}>
                            <h2>Pending Requests</h2>
                            {displayPendingFriends}
                        </div>
                    )}
                    <div className={styles.entryContainer}>
                        <h2>Friends</h2>
                        {displayCurrentFriends}
                    </div>
                </div>
            ) : (
                <div className={styles.container}>
                    <div className={styles.entryContainer}>
                        <h2>Invitations</h2>
                        {displayInvitations.length > 0
                            ? displayInvitations
                            : "None"}
                    </div>
                </div>
            )}
        </div>
    );
}
