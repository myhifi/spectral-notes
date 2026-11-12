// lib/storage.ts
// Abstracts localStorage interactions for Spectral Notes.

export interface Note {
  id: string;
  text: string;
  createdAt: number; // Unix timestamp (ms)
  completed: boolean;
}

const STORAGE_KEY = "spectral-notes";
const HAUNTING_THRESHOLD_MS = 86_400_000; // 24 hours in milliseconds

/**
 * Returns true when a note is incomplete AND was created more than 24 hours ago.
 */
export function isNoteHaunted(note: Note): boolean {
  return !note.completed && Date.now() - note.createdAt > HAUNTING_THRESHOLD_MS;
}

/**
 * Loads the notes array from localStorage.
 * Returns an empty array when nothing is stored or when parsing fails.
 */
export function loadNotes(): Note[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Note[];
  } catch {
    return [];
  }
}

/**
 * Persists the notes array to localStorage.
 */
export function saveNotes(notes: Note[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

/**
 * Creates a new Note object (does NOT save – caller is responsible).
 */
export function createNote(text: string): Note {
  return {
    id: crypto.randomUUID(),
    text: text.trim(),
    createdAt: Date.now(),
    completed: false,
  };
}

/**
 * Toggles the completed status of a note by id inside the given array.
 * Returns a new array; does NOT mutate the original.
 */
export function toggleNote(notes: Note[], id: string): Note[] {
  return notes.map((note) =>
    note.id === id ? { ...note, completed: !note.completed } : note
  );
}

/**
 * Removes a note by id.
 * Returns a new array; does NOT mutate the original.
 */
export function deleteNote(notes: Note[], id: string): Note[] {
  return notes.filter((note) => note.id !== id);
}

/**
 * Custom hook that exposes notes state with localStorage persistence.
 * Import this in client components.
 */
export { useSpectralNotes } from "./useSpectralNotes";
