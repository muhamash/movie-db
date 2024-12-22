'use client'

import { searchMovies } from "@/utils/actions/SearcMovies";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useReducer } from "react";
import Resutl from "./Resutl";

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
        case "CLEAR_QUERY": 
            return { ...state, query: "", results: [], isLoading: false, error: null };
        default:
            return state;
    }
};

export default function SearchModal({ onClose, modalId, onUpdateSlot }) {
    const initialState = {
        query: "",
        results: [],
        isLoading: false,
        error: null,
    };

    const [state, dispatch] = useReducer(searchReducer, initialState);
    const { query, results, isLoading, error } = state;

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
        debounce((query) => fetchSearchResults(query), 500),
        []
    );

    const handleInputChange = (e) => {
        const query = e.target.value;
        dispatch({ type: "SET_QUERY", payload: query });
        debouncedFetchSearchResults(query);
    };

    const handleModalLink = (id, movie) => {
        onUpdateSlot(id, movie);
        onClose();
    };

    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <motion.div
                className="bg-zinc-900 p-6 rounded-lg w-full max-w-2xl"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Search Movie</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
                </div>
                <input
                    type="text"
                    placeholder="Type movie name..."
                    className="w-full bg-zinc-800 text-white px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
                    value={query}
                    onChange={handleInputChange}
                />
                
                <AnimatePresence>
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

                    {results && !error && !isLoading && query && (
                        <motion.div
                            className="max-h-96 overflow-y-auto mt-2 bg-slate-800 bg-opacity-90 rounded-lg"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <ul className="max-h-[400px]  overflow-y-auto">
                                {results.map((movie) => (
                                    <div onClick={() => handleModalLink(modalId, movie)} key={movie.id}>
                                        <Resutl data={movie} />
                                    </div>
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
                        </motion.div>
                    )}

                    {/* Error State */}
                    {error && (
                        <motion.div
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
            </motion.div>
        </motion.div>
    );
}