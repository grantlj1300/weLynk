import Link from "next/link";
import React from "react";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
    return (
        <nav className={styles.headerContainer}>
            <div>
                <Link href="/" className={styles.link}>
                    Logo
                </Link>
            </div>
            <div>
                <Link href="/posts" className={styles.link}>
                    View Posts
                </Link>
                <Link href="/" className={styles.link}>
                    Link2
                </Link>
                <Link href="/" className={styles.link}>
                    Link3
                </Link>
            </div>
        </nav>
    );
}
