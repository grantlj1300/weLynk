import Head from "next/head";
import MapWrapper from "../../components/MapWrapper";

export default function Posts() {
    return (
        <>
            <Head>
                <title>MeetUp | Posts</title>
            </Head>
            <h1>Map</h1>
            <MapWrapper />
        </>
    );
}
