import dbConnect from "../../../lib/mongodb";
import User from "../../../models/userModel";

export default async function handler(req, res) {
    const { username } = req.query;
    const { method } = req;
    await dbConnect();
    switch (method) {
        case "GET":
            try {
                const user = await User.findOne({ username: username });
                res.status(201).send(user);
            } catch (error) {
                console.log(error);
                res.status(400).end();
            }
            break;
        case "PUT":
            try {
                const { invitation } = req.body;
                const user = await User.findOneAndUpdate(
                    { username },
                    {
                        $push: {
                            invitations: {
                                $each: [invitation],
                                $position: 0,
                            },
                        },
                    },
                    { new: true }
                );
                res.status(201).send(user);
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
