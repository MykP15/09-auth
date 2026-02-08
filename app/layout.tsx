import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import Footer from "@/components/Footer/Footer"
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});


export const metadata: Metadata = {
  title: "NoteHub",
  description: "A convenient website for managing your notes, organizing ideas, and keeping everything in one place.",
  openGraph: {
    title: "NoteHub",
    description: "A convenient website for managing your notes, organizing ideas, and keeping everything in one place.",
    url: "https://notehub.com",
    images: [{
      url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      width: 1200,
      height: 630,
      alt: "NoteHub",
    }]
  }
};

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${roboto.variable}`}>
        <TanStackProvider>
        <Header />
          <div>{children}
            {modal}
          </div>
          <Footer />
          <div id="modal-root" />
        </TanStackProvider>
      </body>
    </html>
  );
}
