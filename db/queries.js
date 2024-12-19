import { replaceMongoIdInObject } from "@/utils/mongoUsers";
import mongoose from "mongoose";
import { userModel } from "./usersModel";
import { whiteListModel } from "./whiteListModel";

export async function createUser(user) {
    return await userModel.create(user);
}

export async function findUserByCredentials(credentials) {
    const user = await userModel.findOne(credentials).lean();
    if (user) {
        return replaceMongoIdInObject(user);
    }
    return null;
}

export async function updateWhiteList(userId, movieId) {
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("Invalid userId");
        }

        const objectId = new mongoose.Types.ObjectId(userId);

        // Fetch twhitelist entry
        const whiteListEntry = await whiteListModel.findOne({ userId: objectId });

        if (whiteListEntry) {
            // Check  the movieId -> in the movieIds array
            const movieIndex = whiteListEntry.movieIds.indexOf(movieId);

            if (movieIndex > -1) {
                // If movieId exists then remove it
                whiteListEntry.movieIds.splice(movieIndex, 1);
            } else {
                // If movieId doesn't exist then add it
                whiteListEntry.movieIds.push(movieId);
            }

            await whiteListEntry.save();
        } else {
            // If no whitelist exists  then create one with the movieId
            await whiteListModel.create({
                userId: objectId,
                movieIds: [movieId],
            });
        }

        return {
            success: true,
            message: whiteListEntry
                ? `Whitelist updated successfully.`
                : `Whitelist created, and movieId ${movieId} added.`,
            whiteList: whiteListEntry ? whiteListEntry.movieIds : [movieId],
        };
    } catch (error) {
        console.error("Error updating whitelist:", error);
        return { success: false, message: "Failed to update whitelist." };
    }
}