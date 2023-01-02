import Link from "next/link";
import React from "react";
import styles from "../styles/Navbar.module.css";

export default function Navbar({ handleLogOut, user }) {
    return (
        <nav className={styles.headerContainer}>
            <div>
                <Link href="/" className={styles.link}>
                    Logo
                </Link>
            </div>
            <div className={styles.rightHead}>
                <Link href="/posts" className={styles.link}>
                    View Posts
                </Link>
                <Link href="/post/create" className={styles.link}>
                    Create Post
                </Link>
                {user ? (
                    <div className={styles.logout} onClick={handleLogOut}>
                        Logout
                    </div>
                ) : (
                    <Link href="/login" className={styles.link}>
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}
