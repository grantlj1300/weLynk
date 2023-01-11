import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Login.module.css";
import Image from "next/image";
import { BiMapPin } from "react-icons/bi";

export default function Login({ handleUserLogIn }) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState();

    useEffect(() => {
        if (errors) {
            console.log(errors);
        }
    }, [errors]);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    async function logInUser() {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const result = await res.json();
            if (result.success) {
                handleUserLogIn(result.user);
            } else {
                setErrors(result.error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function handleLogInClick(e) {
        e.preventDefault();
        logInUser();
    }

    return (
        <div className={styles.page}>
            <Head>
                <title>MeetUp | Login</title>
            </Head>
            <div className={styles.left}>
                <div className={styles.blob} />
                <div className={styles.leftInfo}>
                    <Link href="/" className="logo">
                        <BiMapPin size={25} />
                        <div className="logoText">weLynk</div>
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
                <form className={styles.form}>
                    <h1>Log in</h1>
                    <p>Welcome back! Please enter your details.</p>
                    <input
                        className={styles.input}
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <input
                        className={styles.input}
                        type="text"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <input
                        className={styles.submit}
                        type="submit"
                        value="Sign in"
                        onClick={handleLogInClick}
                    />
                    <p className={styles.switch}>
                        Don&apos;t have an account?{" "}
                        <Link className={styles.signUp} href="/register">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
