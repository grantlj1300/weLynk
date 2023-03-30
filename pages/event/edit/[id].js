import React, { useEffect, useState } from "react";
import Head from "next/head";
import CreateEvent from "../../../components/CreateForm/CreateEvent";
import Loading from "../../../components/Loading";
import { useRouter } from "next/router";

export default function EditEvent({ user, eventId }) {
    const [event, setEvent] = useState("loading");
    const router = useRouter();

    useEffect(() => {
        getEvent();
        // eslint-disable-next-line
    }, []);

    async function getEvent() {
        try {
            const res = await fetch(`/api/event/${eventId}`, {
                method: "GET",
            });
            const data = await res.json();
            setEvent(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function updateEvent(formData) {
        try {
            const reqBody = {
                eventId: eventId,
                updated: {
                    ...formData,
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

    async function deleteEvent() {
        try {
            const reqBody = {
                eventId: event._id,
                members: event.members,
                messages: event.messages,
            };
            const res = await fetch("/api/events", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reqBody),
            });
            if (res.status === 200) {
                router.push("/profile");
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (event === "loading") {
        return <Loading />;
    }

    return (
        <>
            <Head>
                <title>weLynk | Edit Event</title>
            </Head>
            <CreateEvent
                user={user}
                submitForm={updateEvent}
                event={event}
                deleteEvent={deleteEvent}
            />
        </>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.params;
    return { props: { eventId: id } };
}
