
export default function NoList() {
    return (
        <div id="emptyState" className="text-center py-16">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 mx-auto text-moviedb-gray mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
            </svg>
            <h2 className="text-2xl font-bold text-light mb-2 font-manrope">
                Your Watch Later list is empty
            </h2>
            <p className="text-light/70 mb-6 mont-nunito font-nunito">
                Explore movies and add them to your list to watch later
            </p>
            <a
                href="#"
                className="bg-primary text-dark px-6 py-2 rounded-full hover:bg-primary/80 transition font-lato"
            >
                Explore Movies
            </a>
        </div>
    );
}
