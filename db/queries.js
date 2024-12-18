import { replaceMongoIdInObject } from "@/utils/mongoUsers";
import { userModel } from "./usersModel";

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