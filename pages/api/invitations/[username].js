import dbConnect from "../../../lib/mongodb";
import User from "../../../models/userModel";

export default async function handler(req, res) {
    const { username } = req.query;
    const { method } = req;
    await dbConnect();
    switch (method) {
        case "GET":
            try {
                const user = await User.findOne({ username })
                    .populate({
                        path: "invitations",
                        populate: [
                            {
                                path: "sender",
                                model: "User",
                                select: "name _id username",
                            },
                            {
                                path: "event",
                                model: "Event",
                                select: "title _id",
                            },
                        ],
                    })
                    .exec();
                res.status(201).send(user.invitations);
            } catch (error) {
                console.log(error);
                res.status(400).end();
            }
            break;
        case "PUT":
            try {
                const user = await User.findOneAndUpdate(
                    { username },
                    {
                        $set: {
                            "invitations.$[].viewed": true,
                        },
                    },
                    { new: true }
                )
                    .populate({
                        path: "invitations",
                        populate: [
                            {
                                path: "sender",
                                model: "User",
                                select: "name _id username",
                            },
                            {
                                path: "event",
                                model: "Event",
                                select: "title _id",
                            },
                        ],
                    })
                    .exec();
                res.status(200).send(user.invitations);
            } catch (error) {
                console.log(error);
                res.status(400).end();
            }
            break;
        case "DELETE":
            try {
                const { eventId } = req.body;
                const user = await User.findOneAndUpdate(
                    { username },
                    {
                        $pull: {
                            invitations: { event: eventId },
                        },
                    },
                    { new: true }
                );
                res.status(200).send(user);
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
