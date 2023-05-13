import dbConnect from "../../lib/mongodb";
import User from "../../models/userModel";
import Event from "../../models/eventModel";

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();

    switch (method) {
        case "PUT":
            try {
                const { userId, eventId } = req.body;

                const session = await User.startSession();
                session.startTransaction();

                try {
                    const opts = { session };

                    const updatedUser = await User.findByIdAndUpdate(
                        userId,
                        { $addToSet: { events: eventId } },
                        { new: true, ...opts }
                    );

                    const updatedEvent = await Event.findByIdAndUpdate(
                        eventId,
                        { $addToSet: { members: userId } },
                        { new: true, ...opts }
                    );

                    await session.commitTransaction();
                    session.endSession();

                    res.status(200).json({
                        user: updatedUser,
                        event: updatedEvent,
                    });
                } catch (error) {
                    await session.abortTransaction();
                    session.endSession();
                    throw error;
                }
            } catch (error) {
                console.log(error);
                res.status(400).end();
            }
            break;
        case "DELETE":
            try {
                const { userId, eventId } = req.body;

                const session = await User.startSession();
                session.startTransaction();

                try {
                    const opts = { session };

                    const updatedEvent = await Event.findByIdAndUpdate(
                        eventId,
                        { $pull: { members: userId } },
                        { new: true, ...opts }
                    );

                    const updatedUser = await User.findByIdAndUpdate(
                        userId,
                        { $pull: { events: eventId } },
                        { new: true, ...opts }
                    );

                    await session.commitTransaction();
                    session.endSession();

                    res.status(200).json({
                        user: updatedUser,
                        event: updatedEvent,
                    });
                } catch (error) {
                    await session.abortTransaction();
                    session.endSession();

                    throw error;
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
