"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import Modal from "@/components/Modal/Modal";
import css from "@/app/@modal/NotePreview.module.css";
import { useRouter } from "next/navigation";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  tag: string;
}

interface NotePreviewClientProps {
  noteId: string;
}

export default function NotePreviewClient({ noteId }: NotePreviewClientProps) {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false
  });

  const route = useRouter();

  if (isLoading) return <p>Loading note...</p>;
  if (isError || !note) return <p>Error loading note</p>;

  function handleBack() {
    route.back();
  }

  return (
    <Modal onClose={handleBack}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <button className={css.backBtn} onClick={handleBack}>
            Close
          </button>
        </div>

        <p className={css.content}>{note.content}</p>
        <h3 className={css.tag}>{note.tag}</h3>
        <h4 className={css.date}>Created at: {note.createdAt}</h4>
      </div>
    </Modal>
  );
}
