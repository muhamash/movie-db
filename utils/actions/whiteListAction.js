'use server'

import { dbConnect } from '@/service/mongo';

const { updateWhiteList } = require( "@/db/queries" );

export async function addWhiteList(userId, movieId) {
    await dbConnect();

    try {
        const result = await updateWhiteList( String( userId ), movieId );
        console.log(result)
        return result;

    } catch (error) {
        console.error("Error in addWhiteList:", error.message);
        throw error;
    }
};