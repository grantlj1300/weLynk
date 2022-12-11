import Head from "next/head";
import styles from "../styles/Home.module.css";

export const getStaticProps = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    return {
        props: { users: data },
    };
};

export default function Home({ users }) {
    return (
        <>
            <Head>
                <title>MeetUp | Home</title>
            </Head>
            <div>
                <h1>Home</h1>
                {users.map((user) => (
                    <div key={user.id}>{user.name}</div>
                ))}
            </div>
        </>
    );
}
