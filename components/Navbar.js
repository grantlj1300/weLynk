import Link from "next/link";
import React from "react";

export default function Navbar() {
    return (
        <nav>
            <div>
                <h1>Logo</h1>
            </div>
            <Link href="/">Link1</Link>
            <Link href="/">Link2</Link>
            <Link href="/">Link3</Link>
        </nav>
    );
}
