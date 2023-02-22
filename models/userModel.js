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
        minLon: { type: String },
        maxLat: { type: String },
        maxLon: { type: String },
        minLat: { type: String },
    },
});

export default models.User || model("User", userSchema);
