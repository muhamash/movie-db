'use server'

import { dbConnect } from '@/service/mongo';
import { revalidateTag } from 'next/cache';

const { updateWhiteList } = require( "@/db/queries" );

export async function addWhiteList ( userId, movieId )
{
    await dbConnect();

    try {
        await updateWhiteList(String(userId), movieId);
    } catch(error) {
        console.error("Error in addWhiteList:", error);
        throw error;
        return {
            message: `error : ${error}`
        }
    }
    revalidateTag('whitelists');
};