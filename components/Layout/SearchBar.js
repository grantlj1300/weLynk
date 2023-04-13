import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/Layout/SearchBar.module.css";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [timer, setTimer] = useState(null);
    const [results, setResults] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const closeSearchRef = useRef();

    const useOutsideClick = (ref, callback) => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                callback();
            }
        };

        useEffect(() => {
            document.addEventListener("click", handleClick);

            return () => {
                document.removeEventListener("click", handleClick);
            };
        });
    };

    useOutsideClick(closeSearchRef, () => {
        handleClearSearch();
    });

    async function fetchSearchResults() {
        try {
            const res = await fetch(`/api/users/${query}`, {
                method: "GET",
            });
            const users = await res.json();
            return users;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    function handleInputChange(e) {
        setQuery(e.target.value);
        clearTimeout(timer);
        const newTimer = setTimeout(() => {
            !query
                ? setResults([])
                : fetchSearchResults().then((result) => {
                      setResults(result);
                  });
        }, 500);
        setTimer(newTimer);
    }

    function handleClearSearch() {
        setQuery("");
        setResults([]);
        setShowSearch(false);
    }

    const userList = results.map((result, i) => (
        <Link
            className={styles.row}
            key={i}
            onClick={handleClearSearch}
            href={`/profile/${result.username}`}
        >
            <Image
                className={styles.avatar}
                src={
                    result.avatar?.length > 0
                        ? result.avatar
                        : "/assets/img/default-avi.jpeg"
                }
                alt="Avatar"
                width={40}
                height={40}
            />
            <div className={styles.rowText}>
                <h3>@{result.username}</h3>
                <div>{result.name}</div>
            </div>
        </Link>
    ));

    return (
        <div
            ref={closeSearchRef}
            className={`${styles.container} ${showSearch ? styles.show : ""}`}
        >
            <div
                className={`${styles.iconContainer} ${
                    results.length > 0 ? styles.active : ""
                }`}
            >
                <AiOutlineSearch
                    className={styles.icon}
                    onClick={() => setShowSearch(true)}
                />
            </div>
            <input
                className={`${styles.input} ${
                    results.length > 0 ? styles.active : ""
                }`}
                value={query}
                onChange={handleInputChange}
                placeholder="Search by username"
            />
            <div className={styles.rowContainer}>{userList}</div>
        </div>
    );
}
