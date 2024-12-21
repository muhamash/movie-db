import { replaceMongoIdInObject } from "@/utils/mongoUsers";
import mongoose from "mongoose";
import { userModel } from "./usersModel";
import { whiteListModel } from "./whiteListModel";
import { dbConnect } from "@/service/mongo";

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

export async function updateWhiteList ( userId, movieId )
{
    await dbConnect();

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("Invalid userId");
        }

        const objectId = new mongoose.Types.ObjectId(userId);

        const whiteListEntry = await whiteListModel.findOne({ userId: objectId });

        if (whiteListEntry) {
            const movieIndex = whiteListEntry.movieIds.indexOf(movieId);

            if (movieIndex > -1) {
                whiteListEntry.movieIds.splice(movieIndex, 1);
            } else {
                whiteListEntry.movieIds.push(movieId);
            }

            await whiteListEntry.save();
        } else {
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