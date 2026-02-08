"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import css from "./AuthNavigation.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";

export default function AuthNavigation() {
  const router = useRouter();
  const { user, isAuthenticated, clearIsAuthenticated } = useAuthStore();

  async function handleLogout() {
    await logout();
    clearIsAuthenticated();
    router.push("/sign-in");
  }

  if (!isAuthenticated) {
    return (
      <>
        <li className={css.navigationItem}>
          <Link href="/sign-in" className={css.navigationLink} prefetch={false}>
            Login
          </Link>
        </li>
        <li className={css.navigationItem}>
          <Link href="/sign-up" className={css.navigationLink} prefetch={false}>
            Sign up
          </Link>
        </li>
      </>
    );
  }

  return (
    <>
      <li className={css.navigationItem}>
        <Link href="/profile" className={css.navigationLink} prefetch={false}>
          Profile
        </Link>
      </li>

      <li className={css.navigationItem}>
        <p className={css.userEmail}>{user?.username}</p>
        <button className={css.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </li>
    </>
  );
}