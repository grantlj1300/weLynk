import dbConnect from "../../lib/mongodb";
import Message from "../../models/messageModel";

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();
    switch (method) {
        case "POST":
            try {
                const newMessage = await Message.create(req.body);
                res.status(201).send(newMessage);
            } catch (error) {
                console.log(error);
                res.status(400).end();
            }
            break;
        default:
            res.status(400).end();
            break;
    }
}
