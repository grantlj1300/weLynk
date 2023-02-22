import React from "react";
import Head from "next/head";
import CreateEvent from "../../components/CreateEvent";

export default function Create({ user, setUser }) {
    return (
        <>
            <Head>
                <title>weLynk | Create Event</title>
            </Head>
            <CreateEvent user={user} setUser={setUser} />
        </>
    );
}
