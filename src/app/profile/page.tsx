"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleUpdateProfile = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const name = String(formData.get("name") ?? "").trim();
        const image = String(formData.get("image") ?? "").trim();

        if (!name) {
            toast.error("Name is required");
            return;
        }

        setLoading(true);

        try {
            const { error } = await authClient.updateUser({
                name,
                ...(image ? { image } : {}),
            });

            if (error) {
                toast.error(error.message || "Profile update failed");
                return;
            }

            toast.success("Profile updated successfully!");
            setShow(false);
        } catch (error) {
            console.error("Profile update error:", error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center px-4">
                <div className="rounded-2xl border border-base-300 bg-base-100 p-8 text-center shadow-lg">
                    <h2 className="text-xl font-bold">Profile</h2>
                    <p className="mt-2 text-sm text-base-content/70">
                        Please sign in to view your profile.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-[80vh] bg-base-200 px-4 py-10 sm:py-16">
            <div className="mx-auto max-w-2xl">
                <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-xl">
                    <div className="h-32 bg-gradient-to-r from-red-800 via-red-600 to-orange-500 sm:h-40" />

                    <div className="px-5 pb-8 sm:px-10">
                        <div className="-mt-14 flex flex-col items-center text-center sm:-mt-16">
                            <div className="avatar">
                                <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-base-100 bg-base-300 shadow-md sm:h-32 sm:w-32">
                                    {user.image ? (
                                        <Image
                                            src={user.image}
                                            alt={`${user.name || "User"} avatar`}
                                            fill
                                            sizes="128px"
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-base-content">
                                            {user.name?.charAt(0).toUpperCase() || "U"}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <h1 className="mt-4 break-words text-2xl font-bold sm:text-3xl">
                                {user.name || "User"}
                            </h1>

                            <p className="mt-1 break-all text-sm text-base-content/60">
                                {user.email}
                            </p>

                            <div className="mt-6 w-full max-w-md border-t border-base-300 pt-5">
                                <div className="flex items-center justify-between gap-3 rounded-xl bg-base-200 p-4 text-left">
                                    <div className="min-w-0">
                                        <p className="text-xs text-base-content/60">
                                            Full Name
                                        </p>
                                        <p className="mt-1 break-words font-medium">
                                            {user.name || "Not provided"}
                                        </p>
                                    </div>

                                    <span className="badge badge-success badge-outline">
                                        Active
                                    </span>
                                </div>

                                <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-base-200 p-4 text-left">
                                    <div className="min-w-0">
                                        <p className="text-xs text-base-content/60">
                                            Email Address
                                        </p>
                                        <p className="mt-1 break-all text-sm font-medium">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setShow(!show)}
                                    className="btn mt-6 w-full border-0 bg-red-700 text-white hover:bg-red-800"
                                >
                                    {show ? "Cancel Editing" : "Edit Profile"}
                                </button>
                            </div>
                        </div>

                        {show && (
                            <form
                                onSubmit={handleUpdateProfile}
                                className="mx-auto mt-8 max-w-md rounded-2xl border border-base-300 bg-base-200 p-5 sm:p-6"
                            >
                                <h2 className="text-center text-xl font-bold">
                                    Update Profile
                                </h2>

                                <p className="mt-1 text-center text-sm text-base-content/60">
                                    Change your name and profile picture .
                                </p>

                                <div className="mt-6">
                                    <label htmlFor="name" className="label mb-1">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        defaultValue={user.name || ""}
                                        placeholder="Enter your name"
                                        className="input input-bordered w-full bg-base-100"
                                        required
                                    />
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="image" className="label mb-1">
                                        Profile Image URL
                                    </label>
                                    <input
                                        id="image"
                                        name="image"
                                        type="url"
                                        defaultValue={user.image || ""}
                                        placeholder="Image Url"
                                        className="input input-bordered w-full bg-base-100"
                                    />
                                    <p className="mt-2 text-xs text-base-content/60">
                                        Leave the image URL empty if you want to keep your
                                        current picture.
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn mt-6 w-full border-0 bg-red-700 text-white hover:bg-red-800"
                                >
                                    {loading ? (
                                        <>
                                            <span className="loading loading-spinner loading-sm" />
                                            Updating...
                                        </>
                                    ) : (
                                        "Save Changes"
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;