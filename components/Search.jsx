"use client";

import { searchMovies } from "@/utils/actions/SearcMovies";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useReducer } from "react";

// Reducer function to handle different actions
const searchReducer = (state, action) => {
    switch (action.type) {
        case "START_SEARCH":
            return { ...state, isLoading: true, error: null, results: [] };
        case "SEARCH_SUCCESS":
            return { ...state, isLoading: false, results: action.payload };
        case "SEARCH_ERROR":
            return { ...state, isLoading: false, error: action.payload };
        case "SET_QUERY":
            return { ...state, query: action.payload };
        case "TOGGLE_DROPDOWN":
            return { ...state, isDropdownVisible: action.payload };
        case "CLEAR_QUERY": // New action to clear the query and hide the dropdown
            return { ...state, query: "", isDropdownVisible: false };
        default:
            return state;
    }
};

export default function Search() {
    const router = useRouter();
    const initialState = {
        query: "",
        results: [],
        isLoading: false,
        error: null,
        isDropdownVisible: false,
    };

    const [state, dispatch] = useReducer(searchReducer, initialState);
    const { query, results, isLoading, error, isDropdownVisible } = state;

    // Debounce function to delay the execution of fetchSearchResults
    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    const fetchSearchResults = async (query) => {
        try {
            dispatch({ type: "START_SEARCH" });
            if (!query.trim()) {
                dispatch({ type: "SEARCH_SUCCESS", payload: [] });
                return;
            }

            const formData = new FormData();
            formData.set("search", query);
            const results = await searchMovies(formData);
            dispatch({ type: "SEARCH_SUCCESS", payload: results });
        } catch (error) {
            console.error("Error fetching search results:", error);
            dispatch({ type: "SEARCH_ERROR", payload: "Failed to fetch results. Please try again later." });
        }
    };

    const debouncedFetchSearchResults = useCallback(
        debounce((query) => fetchSearchResults(query), 300),
        []
    );

    const handleInputChange = (e) => {
        const query = e.target.value;
        dispatch({ type: "SET_QUERY", payload: query });
        debouncedFetchSearchResults(query);
        dispatch({ type: "TOGGLE_DROPDOWN", payload: true });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && query.trim()) {
            router.push(`/searchResults?query=${encodeURIComponent(query.trim())}`);
            dispatch({ type: "CLEAR_QUERY" }); // Clear the query after pressing Enter
        }
    };

    const handleSeeAllResults = () => {
        if (query.trim()) {
            router.push(`/searchResults?query=${encodeURIComponent(query.trim())}`);
            dispatch({ type: "CLEAR_QUERY" }); // Clear the query after clicking "See All Results"
        }
    };

    const handleResultClick = (movieId) => {
        router.push(`/movie/${movieId}`);
        dispatch({ type: "CLEAR_QUERY" }); // Clear the query after clicking a search result
    };

    return (
        <div className="relative">
            <input
                name="search"
                type="text"
                id="searchInput"
                placeholder="Search movies..."
                className="bg-black bg-opacity-50 font-manrope text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-white"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <AnimatePresence mode="wait">
                {/* Loading Indicator */}
                {isLoading && (
                    <motion.div
                        className="absolute top-full right-4 left-4 mt-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                        <span className="searchLoader"></span>
                    </motion.div>
                )}

                {/* Search Results */}
                {results && !error && !isLoading && isDropdownVisible && (
                    <motion.div
                        id="searchResults"
                        className="absolute w-full mt-2 bg-slate-800 bg-opacity-90 rounded-lg backdrop-blur-md"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <ul className="max-h-[200px] overflow-y-auto">
                            {results.map((movie) => (
                                <motion.li
                                    onClick={() => handleResultClick(movie.id)}
                                    key={movie.id}
                                    className="px-4 py-2 text-yellow-500 font-semibold cursor-pointer hover:shadow-sm hover:bg-yellow-600 hover:text-white font-nunito text-sm font-normal"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                >
                                    {movie.title}
                                </motion.li>
                            ))}
                            {query && results.length === 0 && (
                                <motion.li
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="text-yellow-400 text-md p-3 font-bold font-mono"
                                >
                                    No match found
                                </motion.li>
                            )}
                        </ul>
                        {results.length > 0 && (
                            <button
                                onClick={handleSeeAllResults}
                                className="text-yellow-500 font-semibold px-4 py-2 w-full text-center border-t border-gray-800 hover:bg-yellow-600 hover:text-white font-manrope"
                            >
                                See All Results
                            </button>
                        )}
                    </motion.div>
                )}

                {/* Error State */}
                {error && (
                    <motion.div
                        id="errorState"
                        className="absolute w-full mt-2 bg-red-800 bg-opacity-90 text-white px-4 py-2 rounded-lg"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}