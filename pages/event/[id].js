import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/Event.module.css";
import { RiSendPlaneFill } from "react-icons/ri";
import Loading from "../../components/Loading";
import Pusher from "pusher-js";

export default function Event({ eventId, user }) {
    const [event, setEvent] = useState("loading");
    const [message, setMessage] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const chats = useRef(null);

    useEffect(() => {
        if (chats && chats.current) {
            chats.current.addEventListener("DOMNodeInserted", (event) => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: "smooth" });
            });
        }
    }, [allMessages]);

    async function getEvent() {
        try {
            const res = await fetch(`/api/event/${eventId}`, {
                method: "GET",
            });
            const data = await res.json();
            setEvent(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getEvent();
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
            cluster: "us3",
        });
        const channel = pusher.subscribe(eventId);
        channel.bind("chat-event", (data) => {
            setAllMessages((prev) => [...prev, data]);
        });
        return () => {
            pusher.unsubscribe(eventId);
        };
        // eslint-disable-next-line
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const stripped = message.trim();
        if (!stripped) return;
        await fetch("/api/pusher", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: stripped,
                room: eventId,
                userId: user._id,
            }),
        });
        setMessage("");
    }

    if (event === "loading") {
        return <Loading />;
    }

    const messages = allMessages.map((data, idx) => (
        <div
            key={idx}
            className={`${styles.message} 
                ${
                    user._id === data.userId
                        ? styles.userMessage
                        : styles.otherMessage
                }`}
        >
            {data.message}
        </div>
    ));

    return (
        <div>
            <div className={styles.chatContainer}>
                <div className={styles.chatHeader}>Chat Header</div>
                <div className={styles.chatMessageBox} ref={chats}>
                    {messages}
                </div>
                <form className={styles.chatFooter}>
                    <div className={styles.inputContainer}>
                        <input
                            className={styles.chatInput}
                            name="message"
                            placeholder="Type your message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></input>
                        <button
                            className={styles.hide}
                            type="submit"
                            onClick={handleSubmit}
                        >
                            <RiSendPlaneFill
                                size={14}
                                className={styles.sendIcon}
                            />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.params;
    return { props: { eventId: id } };
}
