import Link from "next/link";
import React, { useState } from "react";
import styles from "../../styles/Navbar.module.css";
import { BiMapPin } from "react-icons/bi";
import SearchBar from "../SearchBar";

export default function Navbar({ handleLogOut, user }) {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <nav className={styles.headerContainer}>
            <div>
                <Link href="/" className="logo">
                    <BiMapPin size={25} />
                    <div className="logoText">weLynk</div>
                </Link>
            </div>
            <div
                className={`${styles.right} ${
                    showMenu ? styles.show : styles.hide
                }`}
            >
                <SearchBar />
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
                            Log Out
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
