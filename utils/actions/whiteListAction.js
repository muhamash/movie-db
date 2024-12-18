'use server'

import { revalidateTag } from 'next/cache';
const { updateWhiteList } = require( "@/db/queries" );

export async function addWhiteList(userId, movieId) {
    try {
        await updateWhiteList(userId, movieId);
    } catch(error) {
        throw error;
    }
    revalidateTag('whitelist');
};