"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Ghost, Trash2 } from "lucide-react";
import { isNoteHaunted, type Note } from "@/lib/storage";

interface NoteCardProps {
  note: Note;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

const flickerVariants: Variants = {
  idle: { opacity: 1 },
  haunted: {
    opacity: [1, 0.8, 1, 0.5, 1, 0.8, 1],
    transition: {
      duration: 3,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

const ghostVariants: Variants = {
  idle: {},
  haunted: {
    y: [0, -6, 0],
    transition: { duration: 2.5, ease: "easeInOut", repeat: Infinity },
  },
};

export default function NoteCard({ note, onToggle, onDelete }: NoteCardProps) {
  const haunted = isNoteHaunted(note);

  const formattedDate = new Date(note.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible" // <--- FIXED: Always animate to visible on mount
      exit="exit"
      whileHover={{ scale: 1.015 }}
      className={[
        "relative rounded-xl border p-4 transition-colors duration-300",
        "bg-surface overflow-hidden", // <--- Added overflow-hidden
        haunted
          ? "border-blood shadow-[0_0_18px_2px_rgba(138,3,3,0.55)]"
          : note.completed
          ? "border-ghost/10"
          : "border-surface-light",
      ].join(" ")}
    >
      {/* Flicker overlay for haunted state */}
      {haunted && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none bg-blood/10" // Added slight red tint
          variants={flickerVariants}
          initial="idle"
          animate="haunted"
          aria-hidden
        />
      )}

      {/* Content wrapper relative so it stays above the overlay */}
      <div className="relative z-10 flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(note.id)}
          aria-label={note.completed ? "Mark note incomplete" : "Complete note"}
          className={[
            "mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center",
            "transition-colors duration-200 focus-visible:outline-none",
            "focus-visible:ring-2 focus-visible:ring-blood-light",
            note.completed
              ? "border-blood bg-blood"
              : haunted
              ? "border-blood-light bg-transparent"
              : "border-ghost-muted bg-transparent",
          ].join(" ")}
        >
          {note.completed && (
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="h-3 w-3 text-ghost"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden
            >
              <path
                d="M2 6l3 3 5-5"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          )}
        </button>

        {/* Note content */}
        <div className="flex-1 min-w-0">
          <p
            className={[
              "text-sm leading-relaxed wrap-break-word transition-colors duration-300",
              note.completed
                ? "line-through text-ghost-muted"
                : haunted
                ? "text-blood-light"
                : "text-ghost",
            ].join(" ")}
          >
            {note.text}
          </p>
          <p className="mt-1.5 text-xs text-ghost-muted">{formattedDate}</p>
        </div>

        {/* Haunted ghost icon */}
        <AnimatePresence>
          {haunted && (
            <motion.div
              key="ghost"
              variants={ghostVariants}
              initial="idle"
              animate="haunted"
              exit="idle"
              aria-label="Haunted"
              title="This note is haunted — it's been unfinished for over 24 hours!"
            >
              <Ghost
                size={18}
                className="text-blood-light shrink-0"
                aria-hidden
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete button */}
        <button
          onClick={() => onDelete(note.id)}
          aria-label="Delete note"
          className={[
            "shrink-0 rounded-md p-1 transition-colors duration-200",
            "text-ghost-muted hover:text-blood-light",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-light",
          ].join(" ")}
        >
          <Trash2 size={15} aria-hidden />
        </button>
      </div>
    </motion.div>
  );
}