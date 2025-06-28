"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes, FetchNotesResponse } from "@/lib/api";
import { useDebounce } from "@/hooks/useDebounce";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import styles from "./NotesPage.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";

const NoteModal = dynamic(() => import("@/components/Modal/Modal"), {
  ssr: false,
});

interface NotesClientProps {
  initialNotes: FetchNotesResponse;
  tag?: string;
}

export default function NotesClient({ initialNotes, tag }: NotesClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const isInitialMount = useRef(true);

  const tagParam = tag ? tag : undefined;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["notes", page, tagParam, debouncedSearchQuery],
    queryFn: () => fetchNotes(page, debouncedSearchQuery, tagParam),
    placeholderData: keepPreviousData,
    initialData: initialNotes,
    retry: false,
  });

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setPage(1);
    }
  }, [tag]);

  useEffect(() => {
    if (debouncedSearchQuery !== "") {
      setPage(1);
    }
  }, [debouncedSearchQuery]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const showLoading = isLoading && !data?.notes;

  return (
    <div>
      <div className={styles.toolbar}>
        <h1>Notes</h1>
        <div className={styles.toolbarRight}>
          <SearchBox value={searchQuery} onChange={handleSearchChange} />
          <button
            onClick={() => setIsModalOpen(true)}
            className={styles.button}
          >
            Create New Note
          </button>
        </div>
      </div>

      {showLoading ? (
        <p>Loading...</p>
      ) : data?.notes !== undefined ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found</p>
      )}

      {data && data.totalPages > 1 && (
        <Pagination
          totalPages={data.totalPages}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}

      {isFetching && data?.notes && (
        <div style={{ textAlign: 'center', padding: '8px', fontSize: '14px', color: '#666' }}>
          Updating...
        </div>
      )}

      {isModalOpen && (
        <NoteModal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </NoteModal>
      )}
    </div>
  );
}
