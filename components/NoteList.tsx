"use client";

import NoteCard from "./NoteCard";
import { type Note } from "@/lib/storage";
import { Ghost } from "lucide-react";

interface NoteListProps {
  notes: Note[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onMakeOld: (id: string) => void; // New debug prop
}

export default function NoteList({ notes, onToggle, onDelete, onMakeOld }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <div className="text-center py-20 flex flex-col items-center animate-pulse-slow">
        <Ghost size={48} className="text-ghost-muted mb-4 opacity-50" />
        <p className="text-ghost-muted text-lg">No notes yet. The void awaits your first thought...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {notes.map((note) => (
        <div key={note.id} className="relative group">
          <NoteCard note={note} onToggle={onToggle} onDelete={onDelete} />
          
          {/* Debug Button - Only visible on hover */}
          {!note.completed && (
             <button 
               onClick={() => onMakeOld(note.id)}
               className="absolute -top-3 -right-3 bg-surface-light text-xs text-ghost-muted border border-surface hover:text-blood hover:border-blood px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all z-10"
               title="Debug: Make this note 25 hours old"
             >
               Debug: Make Old
             </button>
          )}
        </div>
      ))}
    </div>
  );
}