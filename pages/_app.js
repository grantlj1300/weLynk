import Layout from "../components/Layout/Layout";
import RouteGuard from "../components/RouteGuard";
import "../styles/globals.css";
import { LoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import Head from "next/head";

const libraries = ["places"];

export default function MyApp({ Component, pageProps }) {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const userSession = localStorage.getItem("session");
        if (userSession && !user) {
            const foundUserId = JSON.parse(userSession);
            async function fetchUser(userId) {
                try {
                    const res = await fetch("/api/user", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ userId: userId }),
                    });
                    const foundUser = await res.json();
                    setUser(foundUser);
                } catch (error) {
                    console.log(error);
                }
            }
            fetchUser(foundUserId);
        } else if (!userSession) {
            setUser(null);
        }
        // eslint-disable-next-line
    }, []);

    function handleUserLogIn(user) {
        localStorage.setItem("session", JSON.stringify(user._id));
        setUser(user);
    }

    function handleLogOut() {
        setUser(null);
        localStorage.clear();
    }

    return (
        <>
            <Head>
                <title>weLynk</title>
                <meta
                    name="description"
                    content="weLynk is a social platform that allows you to create and join events based on your interests. From sports to music, food to travel, and everything in between, weLynk connects people who share common passions and hobbies. Start planning your next hangout today!"
                />
                <link rel="icon" href="/assets/img/logo.png" />
            </Head>
            <LoadScript
                googleMapsApiKey={process.env.NEXT_PUBLIC_MAP_API_KEY}
                libraries={libraries}
                loadingElement={<div />}
            >
                <RouteGuard user={user}>
                    <Layout handleLogOut={handleLogOut} user={user}>
                        <Component
                            {...pageProps}
                            handleUserLogIn={handleUserLogIn}
                            user={user}
                            setUser={setUser}
                        />
                    </Layout>
                </RouteGuard>
            </LoadScript>
        </>
    );
}
