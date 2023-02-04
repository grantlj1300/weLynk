import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Profile.module.css";
import Carousel from "../../components/Carousel";
import Loading from "../../components/Loading";

export default function OtherProfile({ otherUserId, user }) {
    const [otherUser, setOtherUser] = useState("loading");

    async function getOtherUser() {
        try {
            const res = await fetch(`/api/user/${otherUserId}`, {
                method: "GET",
            });
            const data = await res.json();
            setOtherUser(data);
        } catch (error) {
            console.log(error);
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
            <div className={styles.left}>
                <div className={styles.cardHeader}>
                    <Image
                        className={styles.avatar}
                        src="/assets/img/default-avi.jpeg"
                        alt="Avatar"
                        width={50}
                        height={50}
                    />
                    <h3>
                        {otherUser.first} {otherUser.last}
                    </h3>
                    <h5>@{otherUser.username}</h5>
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
                <h1>Currently Attending</h1>
                <div className={styles.carouselContainer}>
                    <Carousel events={otherUser.attending} />
                </div>
                <div>
                    <h1>Currently Hosting</h1>
                    <div className={styles.carouselContainer}>
                        <Carousel events={otherUser.attending} />
                    </div>
                </div>
                <div>
                    <h1>Archived Events</h1>
                    <div className={styles.carouselContainer}>
                        <Carousel />
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.params;
    return { props: { otherUserId: id } };
}
