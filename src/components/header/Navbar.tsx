import Link from "next/link";
import React from "react";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav>
      <ul className="flex gap-8 text-white">
        <Link href={"/"}>
          <li>Home</li>
        </Link>
        <Link href={"/#about"}>
          <li>About</li>
        </Link>
        <Link href={"/pricing"}>
          <li>Pricing</li>
        </Link>
        <Link href={"/"}>
          <li>Resources</li>
        </Link>
        <Link href={"/create"}>
          <li>Generate Exam</li>
        </Link>
      </ul>
    </nav>
  );
}
