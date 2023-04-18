import { useRouter } from "next/router";
import Loading from "./Loading";

export default function RouteGuard({ children, user }) {
    const router = useRouter();
    const unprotected = ["/login", "/register", "/"];

    if (
        typeof window !== "undefined" &&
        user === null &&
        (!unprotected.includes(router.pathname) || router.pathname === "/")
    )
        router.push("/login");
    else if (
        typeof window !== "undefined" &&
        user &&
        unprotected.includes(router.pathname)
    )
        router.push("/profile");

    if (
        (!user && !unprotected.includes(router.pathname)) ||
        (user && unprotected.includes(router.pathname)) ||
        user === undefined
    )
        return <Loading />; // a loading component that prevents the page from rendering

    return children;
}
