"use client";

import { registerUser } from "@/utils/actions/formAction";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Registration() {
    const [ formState, setFormState ] = useState( { success: false, error: null } );
    const router = useRouter();
    const [loading, setLoading] = useState(false); 

    const handleSubmit = async ( event ) =>
    {
        event.preventDefault();
        setLoading( true );

        const formData = new FormData( event.target );
        const password = formData.get( "password" );
        const confirmPassword = formData.get( "confirmPassword" );


        if ( password !== confirmPassword )
        {
            setFormState( { success: false, error: "Passwords do not match!" } );
            setLoading( false );
            return;
        }

        try
        {
            const response = await registerUser( formData );

            if ( response.status === 201 )
            {
                setFormState( { success: true, error: null } );
                event.target.reset();
                router.push( "/login" );
            } else
            {
                setFormState( { success: false, error: response.message } );
            }
        } catch ( error )
        {
            setFormState( { success: false, error: error.message } );
            console.error( "Registration error:", error );
        } finally
        {
            setLoading( false );
        }
    };

    return (
        <div className="w-full max-w-md bg-black/70 rounded-lg p-8 shadow-xl">
            <div className="text-center">
                <h1 className="text-white text-3xl font-bold mb-6">Create Your Account</h1>

                <form id="signupForm" className="space-y-4" onSubmit={ handleSubmit }>
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
                        name="confirmPassword"
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

                    { formState.error && (
                        <div className="text-red-500 text-sm">{ formState.error }</div>
                    ) }
                    { formState.success && (
                        <div className="text-green-500 text-sm">
                            Registration successful! Redirecting to login...
                        </div>
                    ) }

                    <button
                        type="submit"
                        className={`w-full font-manrope py-3 rounded duration-200 transition-transform ${
                            loading 
                                ? 'bg-gray-500 cursor-not-allowed' 
                                : 'bg-moviedb-red text-white hover:scale-90 hover:bg-red-700'
                        }`}
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-6 text-moviedb-gray font-manrope">
                    Already have an account?
                    <Link href="/login" className="text-white hover:underline font-manrope px-2">Sign in</Link>
                </div>
            </div>
        </div>
    );
};