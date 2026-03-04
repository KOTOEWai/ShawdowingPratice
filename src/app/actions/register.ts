"use server";

import dbConnect from "@/app/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password || !name) {
        return { error: "Please fill all fields" };
    }

    try {
        await dbConnect();
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return { error: "User already exists" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return { success: "Account created successfully" };
    } catch (error) {
        console.error("Registration error:", error);
        return { error: "Something went wrong" };
    }
}
