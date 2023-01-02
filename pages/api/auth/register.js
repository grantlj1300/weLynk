import dbConnect from "../../../lib/mongodb";
import User from "../../../models/userModel";

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();
    switch (method) {
        case "POST":
            try {
                const newUser = await User.create(req.body);
                res.status(201).send(newUser);
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
