import Layout from "../components/Layout";
import "../styles/globals.css";
import { LoadScript } from "@react-google-maps/api";

const libraries = ["places"];

export default function MyApp({ Component, pageProps }) {
    return (
        <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_MAP_API_KEY}
            libraries={libraries}
        >
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </LoadScript>
    );
}
