import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    first: {
        type: String,
        required: true,
        trim: true,
    },
    last: {
        type: String,
        required: true,
        trim: true,
    },
    avatar: {
        data: Buffer,
        contentType: String,
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    events: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Event",
        },
    ],
    defaultRegion: {
        type: {
            minLon: { type: String },
            maxLat: { type: String },
            maxLon: { type: String },
            minLat: { type: String },
        },
        required: true,
        default: {
            minLon: "-124.733",
            maxLat: "49.5904",
            maxLon: "-66.9548",
            minLat: "24.9493",
        },
    },
});

export default models.User || model("User", userSchema);
