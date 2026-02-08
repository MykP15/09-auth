"use client"

import Link from "next/link";
import css from "./Header.module.css";
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";
import { useAuthStore } from "@/lib/store/authStore";

export default function Header() {

    const { isAuthenticated } = useAuthStore()
  
  return (
    <header className={css.header}>
      <Link href="/">
        NoteHub
      </Link>

      <nav className={css.navigation}>
        <ul className={css.navigation}>
          <li className={css.li}>
            <Link href="/" className={css.navigation}>Home</Link>
          </li>

          {isAuthenticated ? <li>
            <Link href="/notes/filter/all">Notes</Link>
          </li> : <li>
            <Link href="/sign-in">Notes</Link>
          </li>}

          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}