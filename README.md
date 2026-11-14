# 🎃 Spectral Notes

> **Built for the Kiroween 2026 Hackathon (Costume Contest Category)**  
> *Unfinished thoughts turn haunted after 24 hours. Complete them before they come back to haunt you.*

🔗 **Live Demo:** [https://spectral-notes.vercel.app/](https://spectral-notes.vercel.app/)  
🎥 **Video Demo:** [Watch on YouTube](https://youtu.be/vrbc4nniHHw)  
📝 **Blog Post:** [Building "Spectral Notes" with Kiro](https://dev.to/me_y_fb1f776419302946b34e/building-spectral-notes-a-haunted-productivity-app-with-kiro-156)

---

## 👻 What is Spectral Notes?
**Spectral Notes** is a minimalist productivity web application with a spooky twist. When you add a task or note, a 24-hour countdown begins. If you procrastinate and leave it uncompleted past 24 hours, the note becomes **"haunted"**—turning blood-red, flickering with eerie animations, and summoning a ghost icon until you complete ("exorcise") it.

## 🛠️ Built With
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Language:** TypeScript
- **AI Development Environment:** Kiro IDE

## ⚡ How Kiro IDE Powered This Project
- **Spec-Driven Development (`.kiro/specs`):** Defined the core requirements, 24-hour haunting threshold logic, and Framer Motion states to generate clean custom React hooks (`useSpectralNotes`) and components.
- **Steering Docs (`.kiro/steering`):** Locked in the Tailwind v4 spooky color palette (`bg-surface`, `text-blood`) and coding conventions across the entire project without repetitive prompting.
- **Agent Hooks:** Automated formatting and consistency checks on save.

## 🚀 Running Locally
```bash
git clone [https://github.com/myhifi/spectral-notes.git](https://github.com/myhifi/spectral-notes.git)
cd spectral-notes
npm install
npm run dev

Open http://localhost:3000 in your browser.
```

## 🎵 Audio Assets & Credits

Sound effects used in this project are royalty-free and sourced from [Freesound](https://freesound.org/):

* **Click Sound (`click.mp3`):**  
  * **Original Title:** SFX UI Button Click  
  * **Author:** suntemple  
  * **License:** [Creative Commons 0 (CC0)](https://creativecommons.org/publicdomain/zero/1.0/)  

* **Exorcise Chime (`exorcise.mp3`):**  
  * **Original Title:** Fantasy Achievement Unlock - Magical Stinger  
  * **Author:** TommasoMotteran  
  * **License:** [Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)  

* **Haunted Ghost Whisper (`haunted.mp3`):**  
  * **Original Title:** whisper ghost horror scream sound effect (Edited/Trimmed to a single tone)  
  * **Author:** Garuda1982  
  * **License:** [Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)
