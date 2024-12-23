"use server";

export async function searchMovies(formData) {
    try {
        const query = formData.get("search")?.trim();
        if (!query) return []; 

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search?query=${query}`);
        
        if (!res.ok) {
            console.warn(`Error fetching data: ${res.statusText}`);
            return [];
        }

        const searchMovies = await res.json();

        if (!searchMovies?.success || !searchMovies?.data?.length) {
            return [];
        }

        return searchMovies.data;
    } catch (error) {
        console.error("Server error:", error);
        return []; 
    }
}