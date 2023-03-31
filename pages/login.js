import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Auth.module.css";
import Image from "next/image";
import { BiMapPin } from "react-icons/bi";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";

export default function Login({ handleUserLogIn }) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        username: "",
        password: "",
    });
    const [submitStatus, setSubmitStatus] = useState("none");
    const [passwordView, setPasswordView] = useState("password");

    function handleChange(e) {
        const { name, value } = e.target;
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    async function logInUser() {
        setSubmitStatus("submitting");
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
                Object.keys(result.errors).forEach((key) => {
                    setErrors((prevData) => ({
                        ...prevData,
                        [key]: result.errors[key],
                    }));
                });
                setSubmitStatus("none");
            }
        } catch (error) {
            setSubmitStatus("none");
            console.log(error);
        }
    }

    function checkFormData() {
        const formErr = {};
        if (formData.username.length === 0)
            formErr.username = "Please enter your username";
        if (formData.password.length === 0)
            formErr.password = "Please enter your password";
        if (Object.keys(formErr).length > 0) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                ...formErr,
            }));
            return false;
        }
        return true;
    }

    function handleLogInClick(e) {
        e.preventDefault();
        const formStatus = checkFormData();
        if (formStatus) {
            logInUser();
        }
    }

    function renderSubmit() {
        if (submitStatus === "none") {
            return <button onClick={handleLogInClick}>Log in</button>;
        }
        if (submitStatus === "submitting") {
            return (
                <button>
                    <div className="spin" />
                </button>
            );
        }
    }

    return (
        <div className={styles.page}>
            <Head>
                <title>weLynk | Login</title>
            </Head>
            <div className={styles.blob} />
            <Link href="/" className={`${styles.logo} ${"logo"}`}>
                <BiMapPin size={25} />
                <div className="logoText">weLynk</div>
            </Link>
            <div className={styles.left}>
                <div className={styles.leftInfo}>
                    <h1 className={styles.leftHeader}>Welcome back,</h1>
                    <p className={styles.leftBody}>
                        Continue your journey and make some new connections,
                        link up with old friends, or find some new hobbies
                        you&apos;d like to try!
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
                    {errors.username && (
                        <div className={styles.error}>{errors.username}</div>
                    )}
                    <input
                        className={styles.input}
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.password && (
                        <div className={styles.error}>{errors.password}</div>
                    )}
                    <div className={styles.password}>
                        <input
                            className={styles.input}
                            type={passwordView}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {passwordView === "password" ? (
                            <RiEyeCloseLine
                                className={styles.passwordIcon}
                                size={25}
                                onClick={() => setPasswordView("text")}
                            />
                        ) : (
                            <RiEyeLine
                                className={styles.passwordIcon}
                                size={25}
                                onClick={() => setPasswordView("password")}
                            />
                        )}
                    </div>
                    {renderSubmit()}
                    <p className={styles.login}>
                        Don&apos;t have an account?{" "}
                        <Link className={styles.loginLink} href="/register">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
