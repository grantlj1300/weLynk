import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Register.module.css";
import Image from "next/image";

export default function Register() {
    const [formData, setFormData] = useState({
        first: "",
        last: "",
        username: "",
        email: "",
        password: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    async function registerNewUser() {
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.page}>
            <Head>
                <title>MeetUp | Register</title>
            </Head>
            <div className={styles.left}>
                <div className={styles.blob} />
                <div className={styles.leftInfo}>
                    <Link href="/" className={styles.link}>
                        Logo
                    </Link>
                    <h1 className={styles.leftHeader}>Hello visitor,</h1>
                    <p className={styles.leftBody}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Praesent fringilla turpis ex, eget tristique libero
                        interdum in.
                    </p>
                    <Image
                        src="/assets/img/login-surf.svg"
                        alt="surf"
                        width={350}
                        height={350}
                        className={styles.surfImg}
                    />
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.form}>
                    <h1>Create an account</h1>
                    <p>Hello new user blah blah blah</p>
                    <input
                        type="text"
                        name="first"
                        placeholder="First"
                        value={formData.first}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="last"
                        placeholder="Last"
                        value={formData.last}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button onClick={registerNewUser}>Sign Up</button>
                    <p>
                        Already have an account?{" "}
                        <Link href="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
