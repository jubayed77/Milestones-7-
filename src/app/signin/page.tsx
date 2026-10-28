"use client"
import { authClient } from '@/lib/auth-client';
import React from 'react';
import toast from 'react-hot-toast';

const SignInPage = () => {
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const user = Object.fromEntries(formData.entries()) as { email: string, password: string }


        const { data, error } = await authClient.signIn.email({
            ...user,
            callbackURL: "/"
        })

        if (data) {
            toast.success("sign in successfull");
        }
        if (error) {
            toast.error("some problem here please solve it");
        }

    }
    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });


    }

    const handleGithubSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "github",

        })
    }


    return (
        <div className='mt-7'>
            <form onSubmit={onSubmit}>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <h2 className='text-center font-bold text-3xl text-red-700'>Sign In</h2>




                    <label className="label">Email</label>
                    <input name='email' type="email" className="input" placeholder="Email" />

                    <label className="label">Password</label>
                    <input name='password' type="password" className="input" placeholder="Password" />

                    <button type='submit' className="btn bg-red-700 mt-4 text-white">SignIn</button>

                </fieldset>

            </form>

            <div className='flex items-center justify-center gap-2 p-2'>

                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className=" mt-3 btn btn-success"
                >
                    Sign in with Google
                </button>
            </div>
            <div className='flex items-center justify-center gap-2 p-2'>

                <button
                    type="button"
                    onClick={handleGithubSignIn}
                    className=" mt-3 btn btn-success"
                >
                    Sign in with Github
                </button>
            </div>

        </div>
    );
};

export default SignInPage;