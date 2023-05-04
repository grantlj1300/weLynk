import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    name: {
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
    bio: {
        type: String,
        trim: true,
    },
    events: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Event",
        },
    ],
    defaultRegion: {
        _id: false,
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
    friends: {
        type: [
            {
                _id: false,
                user: {
                    type: mongoose.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                status: {
                    type: Number,
                    required: true,
                },
            },
        ],
        required: true,
        default: [],
    },
    invitations: {
        type: [
            {
                _id: false,
                sender: {
                    type: mongoose.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                event: {
                    type: mongoose.Types.ObjectId,
                    ref: "Event",
                    required: true,
                },
            },
        ],
        required: true,
        default: [],
    },
});

export default models.User || model("User", userSchema);
