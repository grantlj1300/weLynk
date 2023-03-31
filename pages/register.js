import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Auth.module.css";
import Image from "next/image";
import { BiMapPin } from "react-icons/bi";
import { useRouter } from "next/router";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });
    const [submitStatus, setSubmitStatus] = useState("none");
    const [errors, setErrors] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });
    const [passwordView, setPasswordView] = useState("password");
    const router = useRouter();

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

    async function registerNewUser() {
        setSubmitStatus("submitting");
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success) {
                setSubmitStatus("success");
                setTimeout(() => {
                    router.push("/login");
                }, 1000);
            } else {
                Object.keys(data.errors).forEach((key) => {
                    setErrors((prevData) => ({
                        ...prevData,
                        [key]: data.errors[key],
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
        const usernameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_]*$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const formErr = {};
        setFormData((prev) => ({ ...prev, name: prev.name.trim() }));
        if (formData.name.length === 0)
            formErr.name = "Display name is required";
        if (formData.username.length < 3)
            formErr.username = "Username must be at least 3 characters";
        else if (!usernameRegex.test(formData.username))
            formErr.username =
                "Username can only contain letters (at least one), numbers, and underscores";
        if (formData.email.length === 0) formErr.email = "Email is required";
        else if (!emailRegex.test(formData.email))
            formErr.email = "Please enter a valid email";
        if (formData.password.length < 5)
            formErr.password = "Password must be between 5 and 30 characters";
        if (Object.keys(formErr).length > 0) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                ...formErr,
            }));
            return false;
        }
        return true;
    }

    function handleRegisterClick(e) {
        e.preventDefault();
        const formStatus = checkFormData();
        if (formStatus) {
            registerNewUser();
        }
    }

    function renderSubmit() {
        if (submitStatus === "none") {
            return <button onClick={handleRegisterClick}>Sign up</button>;
        }
        if (submitStatus === "submitting") {
            return (
                <button>
                    <div className="spin" />
                </button>
            );
        }
        if (submitStatus === "success") {
            return <button>Success!</button>;
        }
    }

    return (
        <div className={styles.page}>
            <Head>
                <title>weLynk | Register</title>
            </Head>
            <div className={styles.blob} />
            <Link href="/" className={`${styles.logo} ${"logo"}`}>
                <BiMapPin size={25} />
                <div className="logoText">weLynk</div>
            </Link>
            <div className={styles.left}>
                <div className={styles.leftInfo}>
                    <h1 className={styles.leftHeader}>Hello adventurer,</h1>
                    <p className={styles.leftBody}>
                        Take the first step towards new experiences and lifelong
                        memories by registering for weLynk today!
                    </p>
                    <Image
                        src="/assets/img/login-gameday.svg"
                        alt="surf"
                        width={350}
                        height={350}
                        className={styles.surfImg}
                    />
                </div>
            </div>
            <div className={styles.right}>
                <form className={styles.form}>
                    <h1>Create an account</h1>
                    {errors.name && (
                        <div className={styles.error}>{errors.name}</div>
                    )}
                    <input
                        className={styles.input}
                        type="text"
                        name="name"
                        maxLength={25}
                        placeholder="Display name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.username && (
                        <div className={styles.error}>{errors.username}</div>
                    )}
                    <input
                        className={styles.input}
                        type="text"
                        name="username"
                        maxLength={16}
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.email && (
                        <div className={styles.error}>{errors.email}</div>
                    )}
                    <input
                        className={styles.input}
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
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
                            maxLength={30}
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
                        Already have an account?{" "}
                        <Link className={styles.loginLink} href="/login">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
