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
    attending: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Event",
        },
    ],
});

export default models.User || model("User", userSchema);
