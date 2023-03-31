import React from "react";
import Head from "next/head";
import BuildEvent from "../../components/BuildEvent/BuildEvent";

export default function Create({ user, setUser }) {
    async function joinEvent(eventId) {
        try {
            const prevAttending = user?.events ? user.events : [];
            const reqBody = {
                userId: user._id,
                events: [...prevAttending, eventId],
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

    async function postEvent(formData) {
        try {
            const res = await fetch("/api/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            const joined = await joinEvent(data._id);
            setUser(joined);
            console.log(joined);
            return joined;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Head>
                <title>weLynk | Create Event</title>
            </Head>
            <BuildEvent user={user} submitForm={postEvent} />
        </>
    );
}
