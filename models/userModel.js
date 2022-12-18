import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
});

export default models.User || model("User", userSchema);
