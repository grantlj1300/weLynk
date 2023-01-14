import React from "react";
import Head from "next/head";
import CreatePost from "../../components/CreatePost";

export default function Create() {
    return (
        <>
            <Head>
                <title>weLynk | Create Event</title>
            </Head>
            <CreatePost />
        </>
    );
}
