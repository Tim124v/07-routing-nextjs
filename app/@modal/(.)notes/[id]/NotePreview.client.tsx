"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import Loader from "@/components/Loader/Loader";
import Error from "@/components/Error/Error";
import styles from './NotePreview.module.css';

interface NotePreviewProps {
  noteId: number;
}

export default function NotePreview({ noteId }: NotePreviewProps) {
  const router = useRouter();

  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId.toString()),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <Loader />
      </Modal>
    );
  }

  if (error || !note) {
    return (
      <Modal onClose={handleClose}>
        <Error message="Failed to load note" />
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <div className={styles.preview}>
        <h2 className={styles.title}>{note.title}</h2>
        <p className={styles.content}>{note.content}</p>
        <div className={styles.meta}>
          <div className={styles.tags}>
            <span className={styles.tag}>{note.tag}</span>
          </div>
          <p className={styles.createdAt}>
            Created: {new Date(note.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Modal>
  );
} 