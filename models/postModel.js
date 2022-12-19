import { Schema, model, models } from "mongoose";

const postSchema = new Schema({
    title: {
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

export default models.Post || model("Post", postSchema);
