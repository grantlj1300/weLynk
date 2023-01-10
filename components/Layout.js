import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children, handleLogOut, user }) {
    return (
        <div>
            {user && <Navbar handleLogOut={handleLogOut} user={user} />}
            {children}
            {user && <Footer />}
        </div>
    );
}
