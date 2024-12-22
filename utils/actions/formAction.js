"use server";

import { createUser, findUserByCredentials } from "@/db/queries";
import { dbConnect } from "@/service/mongo";

export async function registerUser(formData) {
    try {
        await dbConnect();

        const credential = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        const existingUser = await findUserByCredentials({ email: credential.email });
        if (existingUser) {
            return {
                message: "User with this email already exists.",
                status: 400,
            };
        }

        const user = Object.fromEntries(formData.entries());
        await createUser(user);

        return {
            message: "User registered successfully!",
            status: 201,
        };
    } catch (error) {
        console.error("Error during user registration:", error);
        return {
            message: "An unexpected error occurred. Please try again later.",
            status: 500,
        };
    }
};

export async function performLogin ( formData )
{
    await dbConnect();

    try {
        const credential = {};
        credential.email = formData.get("email");
        credential.password = formData.get("password");
        const found = await findUserByCredentials(credential);
        return found;

    } catch (error) {
        throw error;
        return {
            message: "An unexpected error occurred. Please try again later.",
            status: 500,
        };
    }
};