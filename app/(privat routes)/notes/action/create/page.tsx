import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import CreateNoteClient from "./CreateNote.client";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create note - NoteHub",
    description: "Create your own note!",
  openGraph: {
    title: "Create Note - NoteHub",
    description: "Create your own note!",
    url: "https://notehub.com/notes/action/create",
    images: [{
      url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      width: 1200,
      height: 630,
      alt: "NoteHub",
    }]
  }
}


function CreateNote() {
     
    const queryClient = new QueryClient();

  return (
       <main>
         <HydrationBoundary state={dehydrate(queryClient)}>
         <CreateNoteClient></CreateNoteClient>
      </HydrationBoundary>
    </main>
    )
}

export default CreateNote