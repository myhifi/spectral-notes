"use client";

import { useCallback, useEffect, useState } from "react";
import {
  createNote,
  deleteNote,
  loadNotes,
  saveNotes,
  toggleNote,
  type Note,
} from "./storage";

export function useSpectralNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNotes(loadNotes());
    setIsLoaded(true);
  }, []);

  const persist = useCallback((updated: Note[]) => {
    setNotes(updated);
    saveNotes(updated);
  }, []);

  const addNote = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      persist([createNote(text), ...notes]);
    },
    [notes, persist]
  );

  const toggleComplete = useCallback(
    (id: string) => {
      persist(toggleNote(notes, id));
    },
    [notes, persist]
  );

  const removeNote = useCallback(
    (id: string) => {
      persist(deleteNote(notes, id));
    },
    [notes, persist]
  );

  // Debug feature to test the haunting logic without waiting 24 hours
  const makeNoteOld = useCallback(
    (id: string) => {
      const twentyFiveHoursAgo = Date.now() - 25 * 60 * 60 * 1000;
      persist(
        notes.map((n) => (n.id === id ? { ...n, createdAt: twentyFiveHoursAgo } : n))
      );
    },
    [notes, persist]
  );

  return { notes, addNote, toggleComplete, removeNote, makeNoteOld, isLoaded };
}