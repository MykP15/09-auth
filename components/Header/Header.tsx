import Link from "next/link";
import css from "./Header.module.css";
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";

export default function Header() {

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

         <li>
            <Link href="/notes/filter/all">Notes</Link>
          </li>

          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}