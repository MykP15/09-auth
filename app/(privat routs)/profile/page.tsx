import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import css from "./ProfilePage.module.css";

import { getMeServer } from "@/lib/api/serverApi";

export const metadata: Metadata = {
  title: "Profile - NoteHub",
  description: "Your profile page.",
  openGraph: {
    title: "Profile - NoteHub",
    description: "Your NoteHub profile page.",
    url: "http://localhost:3000/profile",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};

export default async function ProfilePage() {
  const user = await getMeServer();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link
            href="/profile/edit"
            className={css.editProfileButton}
            prefetch={false}
          >
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}