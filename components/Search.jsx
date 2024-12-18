"use client";

import { searchMovies } from "@/utils/actions/SearcMovies";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";

export default function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [errorState, setErrorState] = useState(null); 

    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    const fetchSearchResults = async (query) => {
        try {
            setErrorState(null);
            if (!query.trim()) {
                setSearchResults([]);
                return;
            }

            const formData = new FormData();
            formData.set("search", query);
            const results = await searchMovies(formData);
            setSearchResults(results);
        } catch (error) {
            console.error("Error fetching search results:", error);
            setErrorState("Failed to fetch results. Please try again later.");
        }
    };

    const debouncedFetchSearchResults = useCallback(
        debounce((query) => fetchSearchResults(query), 300),
        []
    );

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        debouncedFetchSearchResults(query);
    };

    return (
        <div className="relative">
            <input
                name="search"
                type="text"
                id="searchInput"
                placeholder="Search movies..."
                className="bg-black bg-opacity-50 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-white"
                value={ searchQuery }
                onChange={ handleInputChange }
            />
            <AnimatePresence mode="wait">
                { searchResults && !errorState && (
                    <motion.div
                        id="searchResults"
                        className="absolute w-full mt-2 bg-slate-800 bg-opacity-90 rounded-lg backdrop-blur-md"
                        initial={ { opacity: 0, y: -10 } }
                        animate={ { opacity: 1, y: 0 } }
                        exit={ { opacity: 0, y: -10 } }
                        transition={ { duration: 0.3, ease: "easeOut" } }
                    >
                        <ul className="max-h-[200px] overflow-y-auto">
                            { searchResults.map( ( movie ) => (
                                <motion.li
                                    key={ movie.id }
                                    className="px-4 py-2 text-yellow-500 font-semibold cursor-pointer hover:shadow-sm hover:bg-yellow-600 hover:text-white"
                                    initial={ { opacity: 0, x: -10 } }
                                    animate={ { opacity: 1, x: 0 } }
                                    exit={ { opacity: 0, x: 10 } }
                                    transition={ { duration: 0.2, ease: "easeOut" } }
                                >
                                    { movie.title }
                                </motion.li>
                            ) ) }
                            {
                                searchQuery && searchResults.length === 0 && (
                                    <motion.li
                                        initial={ { opacity: 0, x: -10 } }
                                        animate={ { opacity: 1, x: 0 } }
                                        exit={ { opacity: 0, x: 10 } }
                                        transition={ { duration: 0.2, ease: "easeOut" } } className="text-yellow-400 text-md p-3 font-bold font-mono">
                                        NO match found
                                    </motion.li>
                                )
                            }
                        </ul>
                    </motion.div>
                ) }
                { errorState && (
                    <motion.div
                        id="errorState"
                        className="absolute w-full mt-2 bg-red-800 bg-opacity-90 text-white px-4 py-2 rounded-lg"
                        initial={ { opacity: 0, y: -10 } }
                        animate={ { opacity: 1, y: 0 } }
                        exit={ { opacity: 0, y: -10 } }
                        transition={ { duration: 0.3, ease: "easeOut" } }
                    >
                        { errorState }
                    </motion.div>
                ) }
            </AnimatePresence>
        </div>
    );
};