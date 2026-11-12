# Design: Haunting Logic
- **Storage:** Create a custom hook `useSpectralNotes` that abstracts `localStorage` interactions.
- **Date Math:** Use JavaScript `Date.now()` and subtract 24 hours (86,400,000 ms) to determine haunting status.
- **Framer Motion:** Wrap the note card in a `motion.div`. If `isHaunted` is true, apply an infinite opacity animation to simulate flickering.
