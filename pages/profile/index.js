import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Profile.module.css";
import Carousel from "../../components/Carousel";
import { AiOutlineSetting } from "react-icons/ai";
import EditProfileModal from "../../components/EditProfileModal";
import Head from "next/head";

export default function Profile({ user, setUser }) {
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [attending, setAttending] = useState("fetching");
    const [hosting, setHosting] = useState("fetching");
    const [archived, setArchived] = useState("fetching");

    useEffect(() => {
        if (user.events) {
            getEvents();
        } else {
            setAttending("none");
            setHosting("none");
            setArchived("none");
        }
        // eslint-disable-next-line
    }, []);

    function populateEvents(events) {
        let [att, host, arch] = [[], [], []];
        const currDate = new Date();
        events.forEach((event) => {
            const eventDate = new Date(event.date + "T" + event.time + ":00");
            if (eventDate.getTime() < currDate.getTime()) arch.push(event);
            else if (event.admin === user._id) host.push(event);
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
                body: JSON.stringify(user.events),
            });
            const result = await res.json();
            populateEvents(result);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.page}>
            <Head>
                <title>weLynk | {user.username}</title>
            </Head>
            {showEditProfileModal && (
                <EditProfileModal
                    closeModal={() => setShowEditProfileModal(false)}
                    user={user}
                    setUser={setUser}
                />
            )}
            <div className={styles.user}>
                <div className={styles.cardHeader}>
                    <AiOutlineSetting
                        className={styles.setting}
                        onClick={() => setShowEditProfileModal(true)}
                        size={25}
                    />
                    <Image
                        className={styles.avatar}
                        src={
                            user.avatar?.length > 0
                                ? user.avatar
                                : "/assets/img/default-avi.jpeg"
                        }
                        alt="Avatar"
                        width={50}
                        height={50}
                    />
                    <h3>
                        {user.first} {user.last}
                    </h3>
                    <h5>@{user.username}</h5>
                </div>

                <p className={styles.about}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque non varius arcu. Nullam a semper nibh.
                    Curabitur semper, nibh sit amet imperdiet convallis, nisl
                    mauris laoreet orci, quis semper eros quam sit amet sapien.
                    Sed volutpat purus lorem, in consectetur libero sodales nec.
                </p>
            </div>
            <div className={styles.right}>
                <div className={styles.carouselContainer}>
                    <h1>Attending</h1>
                    <Carousel
                        events={attending}
                        empty={"you aren't attending"}
                    />
                </div>
                <div className={styles.carouselContainer}>
                    <h1>Hosting</h1>
                    <Carousel events={hosting} empty={"you aren't hosting"} />
                </div>
                <div className={styles.carouselContainer}>
                    <h1>Previous Events</h1>
                    <Carousel events={archived} empty={"you haven't been to"} />
                </div>
            </div>
        </div>
    );
}
