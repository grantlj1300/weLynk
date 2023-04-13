import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children, handleLogOut, user, setUser }) {
    return (
        <div>
            {user && (
                <Navbar
                    handleLogOut={handleLogOut}
                    user={user}
                    setUser={setUser}
                />
            )}
            {children}
            {user && <Footer />}
        </div>
    );
}
