import Image from "next/image";
import React from "react";
import styles from "../styles/Profile.module.css";

export default function Profile({ user }) {
    console.log(user);
    return (
        <div className={styles.page}>
            <div className={styles.left}>
                <Image
                    className={styles.avatar}
                    src={"/../public/assets/img/default-avi.jpeg"}
                    width={50}
                    height={50}
                />
                <h3>
                    {user.first} {user.last}
                </h3>
            </div>
            <div className={styles.right}>
                <div>
                    <h1>Currently Attending</h1>
                </div>
                <div>
                    <h1>Currently Hosting</h1>
                </div>
                <div>
                    <h1>Archived Events</h1>
                </div>
            </div>
        </div>
    );
}
