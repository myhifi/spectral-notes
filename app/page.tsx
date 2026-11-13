"use client";

import { useState } from "react";
import { Ghost, Plus } from "lucide-react";
import { motion } from "framer-motion";
import NoteList from "@/components/NoteList";
import { useSpectralNotes } from "@/lib/useSpectralNotes";
import { playSound } from "@/lib/audio";

export default function Home() {
  const [input, setInput] = useState("");
  const { notes, addNote, toggleComplete, removeNote, makeNoteOld, isLoaded } =
    useSpectralNotes();

  if (!isLoaded) return null; // Prevent hydration mismatch

  const handleAddNote = () => {
    if (!input.trim()) return;
    addNote(input);
    setInput("");
    playSound("click");
  };

  // Wrap toggleComplete: play the exorcise chime only when completing a note
  const handleToggle = (id: string) => {
    const note = notes.find((n) => n.id === id);
    if (note && !note.completed) {
      playSound("exorcise");
    }
    toggleComplete(id);
  };

  // Wrap makeNoteOld: play the haunting sound alongside the debug action
  const handleMakeOld = (id: string) => {
    makeNoteOld(id);
    playSound("haunted");
  };

  return (
    <main className="min-h-screen py-16 px-4 md:px-8 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl flex flex-col items-center mb-12 text-center"
      >
        <Ghost className="w-16 h-16 text-blood mb-4 animate-float" />
        <h1 className="text-5xl md:text-6xl font-spooky text-ghost mb-4 tracking-wider drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          Spectral Notes
        </h1>
        <p className="text-ghost-muted text-lg max-w-md">
          Unfinished thoughts become haunted after 24 hours. Complete them
          before they come back to haunt you.
        </p>
      </motion.div>

      <div className="w-full max-w-2xl">
        {/* Input Area */}
        <div className="bg-surface border border-surface-light rounded-xl p-2 flex gap-2 shadow-lg focus-within:border-blood transition-colors">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleAddNote();
              }
            }}
            placeholder="Write a note... (Enter to save, Shift+Enter for newline)"
            className="flex-1 bg-transparent text-ghost placeholder-ghost-muted p-3 resize-none focus:outline-none h-14"
          />
          <button
            onClick={handleAddNote}
            className="bg-blood hover:bg-blood-light text-white p-3 rounded-lg transition-colors flex items-center justify-center shrink-0 self-end mb-1 mr-1"
            aria-label="Add Note"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Notes List */}
        <div className="mt-8">
          <NoteList
            notes={notes}
            onToggle={handleToggle}
            onDelete={removeNote}
            onMakeOld={handleMakeOld}
          />
        </div>
      </div>
    </main>
  );
}