import Link from "next/link";
import React from "react";
import styles from "../styles/Navbar.module.css";
import { BiMapPin } from "react-icons/bi";

export default function Navbar({ handleLogOut, user }) {
    return (
        <nav className={styles.headerContainer}>
            <div>
                <Link href="/" className="logo">
                    <BiMapPin size={25} />
                    <div className="logoText">weLynk</div>
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
                        Logout, {user.first}
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
