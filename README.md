# Rahini Selvaraj — Developer Portfolio

A dark, cinematic personal portfolio for **Rahini Selvaraj** — Python Developer & B.Tech Information Technology student at Sri Sairam Engineering College, Chennai.

Built with **React + TypeScript + Vite + Tailwind CSS + Framer Motion**. Designed for one-click deployment on **Vercel**.

## Stack

- React 18 / TypeScript
- Vite (build tool)
- Tailwind CSS (utility-first styling)
- Framer Motion (animations + scroll effects)
- Canvas-based cinematic particle layer (warm bokeh + parallax)
- Lucide React (icons)
- Kanit font (Google Fonts, weights 300–900)

## Sections

1. **Hero** — cinematic Ken Burns portrait, floating particle layer, mouse parallax
2. **About** — bio, education, and skills grouped by Languages / Web / Data & ML / Tools / Design
3. **Services** — Full-Stack Development, ML & Data Science, AI Platforms, Databases & Cloud, UI/UX
4. **Projects** — AquaPure, NexaHome, Restaurant Rating & Recommendation System
5. **Experience** — internships, certifications, achievements & leadership
6. **Contact** — Email, WhatsApp, LinkedIn, GitHub

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → /dist
npm run preview  # serve /dist locally
```

## Notes

- The hero uses your photo (`public/rahini.jpg`) with a slow zoom/parallax effect instead of a talking-head video — swap in a video later if you generate one, following the same pattern as `HeroSection.tsx`.
- Project cards use gradient art panels rather than screenshots since no live project screenshots were provided — replace `gradient` values with real screenshots in `ProjectsSection.tsx` once you have them.
