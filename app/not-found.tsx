import css from "@/app/Home.module.css"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoteHub - Not Found",
  description: "Not Found page.",
  openGraph: {
    title: "Not Found - NoteHub",
    description: "Page is not found",
    url: "https://notehub.com/not-found",
    images: [{
      url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      width: 1200,
      height: 630,
      alt: "NoteHub",
    }]
  }
} ;



function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}

export default NotFound;
