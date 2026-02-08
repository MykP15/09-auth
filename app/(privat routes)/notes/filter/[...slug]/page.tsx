import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

import NotesClient from "./Notes.client";
import { fetchNotesServer } from "@/lib/api/serverApi";

import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `Notes: ${slug[0]}` ,
    description: `Notes by category ${slug[0]}`,
    openGraph: {
      title: `Notes: ${slug[0]}`,
      description: `Notes by category ${slug[0]}`,
      url: `https://notehub.com/notes/filter/${slug[0]}`,
      images: [{
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `NoteHub`
      }],
    }
  }
}

const PER_PAGE = 12;

export default async function FilterPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;

  const filter = slug?.[0] ?? "all";
  const tag = filter === "all" ? undefined : filter;

  const qc = new QueryClient();

  await qc.prefetchQuery({
    queryKey: ["notes", tag, 1, "", PER_PAGE],
    queryFn: () =>
      fetchNotesServer({
        page: 1,
        perPage: PER_PAGE,
        search: "",
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}