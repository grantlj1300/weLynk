import dbConnect from "../../../lib/mongodb";
import User from "../../../models/userModel";

const bcrypt = require("bcryptjs");

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();
    switch (method) {
        case "POST":
            try {
                const user = await User.findOne({
                    username: req.body.username,
                });
                if (!user) {
                    res.status(404).send({
                        success: false,
                        errors: { username: "Username not found" },
                    });
                } else {
                    const match = await bcrypt.compare(
                        req.body.password,
                        user.password
                    );
                    if (match) {
                        const { password, ...userObj } = user._doc;
                        res.status(200).send({ success: true, user: userObj });
                    } else
                        res.status(403).send({
                            success: false,
                            errors: { password: "Incorrect password" },
                        });
                }
            } catch (error) {
                res.status(400).end();
            }
            break;
        default:
            res.status(400).end();
            break;
    }
}
