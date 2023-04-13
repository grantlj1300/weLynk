import dbConnect from "../../../lib/mongodb";
import User from "../../../models/userModel";

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();
    switch (method) {
        case "POST":
            try {
                const users = await User.find({
                    _id: { $in: req.body },
                }).select("_id name username avatar");
                res.status(201).send(users);
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
