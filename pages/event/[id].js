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

    async function getEvent() {
        try {
            const res = await fetch(`/api/event/${eventId}`, {
                method: "GET",
            });
            const data = await res.json();
            setEvent(data);
            setAllMessages(data.messages)
        } catch (error) {
            console.log(error);
        }
    }

    async function createMessage(message) {
        try{
            const res = await fetch("/api/message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: message,
                    room: eventId,
                    userId: user._id,
                    first: user.first,
                    last: user.last,
                }),
            })
            const data = await res.json()
            return data
        } catch (error) {
            console.log(error)
        }
    }

    async function updateEvent(newMessage) {
        try {
            const prevMessages = event.messages ? event.messages : [];
            const reqBody = {
                newMessages: [...prevMessages, newMessage._id],
            };
            const res = await fetch(`/api/event/${eventId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reqBody),
            });
            const data = await res.json();
            setEvent(data);
            return data
        } catch (error) {
            console.log(error);
        }
    }
    
    async function handleSubmit(e) {
        e.preventDefault();
        const stripped = message.trim();
        if (!stripped) return;
        const createdMessage = await createMessage(stripped)
        if (!createdMessage) return
        const updatedEvent = await updateEvent(createdMessage)
        if(!updatedEvent) return
        await fetch("/api/pusher", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: stripped,
                room: eventId,
                userId: user._id,
                first: user.first,
                last: user.last,
            }),
        });
        setMessage("");
    }

    if (event === "loading") {
        return <Loading />;
    }

    const messages = allMessages.map((data, idx) => {
        const other = user._id !== data.userId
        return <div
            key={idx}
            className={`${styles.messageContainer} 
                ${
                    other ? styles.otherMessage
                          : styles.userMessage
                }`}
        >
            {other && <div className={styles.messageSender}>
                {data.first} {data.last}
            </div>}
            <div className={styles.messageText}>{data.message}</div>
        </div>
    });

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
