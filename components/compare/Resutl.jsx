import { formatDate } from "@/utils/utils";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Resutl({data}) {
    return (
        <motion.li
            initial={ { opacity: 0, x: -10 } }
            animate={ { opacity: 1, x: 0 } }
            exit={ { opacity: 0, x: 10 } }
            transition={ { duration: 0.2, ease: "easeOut" } }
            className="flex gap-4 hover:bg-zinc-800 cursor-pointer rounded m-2 items-center font-nunito"
        >
            <Image
                src={ `https://image.tmdb.org/t/p/original${data?.poster_path}` }
                alt="City of Desire No. 4 Outrageous and Dirty Social Network Money"
                height={ 100 }
                width={ 100 }
                className="w-16 h-24 object-cover rounded"
            />
            <div className="t">
                <h3 className="font-bold text-left text-[15px]">
                    { data?.title }
                </h3>
                <p className="text-[12px] text-gray-400 text-left">{ formatDate( data?.release_date ) || "date not found" }</p>
            </div>
        </motion.li>
    );
}
