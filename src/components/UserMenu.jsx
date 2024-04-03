"use client";
import Link from "next/link";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { IconMenu2, IconPower, IconUser, IconDashboard } from "@tabler/icons-react";
import Spinner from "./Spinner";

// import { useSessionStore } from "@/app/store";

const UserMenu = () => {
  // const setSession = useSessionStore((state) => state.setUserSession);
  // const userSession = useSessionStore((state) => state.userSession);
  const { data: session, status } = useSession();
  const defaultImage = "/assets/defaultprofile.jpg";
  const [userImage, setUserImage] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    if (session) {
      document.addEventListener("mousedown", handler);
    }

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  // useEffect(() => {
  //   if (session && userSession !== session.user) {
  //     setSession(session.user);
  //     console.log("session update");
  //   }
  // }, [session]);

  

  useEffect(() => {
    const fetchUserImage = async () => {
      if (session && session.user) {
        try {
          const response = await axios.get(`/api/users/${session.user.id}`);
          setUserImage(response.data.image);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserImage(); 
  }, [session, isMenuOpen]);

  return (
    <div className="relative flex pl-5 pb-1 pt-1 z-10 gap-4">
      {status === "loading" && <Spinner />}
      {status === "authenticated" && (
        <div className="menu-container" ref={menuRef}>
          <div
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="menu-trigger"
          >
            <img
              src={userImage}
              height={36}
              width={36}
              className="rounded-full"
            />
            <IconMenu2 size={28} />
          </div>

          <div
            className={`flex flex-col dropdown-menu shadow-sm z-50 ${
              isMenuOpen ? "active" : "inactive"
            }`}
          >
            <ul className="flex flex-col">
              <li onClick={() => setIsMenuOpen(false)}>
                <Link className="dropdown-item" href={"/account"}>
                  <IconUser /> <p>Account</p>
                </Link>
              </li>
              {session.user?.role === "admin" && (
                <li onClick={() => setIsMenuOpen(false)}>
                  <a className="dropdown-item" href={"/dashboard"}>
                    <IconDashboard /> <p>Dashboard</p>
                  </a>
                </li>
              )}
              <li onClick={() => setIsMenuOpen(false)}>
                <button
                  className="dropdown-item"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <IconPower /> <p>Log out</p>
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
      {status === "unauthenticated" && (
        <div className="flex items-center gap-3">
          <Link
            href="/auth/signup"
            className="px-6 py-2 rounded-[10px] border-2 font-semibold text-base min-w-[125px]   text-[var(--color-text-secondary)] transition-colors border-[var(--color-accent)]  bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)]  text-center"
          >
            Sign up
          </Link>
          <Link
            href="/auth/login"
            className="px-6 py-2 rounded-[10px] border-2 font-semibold text-base min-w-[125px] transition-colors border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-border-hover)]  text-center"
          >
            Log In
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
