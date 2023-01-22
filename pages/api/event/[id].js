import dbConnect from "../../../lib/mongodb";
import Event from "../../../models/eventModel";

export default async function handler(req, res) {
    const { id } = req.query;
    const { method } = req;
    await dbConnect();
    switch (method) {
        case "GET":
            try {
                const event = await Event.findById(id);
                res.status(201).send(event);
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
