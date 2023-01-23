import Pusher from "pusher";

export const pusher = new Pusher({
    appId: process.env.PUSHER_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true,
});

export default async function handler(req, res) {
    const { message } = req.body;
    const response = await pusher.trigger("chat", "chat-event", {
        message,
    });

    res.json({ message: "completed" });
}
