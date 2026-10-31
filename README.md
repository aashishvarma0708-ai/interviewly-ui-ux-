# Interviewly — UI/UX Showcase

> A cinematic, editorial-style concept for a technical interview and career-matching platform. Built to showcase interface design, interaction design, motion, and front-end craft.

**Live showcase:** [interviewly-ui-ux.pages.dev](https://interviewly-ui-ux.pages.dev/)  
**Repository:** [aashishvarma0708-ai/interviewly-ui-ux-](https://github.com/aashishvarma0708-ai/interviewly-ui-ux-)

---

## About the project

Interviewly explores how a technical hiring platform could help candidates and engineering teams discover each other, prepare for interviews, and make structured decisions. The site presents that idea through a polished landing page and visual login and sign-up flows.

**This is a UI/UX showcase and front-end concept.** The candidate profiles, companies, role listings, match scores, testimonials, and metrics are illustrative sample content. Login and sign-up demonstrate the interface and client-side form validation; there is no authentication service, database, job-search backend, or calendar integration connected.

## Design direction

The Interviewly visual system was designed and implemented from scratch for this concept. Its graphite-and-titanium palette, editorial typography, glass-like panels, technical dossier motifs, and cursor-aware motion work together as one cohesive identity.

- **Palette:** graphite, titanium, slate, silver, and restrained orange accents.
- **Typography:** English-language interface copy, using Outfit, Plus Jakarta Sans, and Inter.
- **Composition:** editorial typography, generous spacing, fine dividers, glass-like panels, and a technical dossier aesthetic.
- **Motion:** an opening sequence, scroll reveals, ambient light, subtle parallax, and cursor-reactive card and control effects.
- **Responsive behavior:** layouts adapt across desktop and smaller screens; motion effects respect reduced-motion preferences and are tuned for pointer devices.

## What you can explore

- **Landing page:** the product story, navigation, platform methodology, evidence pillars, role streams, candidate and employer pathways, benefits, and calls to action.
- **Interactive role streams:** switch between Design Engineering, Systems Architecture, Product Leadership, and AI & Machine Learning profiles.
- **Interview dossier visual:** example candidate details, match signals, interview timing, evaluator, competencies, and pipeline stage.
- **Login page:** candidate/employer selection, form validation, password visibility, and a forgot-password interaction.
- **Sign-up page:** candidate/employer selection, profile fields, engineering-track selection, password visibility, and form validation.
- **Shared interaction system:** magnetic controls, cursor-following light and tilt, scroll-based reveals, page transitions, and the introductory sequence.

## Technology

- React 18
- Vite 5
- React Router 6
- CSS (component and page stylesheets; no UI framework)

## Run locally

You’ll need Node.js and npm installed.

```bash
git clone https://github.com/aashishvarma0708-ai/interviewly-ui-ux-.git
cd interviewly-ui-ux-
npm install
npm run dev
```

Vite prints a local address in the terminal, usually [http://localhost:5173](http://localhost:5173/).

### Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Vite development server |
| `npm run build` | Create the production site in `dist/` |
| `npm run preview` | Preview the production build locally |

## Project structure

```text
.
├── public/
│   ├── _redirects                 # Cloudflare Pages SPA fallback
│   └── favicon.svg
├── src/
│   ├── components/                # Shared UI and motion components
│   ├── hooks/
│   │   ├── useCursorReaction.js   # Cursor-aware interaction effects
│   │   └── useScrollReveal.js     # Scroll reveal and parallax behavior
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── App.jsx                    # Routes and shared application shell
│   ├── index.css                  # Global design tokens and base styles
│   └── main.jsx                   # React entry point
├── index.html
├── package.json
└── vite.config.js
```

## Deploy on Cloudflare Pages

This repository is configured for a Vite single-page application.

1. Connect the GitHub repository to a Cloudflare Pages project.
2. Select `main` as the production branch.
3. Set the build command to `npm run build`.
4. Set the build output directory to `dist`.
5. Leave the root directory blank because `package.json` is at the repository root.

The `public/_redirects` file routes page requests to `index.html` so React Router paths such as `/login` and `/signup` can load directly. Cloudflare copies files in `public/` into the build output during the Vite build.

## Implementation notes

- The primary routes are `/`, `/login`, and `/signup`.
- Landing-page sections are linked with in-page anchors.
- Reusable components and shared CSS keep the navigation, buttons, inputs, glass cards, footer, and interview console consistent.
- Motion is implemented with React hooks, CSS transitions, pointer tracking, and browser observers rather than a large animation dependency.
- The experience is designed as a visual product concept; form submission is illustrative and does not create an account.

## Credits

**Concept, visual design, and interface implementation:** Interviewly UI/UX showcase  
**Built from scratch with:** React, Vite, React Router, and CSS

---

Made as a portfolio piece to demonstrate product thinking, visual design, and interactive front-end implementation.
