import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Profile.module.css";
import Carousel from "../../components/Carousel";
import Loading from "../../components/Loading";
import Head from "next/head";
import { useRouter } from "next/router";

export default function OtherProfile({ otherUserId, user }) {
    const [otherUser, setOtherUser] = useState("loading");
    const [attending, setAttending] = useState("fetching");
    const [hosting, setHosting] = useState("fetching");
    const [archived, setArchived] = useState("fetching");
    const router = useRouter();

    useEffect(() => {
        if (otherUser && otherUser.events) {
            getEvents();
        } else {
            setAttending("none");
            setHosting("none");
            setArchived("none");
        }
        // eslint-disable-next-line
    }, [otherUser]);

    function populateEvents(events) {
        let [att, host, arch] = [[], [], []];
        const currDate = new Date();
        events.forEach((event) => {
            const eventDate = new Date(event.date + "T" + event.time + ":00");
            if (eventDate.getTime() < currDate.getTime()) arch.push(event);
            else if (event.admin === otherUser._id) host.push(event);
            else att.push(event);
        });
        att.length > 0 ? setAttending(att) : setAttending("none");
        host.length > 0 ? setHosting(host) : setHosting("none");
        arch.length > 0 ? setArchived(arch) : setArchived("none");
    }

    async function getEvents() {
        try {
            const res = await fetch("/api/eventlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(otherUser.events),
            });
            const result = await res.json();
            populateEvents(result);
        } catch (error) {
            console.log(error);
        }
    }

    async function getOtherUser() {
        try {
            const res = await fetch(`/api/user/${otherUserId}`, {
                method: "GET",
            });
            const data = await res.json();
            setOtherUser(data);
        } catch (error) {
            console.log(error);
            router.push("/404");
        }
    }

    useEffect(() => {
        getOtherUser();
        // eslint-disable-next-line
    }, []);

    if (otherUser === "loading") {
        return <Loading />;
    }

    return (
        <div className={styles.page}>
            <Head>
                <title>weLynk | {otherUser.username}</title>
            </Head>
            <div className={styles.user}>
                <div className={styles.cardHeader}>
                    <Image
                        className={styles.avatar}
                        src={
                            otherUser.avatar
                                ? otherUser.avatar
                                : "/assets/img/default-avi.jpeg"
                        }
                        alt="Avatar"
                        width={50}
                        height={50}
                    />
                    <h3>{otherUser.name}</h3>
                    <h5>@{otherUser.username}</h5>
                </div>

                <p className={styles.about}>
                    {user.bio ? user.bio : "No bio yet!"}
                </p>
            </div>
            <div className={styles.right}>
                <div className={styles.carouselContainer}>
                    <h1>Currently Attending</h1>
                    <Carousel events={attending} />
                </div>
                <div className={styles.carouselContainer}>
                    <h1>Currently Hosting</h1>
                    <Carousel events={hosting} />
                </div>
                <div className={styles.carouselContainer}>
                    <h1>Archived Events</h1>
                    <Carousel events={archived} />
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.params;
    return { props: { otherUserId: id } };
}
