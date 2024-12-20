import Link from "next/link";
import Drawer from "./Drawer";
import Search from "./Search";
import UsersHandle from "./UserHandle";
import WatchListLink from "./watchList/WatchListLink";

export default async function Nav() {
  return (
    <nav className="fixed w-full z-50 bg-gradient-to-b from-black/70 to-slate-600/70 backdrop-blur-sm border-b border-transparent">
      {/* Gradient Border */ }
      <div className="absolute inset-x-0 bottom-0 h-[0.6px] bg-gradient-to-r from-rose-500 via-yellow-500 via-green-600 to-sky-600"></div>

      {/* Navigation Container */ }
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-red-600 font-dancingScript font-bold text-lg md:text-4xl">
          MOVIE DB
        </Link>
        
        <div className="hidden  md:flex items-center">
          <div className="ml-8 flex space-x-4">
            <Link href="/compare" className="text-white hover:text-gray-300 font-nunito">
              Compare Movies
            </Link>
            <WatchListLink />
            <UsersHandle />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <Search />
          {/* drawer */ }
          <Drawer />
        </div>
      </div>
    </nav>
  );
}