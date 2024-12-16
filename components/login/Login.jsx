export default async function Login() {
    return (
        <div className="w-full max-w-md bg-black/70 rounded-lg p-8 shadow-xl">
            <div className="text-center mb-6">
                <h1 className="text-white text-3xl font-bold mb-4">Sign In</h1>

                <form id="loginForm" className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email or phone number"
                        className="w-full font-nunito p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full font-nunito p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full hover:scale-90  font-manrope bg-moviedb-red text-white py-3 rounded hover:bg-red-700 duration-200 transition-transform"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-4 flex justify-between text-moviedb-gray text-sm">
                    <label className="flex items-center font-manrope text-slate-400">
                        <input className="" type="checkbox" className="mr-2" />
                        Remember me
                    </label>
                    <a href="#" className="hover:underline text-slate-400 font-manrope">Need help?</a>
                </div>

                <div className="mt-6 font-manrope text-moviedb-gray">
                    New to moviedb?
                    <a href="#" className="text-white hover:underline font-manrope px-2">Sign up now</a>
                </div>
            </div>
        </div>
    );
}
