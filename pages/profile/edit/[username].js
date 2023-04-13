import React, { useEffect, useState } from "react";
import Head from "next/head";
import Loading from "../../../components/Loading";
import { useRouter } from "next/router";

export default function EditEvent({ user, username }) {
    const router = useRouter();

    if (user.username !== username) {
        router.push(`/profile/${username}`);
        return <Loading />;
    } else
        return (
            <div>
                <Head>
                    <title>weLynk | Edit Profile</title>
                </Head>
                HELLO
            </div>
        );
}

export async function getServerSideProps(context) {
    const { username } = context.params;
    return { props: { username: username } };
}
