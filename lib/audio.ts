// lib/audio.ts
// Lightweight audio utility for Spectral Notes sound effects.
// Uses the Web Audio API's HTMLAudioElement — safe to call server-side
// (the typeof window guard prevents any execution during SSR).

export type SoundId = "click" | "exorcise" | "haunted";

const SOUND_PATHS: Record<SoundId, string> = {
  click: "/sounds/click.mp3",
  exorcise: "/sounds/exorcise.mp3",
  haunted: "/sounds/haunted.mp3",
};

// Cache Audio instances so repeated calls don't re-fetch the files
const audioCache: Partial<Record<SoundId, HTMLAudioElement>> = {};

/**
 * Plays a named sound effect. Silently no-ops if:
 * - Called during SSR (no window)
 * - The browser blocks autoplay
 * - The file fails to load
 *
 * @param id - One of "click" | "exorcise" | "haunted"
 * @param volume - Playback volume between 0 and 1 (default 0.6)
 */
export function playSound(id: SoundId, volume = 0.6): void {
  if (typeof window === "undefined") return;

  try {
    // Reuse a cached instance; create one on first use
    let audio = audioCache[id];
    if (!audio) {
      audio = new Audio(SOUND_PATHS[id]);
      audioCache[id] = audio;
    }

    // Rewind so rapid repeated calls always play from the start
    audio.currentTime = 0;
    audio.volume = Math.max(0, Math.min(1, volume));

    // play() returns a Promise; swallow the rejection so browsers that
    // block autoplay don't throw unhandled promise rejection errors.
    audio.play().catch(() => {
      // Autoplay policy blocked the sound — ignore silently
    });
  } catch {
    // Any other unexpected error should not crash the app
  }
}
