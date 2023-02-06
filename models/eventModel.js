import mongoose, { Schema, model, models } from "mongoose";

const eventSchema = new Schema({
    admin: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User",
    },
    members: {
        type: [mongoose.Types.ObjectId],
        required: true,
        ref: "User",
    },
    messages: {
        type: [mongoose.Types.ObjectId],
        required: true,
        ref: "Message",
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    photo: {
        type: String,
        required: false,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    lon: {
        type: String,
        required: true,
        trim: true,
    },
    lat: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: String,
        required: true,
        trim: true,
    },
    time: {
        type: String,
        required: true,
        trim: true,
    },
});

export default models.Event || model("Event", eventSchema);
