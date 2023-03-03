import Link from "next/link";
import React, { useState } from "react";
import styles from "../../styles/Navbar.module.css";
import { BiMapPin } from "react-icons/bi";

export default function Navbar({ handleLogOut, user }) {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <nav
            className={`${styles.headerContainer} ${
                showMenu ? styles.show : styles.hide
            }`}
        >
            <div>
                <Link href="/" className="logo">
                    <BiMapPin size={25} />
                    <div className="logoText">weLynk</div>
                </Link>
            </div>
            <div
                className={styles.hamburgerIconContainer}
                onClick={() => setShowMenu((prev) => !prev)}
            >
                <div className={styles.hamburgerIcon} />
            </div>
            <div className={styles.mask} />
            <div className={styles.navLinksContainer}>
                <Link
                    href="/events"
                    className={styles.link}
                    onClick={() => setShowMenu(false)}
                >
                    View Events
                </Link>
                <Link
                    href="/event/create"
                    className={styles.link}
                    onClick={() => setShowMenu(false)}
                >
                    Create Event
                </Link>
                {user && (
                    <div className={styles.link} onClick={handleLogOut}>
                        Logout, {user.first}
                    </div>
                )}
            </div>
        </nav>
    );
}
