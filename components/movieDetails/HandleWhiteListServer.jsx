import HandleWhiteListClient from "./HandleWhiteListClient";

export default async function HandleWhiteListServer({ userId, movieId }) {

    let data = null;
    let isInterested = false;

    if (userId !== "notLoggedIn" && movieId) {
        try {
            const response = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/whiteList?userId=${userId}`, {
                cache: "no-store",
            } );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            data = await response.json();
            console.log( data );
            if (data?.success && data?.data?.some(movie => movie === movieId)) {
                isInterested = true;
                console.log(isInterested)
            }
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    // const isInterested = data?.success && data?.data?.includes(movieId);

    return (
        <>
            <HandleWhiteListClient
                id={movieId}
                userId={userId}
                initialInterested={isInterested ?? false}
            />
        </>
    );
}