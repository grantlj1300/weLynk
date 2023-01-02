import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children, handleLogOut, user }) {
    return (
        <div>
            <Navbar handleLogOut={handleLogOut} user={user} />
            {children}
            <Footer />
        </div>
    );
}
