# Requirements: Haunting Logic
1. The application stores notes as an array of objects: `{ id, text, createdAt, completed }`.
2. A note is "Haunted" if `completed === false` AND it was created more than 24 hours ago.
3. The UI must visually differentiate Haunted notes (red glowing border, ghost icon, flicker animation).
4. Users can toggle a note's `completed` status. Completing a haunted note stops the visual effects.
