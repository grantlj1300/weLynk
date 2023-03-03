import dbConnect from "../../lib/mongodb";
import Event from "../../models/eventModel";

export const config = { api: { bodyParser: { sizeLimit: "2mb" } } };

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();
    switch (method) {
        case "GET":
            try {
                let { minLon, maxLon, minLat, maxLat, filter } = req.query;
                let filterQuery = {};

                if (filter !== "all") {
                    const eventTypes = filter.split(",");
                    filterQuery = { eventType: { $in: eventTypes } };
                }
                if (parseFloat(minLon) > parseFloat(maxLon)) {
                    minLon -= 360;
                }
                const locationQuery = {
                    location: {
                        $geoWithin: {
                            $box: [
                                [minLon, minLat],
                                [maxLon, maxLat],
                            ],
                        },
                    },
                };
                const events = await Event.find({
                    $and: [filterQuery, locationQuery],
                });
                res.status(201).send(events);
            } catch (error) {
                console.log(error);
                res.status(400).end();
            }
            break;
        case "POST":
            try {
                const newEvent = await Event.create(req.body);
                res.status(201).send(newEvent);
            } catch (error) {
                console.log(error);
                res.status(400).end();
            }
            break;
        case "PUT":
            try {
                const { eventId, newMembers } = req.body;
                const event = await Event.findByIdAndUpdate(eventId, {
                    members: newMembers,
                });
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
