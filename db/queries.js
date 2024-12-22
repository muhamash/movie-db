import { dbConnect } from "@/service/mongo";
import { replaceMongoIdInObject } from "@/utils/mongoUsers";
import mongoose from "mongoose";
import { userModel } from "./usersModel";
import { whiteListModel } from "./whiteListModel";

export async function createUser ( user )
{
    await dbConnect();
    return await userModel.create(user);
}

export async function findUserByCredentials ( credentials )
{
    await dbConnect();
    
    const user = await userModel.findOne(credentials).lean();
    if (user) {
        return replaceMongoIdInObject(user);
    }
    return null;
}

export async function updateWhiteList(userId, movieId) {
    await dbConnect();

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("Invalid userId");
        }

        const objectId = new mongoose.Types.ObjectId(userId);
        const whiteListEntry = await whiteListModel.findOne({ userId: objectId });

        let action;
        if (whiteListEntry) {
            const movieIndex = whiteListEntry.movieIds.indexOf(movieId);

            if (movieIndex > -1) {
                whiteListEntry.movieIds.splice(movieIndex, 1);
                action = "removed";
            } else {
                whiteListEntry.movieIds.push(movieId);
                action = "added";
            }

            await whiteListEntry.save();
            return {
                success: true,
                action,
                message: `Whitelist ${action} successfully.`,
                status: 200,
            };
        } else {
            await whiteListModel.create({
                userId: objectId,
                movieIds: [movieId],
            });
            return {
                success: true,
                action: "added",
                message: `Whitelist added successfully.`,
                status: 201,
            };
        }
    }
    catch ( error )
    {
        console.error("Error updating whitelist:", error);
        return { success: false, message: "Failed to update whitelist." };
    }
}