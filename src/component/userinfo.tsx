"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const Userinfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div className="flex min-w-0 items-center justify-end">
      {user ? (
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/profile"
            className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-base-200"
          >
            <div className="avatar">
              <div className="w-10 overflow-hidden rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100 sm:w-11">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={`${user.name || "User"} avatar`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-base-300 text-lg font-semibold">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </div>
            </div>

            <span className="max-w-24 truncate text-sm font-medium sm:max-w-32">
              {user.name}
            </span>
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="btn btn-error btn-xs sm:btn-sm"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 sm:gap-3">
          <Link
            href="/signin"
            className="rounded-md px-2 py-1.5 text-xs font-medium text-gray-800 transition-colors hover:bg-base-200 hover:text-black sm:px-3 sm:text-sm"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="rounded-md bg-[#b91c1c] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-800 sm:px-4 sm:py-2 sm:text-sm"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default Userinfo;