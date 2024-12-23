import Image from "next/image";

export default function ModalContent() {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
        >
            <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Search Movie</h2>
                    <button className="text-gray-400 hover:text-white">✕</button>
                </div>
                <input
                    type="text"
                    placeholder="Type movie name..."
                    className="w-full bg-zinc-800 text-white px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <div className="max-h-96 overflow-y-auto">
                    <div
                        className="flex items-center gap-4 p-2 hover:bg-zinc-800 cursor-pointer rounded"
                    >
                        <Image
                            width={ 100 }
                            height={100}
                            src="https://image.tmdb.org/t/p/original/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg"
                            alt="The Social Network"
                            className="w-16 h-24 object-cover rounded"
                        />
                        <div>
                            <h3 className="font-bold">The Social Network</h3>
                            <p className="text-sm text-gray-400">2010</p>
                        </div>
                    </div>

                    <div
                        className="flex items-center gap-4 p-2 hover:bg-zinc-800 cursor-pointer rounded"
                    >
                        <Image
                            width={ 100 }
                            height={100}
                            src="https://image.tmdb.org/t/p/original/hpmbpZqgJosOCvGaKy3uohHxgsw.jpg"
                            alt="7 Days Without Social Networks"
                            className="w-16 h-24 object-cover rounded"
                        />
                        <div>
                            <h3 className="font-bold">7 Days Without Social Networks</h3>
                            <p className="text-sm text-gray-400">2021</p>
                        </div>
                    </div>

                    <div
                        className="flex items-center gap-4 p-2 hover:bg-zinc-800 cursor-pointer rounded"
                    >
                        <Image
                            width={ 100 }
                            height={100}
                            src="https://image.tmdb.org/t/p/original/3SZDJa4F8jag4cBu376zXqrKblC.jpg"
                            alt="City of Desire No. 4 Outrageous and Dirty Social Network Money"
                            className="w-16 h-24 object-cover rounded"
                        />
                        <div>
                            <h3 className="font-bold">
                                City of Desire No. 4 Outrageous and Dirty Social Network Money
                            </h3>
                            <p className="text-sm text-gray-400">2023</p>
                        </div>
                    </div>

                    <div
                        className="flex items-center gap-4 p-2 hover:bg-zinc-800 cursor-pointer rounded"
                    >
                        <Image
                            width={ 100 }
                            height={100}
                            src="https://image.tmdb.org/t/p/original/hUvruxIU05hhR66ELhhgJSe5Ces.jpg"
                            alt="Inside Facebook: Secrets of the Social Network"
                            className="w-16 h-24 object-cover rounded"
                        />
                        <div>
                            <h3 className="font-bold">
                                Inside Facebook: Secrets of the Social Network
                            </h3>
                            <p className="text-sm text-gray-400">2018</p>
                        </div>
                    </div>

                    <div
                        className="flex items-center gap-4 p-2 hover:bg-zinc-800 cursor-pointer rounded"
                    >
                        <Image
                            width={ 100 }
                            height={100}
                            src="https://image.tmdb.org/t/p/original/wsqXtsLIwoXwgFbqRhz4WHBkpTn.jpg"
                            alt="Murder on the Social Network"
                            className="w-16 h-24 object-cover rounded"
                        />
                        <div>
                            <h3 className="font-bold">Murder on the Social Network</h3>
                            <p className="text-sm text-gray-400">N/A</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
