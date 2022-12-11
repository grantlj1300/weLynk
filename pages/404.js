import Link from "next/link";
import Head from "next/head";

export default function NotFound() {
    return (
        <>
            <Head>
                <title>MeetUp | Not Found</title>
            </Head>
            <div>
                <h1>Uh Oh!</h1>
                <h2>This page doesn't exist</h2>
                <p>
                    Return to the <Link href="/">Homepage</Link>
                </p>
            </div>
        </>
    );
}
