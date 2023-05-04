import dbConnect from "../../lib/mongodb";
import Event from "../../models/eventModel";
import Message from "../../models/messageModel";
import User from "../../models/userModel";

export const config = { api: { bodyParser: { sizeLimit: "2mb" } } };

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();
    switch (method) {
        case "GET":
            try {
                let {
                    minLon,
                    maxLon,
                    minLat,
                    maxLat,
                    filter,
                    keywords,
                    eventVisibility,
                    friends,
                } = req.query;
                let filterQuery = {};
                let keywordQuery = {};
                let pubPrivQuery = {};
                if (filter !== "all") {
                    const eventTypes = filter.split(",");
                    filterQuery = { eventType: { $in: eventTypes } };
                }
                if (keywords.length > 0) {
                    keywordQuery = { $text: { $search: keywords } };
                }
                if (parseFloat(minLon) > parseFloat(maxLon)) {
                    minLon -= 360;
                }
                if (eventVisibility === "public") {
                    pubPrivQuery = { isPublic: true };
                } else if (eventVisibility === "friends") {
                    pubPrivQuery = {
                        $and: [
                            { isPublic: false },
                            { admin: { $in: friends.split(",") } },
                        ],
                    };
                } else {
                    pubPrivQuery = {
                        $or: [
                            { isPublic: true },
                            { admin: { $in: friends.split(",") } },
                        ],
                    };
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
                const dateQuery = {
                    date: { $gte: new Date().toISOString().split("T")[0] },
                };
                const events = await Event.find({
                    $and: [
                        filterQuery,
                        keywordQuery,
                        locationQuery,
                        dateQuery,
                        pubPrivQuery,
                    ],
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
                const { eventId, updated } = req.body;
                const event = await Event.findByIdAndUpdate(eventId, updated);
                console.log(updated);
                res.status(200).send(event);
            } catch (error) {
                res.status(400).end();
            }
            break;
        case "DELETE":
            try {
                const { eventId, members, messages } = req.body;

                // Remove the event ID from all attending users' "events" arrays
                await Promise.all(
                    members.map(async (member) => {
                        await User.findByIdAndUpdate(member._id, {
                            $pull: { events: eventId },
                        });
                    })
                );

                // Delete all messages associated with the event
                await Message.deleteMany({
                    _id: { $in: messages.map((message) => message._id) },
                });

                // Delete the event itself
                await Event.findByIdAndDelete(eventId);

                res.status(200).end();
            } catch (error) {
                res.status(400).end();
            }
            break;
        default:
            res.status(400).end();
            break;
    }
}
