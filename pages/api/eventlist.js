import dbConnect from "../../lib/mongodb";
import Event from "../../models/eventModel";

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();
    switch (method) {
        case "POST":
            try {
                const events = await Event.find({ _id: { $in: req.body } });
                res.status(201).send(events);
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
