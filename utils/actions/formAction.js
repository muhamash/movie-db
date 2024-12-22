"use server";

import { createUser, findUserByCredentials } from "@/db/queries";
import { dbConnect } from "@/service/mongo";

export async function registerUser(formData) {
    try {
        await dbConnect();

        const credential = {};
        credential.email = formData.get("email");
        credential.password = formData.get( "password" );
        credential.confirmPassword = formData.get("confirmPassword")
        
        if (credential.password !== credential.confirmPassword) {
            return {
                message: "Passwords do not match",
                status: 400,
            };
        }

        const user = Object.fromEntries( formData.entries() );
        const found = await findUserByCredentials(credential);
        
        if ( credential.password === credential.confirmPassword && !found )
        {
            await createUser(user);
        }

        if (found) {
            return {
                message: "Failed to create user. Duplicate user detected!!!",
                status: 500,
            };
        }
        
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