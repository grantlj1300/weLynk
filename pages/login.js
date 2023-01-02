import Link from "next/link";
import Head from "next/head";
import { useState } from "react";

export default function Login({ handleUserLogIn }) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

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
            const data = await res.json();
            console.log(data);
            handleUserLogIn(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Head>
                <title>MeetUp | Login</title>
            </Head>
            <div>
                <h1>Login</h1>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button onClick={logInUser}>Sign Up</button>
                <p>
                    No account? <Link href="/register">Register</Link>
                </p>
            </div>
        </>
    );
}
