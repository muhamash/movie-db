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
        console.log("ObjectId:", objectId);


        const whiteListEntry = await whiteListModel.findOne({ userId: objectId }).lean();
        console.log("WhiteList Entry:", whiteListEntry);

        if (whiteListEntry) {
            if (whiteListEntry.movieIds.includes(movieId)) {

                if (whiteListEntry.movieIds.length === 1) {
                    await whiteListModel.deleteOne({ userId: objectId });
                    return {
                        success: true,
                        message: `MovieId ${movieId} removed, and whitelist entry deleted.`,
                    };
                } else {

                    whiteListEntry.movieIds = whiteListEntry.movieIds.filter((id) => id !== movieId);
                    await whiteListModel.updateOne(
                        { userId: objectId },
                        { movieIds: whiteListEntry.movieIds }
                    );
                    return {
                        success: true,
                        message: `MovieId ${movieId} removed successfully.`,
                        whiteList: whiteListEntry.movieIds,
                    };
                }
            } else {
                whiteListEntry.movieIds.push(movieId);
                await whiteListModel.updateOne(
                    { userId: objectId },
                    { movieIds: whiteListEntry.movieIds }
                );
                return {
                    success: true,
                    message: `MovieId ${movieId} added successfully.`,
                    whiteList: whiteListEntry.movieIds,
                };
            }
        } else {

            await whiteListModel.create({
                userId: objectId,
                movieIds: [movieId],
            });
            return {
                success: true,
                message: `Whitelist created, and movieId ${movieId} added.`,
                whiteList: [movieId],
            };
        }
    } catch (error) {
        console.error("Error updating whitelist:", error);
        return { success: false, message: "Failed to update whitelist." };
    }
}