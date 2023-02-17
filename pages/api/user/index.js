import dbConnect from "../../../lib/mongodb";
import User from "../../../models/userModel";

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
                const { userId } = req.body;
                const user = await User.findByIdAndUpdate(userId, req.body, {
                    new: true,
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
