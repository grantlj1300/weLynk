import dbConnect from "../../../lib/mongodb";
import User from "../../../models/userModel";

const bcrypt = require("bcryptjs");

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();
    switch (method) {
        case "POST":
            try {
                const existingUser = await User.findOne({
                    $or: [
                        { email: req.body.email },
                        { username: req.body.username },
                    ],
                });
                if (existingUser) {
                    if (existingUser.email === req.body.email) {
                        res.status(403).send({
                            error: { email: "Email already exists" },
                            success: false,
                        });
                    } else {
                        res.status(403).send({
                            error: { username: "Username already exists" },
                            success: false,
                        });
                    }
                } else {
                    let userToAdd = req.body;
                    const hashedPassword = await bcrypt.hash(
                        req.body.password,
                        10
                    );
                    userToAdd.password = hashedPassword;
                    const newUser = await User.create(req.body);
                    res.status(201).send({ success: true, result: newUser });
                }
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
