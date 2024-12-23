'use client'
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UsersHandle = () => {
    const { auth, setAuth } = useAuth();
    const router = useRouter();

    const logout = () => {
        setAuth(null);
        router.push('/login')
    }

  return (
    <div>
        {
            auth ? (
                <>
                    <span className="mx-2 font-lato">Hello, <span className="font-bold font-dancingScript text-lg text-violet-500 uppercase">{auth?.firstName}</span></span>
                    <span className="mx-1 font-lato text-extrabold">|</span>
                    <a className="cursor-pointer font-lato" onClick={logout}>Logout</a>
                </>
            ) : (<Link className="font-mono font-lato font-bold" href="/login">Login</Link>)
        }
    </div>
  )
}

export default UsersHandle