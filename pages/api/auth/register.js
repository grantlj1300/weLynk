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
                    let errors = {};
                    if (existingUser.email === req.body.email)
                        errors.email = "Email already in use";
                    if (existingUser.username === req.body.username)
                        errors.username = "Username already in use";
                    res.status(403).send({ errors: errors, success: false });
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
