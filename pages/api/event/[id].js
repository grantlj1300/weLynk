import dbConnect from "../../../lib/mongodb";
import Event from "../../../models/eventModel";

export default async function handler(req, res) {
    const { id } = req.query;
    const { method } = req;
    await dbConnect();
    switch (method) {
        case "GET":
            try {
                const event = await Event.findById(id).populate([
                    {
                        path: "messages",
                        select: "-_id -__v -room",
                    },
                    {
                        path: "members",
                        select: "_id username name",
                    },
                ]);
                // let results = await OrderModel.find().populate([{path: 'user', select: 'firstname'}, {path: 'meal', select: 'name'}]);
                res.status(201).send(event);
            } catch (error) {
                console.log(error);
                res.status(400).end();
            }
            break;
        case "PUT":
            try {
                const { messageId } = req.body;
                const event = await Event.findByIdAndUpdate(
                    id,
                    {
                        $push: { messages: messageId },
                    },
                    { new: true }
                );
                res.status(200).send(event);
            } catch (error) {
                res.status(400).end();
            }
            break;
        default:
            res.status(400).end();
            break;
    }
}
