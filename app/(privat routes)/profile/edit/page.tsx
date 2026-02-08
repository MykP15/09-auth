"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import css from "./EditProfilePage.module.css";

import { getMe, updateMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function EditProfilePage() {
  const router = useRouter();

  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setError("");

      try {
        if (user) {
          if (cancelled) return;
          setUsername(user.username ?? "");
          setEmail(user.email ?? "");
          setAvatar(user.avatar ?? "");
          return;
        }

        const me = await getMe();
        if (cancelled) return;

        setUser(me);
        setUsername(me.username ?? "");
        setEmail(me.email ?? "");
        setAvatar(me.avatar ?? "");
      } catch (error) {
        if (!cancelled) setError("Failed to load profile.");
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [user, setUser]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const nextUsername = username.trim();

    if (nextUsername.length === 0) {
      setError("Username is required.");
      return;
    }

    try {

      const updated = await updateMe({ username: nextUsername });
      setUser(updated);

      router.push("/profile");
    } catch (error) {
      setError("Failed to update profile.");
    }
  }

  function handleCancel() {
    router.push("/profile");
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={
            avatar ||
            "https://ac.goit.global/fullstack/react/default-avatar.png"
          }
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <p>Email: {email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>

          {error && <p className={css.error}>{error}</p>}
        </form>
      </div>
    </main>
  );
}