import dbConnect from "../../lib/mongodb";
import User from "../../models/userModel";
// Status
// 0: Sent request
// 1: Received request
// 2: Friends
export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();
    switch (method) {
        // Post adds a NEW relationship (send friend request case)
        case "POST":
            try {
                const { sender, recipient } = req.body;
                const user = await User.findOneAndUpdate(
                    { _id: sender },
                    { $push: { friends: { user: recipient, status: 0 } } },
                    { new: true }
                );
                const other = await User.findOneAndUpdate(
                    { _id: recipient },
                    { $push: { friends: { user: sender, status: 1 } } },
                    { new: true }
                );
                res.status(200).send({ user: user, otherUser: other });
            } catch (error) {
                res.status(400).end();
            }
            break;
        // Put establishes a friendship (mutual)
        case "PUT":
            try {
                const { sender, recipient } = req.body;
                const senderFriendship = await User.findOneAndUpdate(
                    { _id: sender, "friends.user": recipient },
                    { $set: { "friends.$.status": 2 } },
                    { new: true }
                );
                const recipientFriendship = await User.findOneAndUpdate(
                    { _id: recipient, "friends.user": sender },
                    { $set: { "friends.$.status": 2 } },
                    { new: true }
                );
                res.status(200).send({
                    user: senderFriendship,
                    otherUser: recipientFriendship,
                });
            } catch (error) {
                res.status(400).end();
            }
            break;
        // Delete removes a relationship from both parties
        case "DELETE":
            try {
                const { sender, recipient } = req.body;
                const user = await User.findOneAndUpdate(
                    { _id: sender },
                    { $pull: { friends: { user: recipient } } },
                    { new: true }
                );
                const other = await User.findOneAndUpdate(
                    { _id: recipient },
                    { $pull: { friends: { user: sender } } },
                    { new: true }
                );
                res.status(200).send({ user: user, otherUser: other });
            } catch (error) {
                res.status(400).end();
            }
            break;
        default:
            res.status(400).end();
            break;
    }
}
