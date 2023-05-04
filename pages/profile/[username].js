import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Profile.module.css";
import Carousel from "../../components/Carousel/Carousel";
import Loading from "../../components/Loading";
import Head from "next/head";
import { useRouter } from "next/router";
import FriendButton from "../../components/Notifications/FriendButton";

export default function OtherProfile({ otherUsername, user, setUser }) {
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
            const res = await fetch(`/api/user/${otherUsername}`, {
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

    if (otherUsername === user.username) {
        router.push("/profile");
    }
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
                    <FriendButton
                        user={user}
                        setUser={setUser}
                        otherUser={otherUser}
                    />
                </div>

                <p className={styles.about}>
                    {otherUser.bio ? otherUser.bio : "No bio yet!"}
                </p>
            </div>
            <div className={styles.right}>
                <div className={styles.carouselContainer}>
                    <h1>Attending</h1>
                    <div className={styles.line} />
                    <Carousel
                        events={attending}
                        empty={`@${otherUser.username} isn't attending`}
                    />
                </div>
                <div className={styles.carouselContainer}>
                    <h1>Hosting</h1>
                    <div className={styles.line} />
                    <Carousel
                        events={hosting}
                        empty={`@${otherUser.username} isn't hosting`}
                    />
                </div>
                <div className={styles.carouselContainer}>
                    <h1>Previous Events</h1>
                    <div className={styles.line} />
                    <Carousel
                        events={archived}
                        empty={`@${otherUser.username} hasn't been to`}
                    />
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { username } = context.params;
    return { props: { otherUsername: username } };
}
