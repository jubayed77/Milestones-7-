'use client'
import { authClient } from '@/lib/auth-client';
import { router } from 'better-auth/api';
import { redirect } from 'next/navigation';
import { Router } from 'next/router';
import React from 'react';

const SignUpPage = () => {

    const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const user = Object.fromEntries(formData.entries()) as { name: string, email: string, password: string, image: string }

        const { data, error } = await authClient.signUp.email({
            ...user,

        })

        if (data) {
            console.log(data)
            redirect("/")
        }

        if (error) {
            console.log(error);
        }




        console.log(user)


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
            <form onSubmit={onSubmit} >
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <h2 className='text-center font-bold text-3xl text-red-700'>Sign up</h2>


                    <label className="name">Name</label>
                    <input name='name' type="text" className="input" placeholder="Your name" />



                    <label className="Image">Image</label>
                    <input name='image' type="url" className="input" placeholder="Your Image" />



                    <label className="label">Email</label>
                    <input name='email' type="email" className="input" placeholder="Email" />

                    <label className="label">Password</label>
                    <input name='password' type="password" className="input" placeholder="Password" />

                    <button type='submit' className="btn bg-red-700 mt-4 text-white">SignUp</button>
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

export default SignUpPage;