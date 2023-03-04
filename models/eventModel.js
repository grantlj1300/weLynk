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
    eventType: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
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

eventSchema.index({ location: "2dsphere" });
eventSchema.index({ title: "text", description: "text" });

export default models.Event || model("Event", eventSchema);
