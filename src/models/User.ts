import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
    {
        name: { type: String },
        email: { type: String, unique: true, sparse: true },
        emailVerified: { type: Date },
        image: { type: String },
        password: { type: String },
    },
    { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
