import HandleWhiteListClient from "@/components/movieDetails/HandleWhiteListClient";

export default async function HandleWhiteList({ id, userId }) {
    if (!userId) {
        return null;
    }

    const response = await fetch(`/api/whiteList?userId=${userId}`, {
        cache: "no-store",
    });

    const data = await response.json();
    const isInterested = data?.success && data?.data?.includes(id);

    return (<HandleWhiteListClient id={id} initialInterested={isInterested} />);
}