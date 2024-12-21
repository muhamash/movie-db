'use client';

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import UsersHandle from "./UserHandle";
import WatchListLink from "./watchList/WatchListLink";

export default function Drawer() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen((prev) => !prev);
    };

    const closeDrawer = () => {
        setIsOpen(false);
    };

    return (
        <div className="relative block md:hidden">
            <button
                onClick={ toggleDrawer }
                className="text-white p-2  focus:outline-none hover:bg-cyan-800 rounded-sm"
            >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Drawer Content */ }
            <div
                onClick={closeDrawer}
                className={ `fixed  top-0 p-5 bg-gray-600 backdrop-blur-md right-0 h-[200px] z-100 transform flex flex-col gap-3 transition-transform duration-300 ease-in-out rounded-sm ${isOpen ? "translate-x-0" : "translate-x-full"
                    }` }
                style={ { width: "75vw" } }
            >
                <button
                    onClick={ toggleDrawer }
                    className="text-white bg-red-700 p-2 self-end focus:outline-none hover:text-gray-300"
                >
                    <FiX size={ 24 } />
                </button>
                <Link href="/compare" className="hover:text-gray-300 font-nunito hover:scale-110 duration-200 transition">
                    Compare Movies
                </Link>
                <WatchListLink />
                <UsersHandle />
            </div>
        </div>
    );
}