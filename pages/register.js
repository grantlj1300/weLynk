import Link from "next/link";
import Head from "next/head";
import { useState } from "react";

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
        <>
            <Head>
                <title>MeetUp | Register</title>
            </Head>
            <div>
                <h1>Sign Up</h1>
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
                    Already have an account? <Link href="/login">Login</Link>
                </p>
            </div>
        </>
    );
}
