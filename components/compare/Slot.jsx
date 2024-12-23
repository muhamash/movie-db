'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import MovieForm from './MovieForm';
import RemoveMovie from './RemoveMovie';
import SearchModal from './SearchModal';

export default function Slot({ id, movie, onUpdateSlot, slots }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        if (!movie?.id) return;

        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/movies?id=${movie.id}`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch movie details');
                }
                const data = await response.json();
                setMovieDetails(data.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [movie?.id]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="bg-zinc-900 font-lato rounded-lg p-4 flex flex-col min-h-[400px]">
            <RemoveMovie id={id} slots={slots} />

            {movieDetails ? (
                <MovieForm movie={movieDetails} />
            ) : (
                <div className="flex-grow flex flex-col items-center justify-center">
                    <button
                        className="bg-zinc-800 text-white px-6 py-3 rounded hover:bg-zinc-700 transition-colors cursor-pointer"
                        onClick={openModal}
                    >
                        Select Movie
                    </button>
                </div>
            )}

            <AnimatePresence mode="wait">
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="bg-white p-6 rounded-lg w-1/3"
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <SearchModal
                                modalId={id}
                                onClose={closeModal}
                                onUpdateSlot={onUpdateSlot}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}