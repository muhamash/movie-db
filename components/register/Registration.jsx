import { registerUser } from "@/utils/actions/formAction";
import Link from "next/link";

export default async function Registration() {
    return (
        <div className="w-full max-w-md bg-black/70 rounded-lg p-8 shadow-xl">
            <div className="text-center">
                <h1 className="text-white text-3xl font-bold mb-6">Create Your Account</h1>

                <form  id="signupForm" className="space-y-4" action={registerUser}>
                    <input
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        className="w-full font-nunito p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
                        required
                    />
                    <input
                        name="secondName"
                        type="text"
                        placeholder="Last Name"
                        className="w-full p-3 font-nunito bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
                        required
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        className="w-full p-3 font-nunito bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Create Password"
                        className="w-full font-nunito p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full font-nunito p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
                        required
                    />

                    <div className="text-left text-moviedb-gray text-sm">
                        <label className="flex items-center text-slate-400 font-lato">
                            <input type="checkbox" className="mr-2" required />
                            I agree to the Terms of Service and Privacy Policy
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full hover:scale-90  font-manrope bg-moviedb-red text-white py-3 rounded hover:bg-red-700 duration-200 transition-transform"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="mt-6 text-moviedb-gray font-manrope">
                    Already have an account?
                    <Link href="#" className="text-white hover:underline font-manrope px-2">Sign in</Link>
                </div>
            </div>
        </div>
    );
}
