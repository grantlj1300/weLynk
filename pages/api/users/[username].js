import dbConnect from "../../../lib/mongodb";
import User from "../../../models/userModel";

export default async function handler(req, res) {
    const { username } = req.query;
    const { method } = req;
    await dbConnect();
    switch (method) {
        case "GET":
            try {
                const users = await User.aggregate([
                    {
                        $search: {
                            index: "userSearch",
                            autocomplete: {
                                query: username,
                                path: "username",
                                fuzzy: {
                                    maxEdits: 1,
                                    prefixLength: 1,
                                },
                            },
                        },
                    },
                    { $limit: 5 },
                    {
                        $project: {
                            name: 1,
                            username: 1,
                            avatar: 1,
                            _id: 0,
                        },
                    },
                ]);
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
