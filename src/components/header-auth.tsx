"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "@/server";

export default function HeaderAuth() {
  const session = useSession();
  if (session.status === "loading") {
    return <div className="spinner-circle"></div>;
  } else if (session.data?.user) {
    return (
      <div className="avatar avatar-ring avatar-md">
        <div className="dropdown-container">
          <div className="dropdown">
            <label
              className="btn btn-ghost flex cursor-pointer px-0"
              tabIndex={0}
            >
              <Image
                height={40}
                width={40}
                alt={session.data.user.name!}
                src={session.data.user.image!}
              />
            </label>
            <div className="dropdown-menu dropdown-menu-bottom-left w-32">
              <form action={signOut}>
                <button className="btn btn-solid-error w-full">Sign Out</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <form action={signIn}>
        <button className="btn btn-solid-primary">Sign In</button>
      </form>
    );
  }
}
