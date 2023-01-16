import dbConnect from "../../lib/mongodb";
import User from "../../models/userModel";

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();
    switch (method) {
        case "POST":
            try {
                const user = await User.findById(req.body.userId).select(
                    "-password"
                );
                res.status(201).send(user);
            } catch (error) {
                console.log(error);
                res.status(400).end();
            }
            break;
        case "PUT":
            try {
                const { userId, newAttending } = req.body;
                const user = await User.findByIdAndUpdate(userId, {
                    attending: newAttending,
                });
                res.status(200).send(user);
            } catch (error) {
                res.status(400).end();
            }
            break;
        default:
            res.status(400).end();
            break;
    }
}
