import NoList from './NoList';
import Template from './Template';

export default async function WatchList() {
    return (
        <div className="container mx-auto pt-24 pb-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-white">Watch Later</h1>
                <p className="text-light/70 mt-2 font-lato">
                    Movies you've saved to watch in the future
                </p>
            </header>
          
            <div id="watchLaterList"
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <Template />
                <Template />
            </div>

            <NoList/>
        </div>
    );
}