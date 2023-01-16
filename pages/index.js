import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/LandingPage.module.css";
import { BiMapPin } from "react-icons/bi";

export default function LandingPage() {
    return (
        <div className={styles.page}>
            <Head>
                <title>weLynk | Home</title>
            </Head>
            <nav className={styles.header}>
                <div className={styles.logo}>
                    <Link href="/" className="logo">
                        <BiMapPin size={25} />
                        <div className="logoText">weLynk</div>
                    </Link>
                </div>
                <div className={styles.rightHead}>
                    <Link href="/register" className={styles.link}>
                        Register
                    </Link>
                    <Link href="/login" className={styles.link}>
                        Login
                    </Link>
                </div>
            </nav>
            <div className={styles.imgWrap}>
                <Image
                    src="/assets/img/landing-map.jpg"
                    alt="header"
                    className={styles.headImg}
                    fill={true}
                />
                <div className={styles.fade} />
            </div>
            <div className={styles.triContainer}>
                <h1>Left</h1>
                <h1>Mid</h1>
                <h1>Right</h1>
            </div>
        </div>
    );
}
