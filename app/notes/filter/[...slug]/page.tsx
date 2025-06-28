import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export default async function NotesByTagPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params;
  
  // Extract tag from URL slug, default to "All" if not provided
  const tag = resolvedParams.slug?.[0] || "All";
  
  // Convert "All" tag to undefined for API compatibility
  const tagParam = tag === "All" ? undefined : tag;
  
  // Fetch initial notes data on server side
  const initialNotes = await fetchNotes(1, undefined, tagParam);
  return <NotesClient initialNotes={initialNotes} tag={tagParam} />;
}
