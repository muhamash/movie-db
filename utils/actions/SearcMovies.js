"use server";

export async function searchMovies(formData) {
    try {
        const query = formData.get("search")?.trim();
        if (!query) return []; // Return empty array if query is empty

        const res = await fetch(`http://localhost:3000/api/search?query=${query}`);
        
        // Handle fetch response
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