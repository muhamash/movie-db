import { replaceMongoIdInObject } from "@/utils/mongoUsers";
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
        const whiteListEntry = await whiteListModel.findOne({ userId });

        if (whiteListEntry) {
       
            if (whiteListEntry.movieIds.includes(movieId)) {
                whiteListEntry.movieIds = whiteListEntry.movieIds.filter(
                    (id) => id !== movieId
                );
            } else {
                whiteListEntry.movieIds.push(movieId);
            }

            await whiteListEntry.save();
        } else {
            await whiteListModel.create({
                userId,
                movieIds: [movieId],
            });
        }

        return {
            success: true,
            message: "Whitelist updated successfully.",
            whiteList: whiteListEntry ? whiteListEntry.movieIds : [ movieId ],
        };
    } catch (error) {
        console.error("Error updating whitelist:", error);
        return { success: false, message: "Failed to update whitelist." };
    }
};