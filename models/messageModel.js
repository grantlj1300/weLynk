import mongoose, { Schema, model, models } from "mongoose";

const messageSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User",
    },
    room: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Event",
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
});

export default models.Message || model("Message", messageSchema);
