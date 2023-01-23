import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Loading from "../../components/Loading";
import Pusher from "pusher-js";
import axios from "axios";
let socket;

export default function Event({ eventId }) {
    const [event, setEvent] = useState("loading");
    const [message, setMessage] = useState("");
    const [allMessages, setAllMessages] = useState([]);

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
        const channel = pusher.subscribe("chat");
        channel.bind("chat-event", (data) => {
            setAllMessages((prev) => [...prev, data]);
        });
        return () => {
            pusher.unsubscribe("chat");
        };
        // fetch("/api/socket").then(() => {
        //     if (socket) {
        //         socket.off("receive-message");
        //         socket.disconnect();
        //     }
        //     socket = io();
        //     socket.emit("join", eventId);
        //     socket.on("receive-message", (data) => {
        //         setAllMessages((prev) => [...prev, data]);
        //     });
        // });
        // return () => {
        //     if (socket) {
        //         socket.off("receive-message");
        //         socket.disconnect();
        //     }
        // };
        // eslint-disable-next-line
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        // socket.emit("send-message", {
        //     message,
        //     eventId,
        // });
        await fetch("/api/pusher", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: message }),
        });
        setMessage("");
    }

    if (event === "loading") {
        return <Loading />;
    }

    const messages = allMessages.map((data, idx) => (
        <div key={idx}>{data.message}</div>
    ));

    return (
        <div>
            <div>{messages}</div>
            <form>
                <input
                    name="message"
                    placeholder="Type your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <input type="submit" value="Send" onClick={handleSubmit} />
            </form>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.params;
    return { props: { eventId: id } };
}
