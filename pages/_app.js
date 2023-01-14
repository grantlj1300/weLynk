import Layout from "../components/Layout";
import RouteGuard from "../components/RouteGuard";
import "../styles/globals.css";
import { LoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const libraries = ["places"];

export default function MyApp({ Component, pageProps }) {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("session");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        } else {
            setUser(null);
        }
    }, []);

    function handleUserLogIn(user) {
        localStorage.setItem("session", JSON.stringify(user));
        setUser(user);
    }

    function handleLogOut() {
        setUser(null);
        localStorage.clear();
    }
    console.log(user);
    return (
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
                    />
                </Layout>
            </RouteGuard>
        </LoadScript>
    );
}
