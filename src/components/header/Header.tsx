// Header.tsx
'use client';
import React from "react";
import { Button } from "../ui/button";
import Navbar from "./Navbar";
import Link from "next/link";
import { useUser } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

type Props = {};

export default function Header({}: Props) {
  const router = useRouter();
  const { user, fetchUserDataLoading , logout} = useUser();
  const logoutFunc = async () => {
    await logout();
    router.push('/login')
  }
  return (
    <>
      <header className="py-4 px-6 flex justify-between items-center bg-slate-900 shadow-md">
        <div className="text-lg font-bold">
          <Link className="text-white" href={"/"}>Self Assessment Portal</Link>
        </div>

        <Navbar />

        <div className="flex gap-2 relative">
          {fetchUserDataLoading ? (
            <p>Loading...</p>
          ) : user?.role === "user" ? (
            <Link href={"/dashboard/profile"}>
              <Button variant={"onDark"}>User Dashboard</Button>
            </Link>
          ) : user?.role === "admin" ? (
            <>
            <Link href={"/dashboard/admin"}>
              <Button variant={"onDark"}>Admin Dashboard</Button>
            </Link>
              
              <Button onClick={logoutFunc} variant={"onDark"}>Logout</Button>
            
            </>
            
          ) : (
            <>
              <Button variant={"onDark"} asChild>
                <Link href={"/sign-up"}>Sign Up Free</Link>
              </Button>
              <Button variant={"onDark"} asChild>
                <Link href={"/login"}>Login</Link>
              </Button>
            </>
          )}
        </div>
      </header>
    </>
  );
}
