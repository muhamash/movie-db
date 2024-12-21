'use server'

import { revalidateTag } from 'next/cache';

const { updateWhiteList } = require( "@/db/queries" );

export async function addWhiteList(userId, movieId) {
    try {
        await updateWhiteList(String(userId), movieId);
    } catch(error) {
        console.error("Error in addWhiteList:", error);
        throw error;
    }
    revalidateTag('whitelists');
};