import Image from "next/image";
import React from "react";
import styles from "../styles/Profile.module.css";
import Carousel from "../components/Carousel";
import CarouselCard from "../components/CarouselCard";

export default function Profile({ user }) {
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
                <h1>Currently Attending</h1>
                <div className={styles.carouselContainer}>
                    <Carousel>
                        <CarouselCard />
                        <CarouselCard />
                        <CarouselCard />
                        <CarouselCard />
                    </Carousel>
                </div>
                <div>
                    <h1>Currently Hosting</h1>
                    <div className={styles.carouselContainer}>
                        <Carousel>
                            <CarouselCard />
                            <CarouselCard />
                        </Carousel>
                    </div>
                </div>
                <div>
                    <h1>Archived Events</h1>
                    <div className={styles.carouselContainer}>
                        <Carousel>
                            <CarouselCard />
                            <CarouselCard />
                            <CarouselCard />
                            <CarouselCard />
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    );
}
