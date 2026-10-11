# Jenifer J — React Portfolio

Professional, responsive portfolio rebuilt from the supplied HTML. Uses React, Three.js (WebGL) and GSAP ScrollTrigger. All personal content, the original portrait, resume and 17 credential entries were preserved from the supplied file. Project panels are graphic title treatments, not screenshots of the original applications.

## Run locally

Install Node.js 20.19+ or 22.12+ (LTS recommended), then open a terminal inside this folder:

```bash
npm install
npm run dev
```

Open the localhost URL printed by Vite.

## Production

```bash
npm run build
npm run preview
```

For Vercel: import the repository, select Vite, use `npm run build` and output directory `dist`. The portfolio uses section links, so no custom deep-route rewrites are needed.

## Customize

- Profile, projects, skills, links and experience: `src/App.jsx`
- Credential titles and original images: `src/credentials.json`
- Portrait reference: `src/profile.json`
- Palette, layout and responsive breakpoints: `src/styles.css`
- WebGL scene: `src/WebGLScene.jsx`
- Original resume and photos: `public/assets/`

## Interactions and accessibility

Keyboard-accessible navigation and project disclosures; native modal dialogs for certificate viewing; image gallery controls for multi-photo awards; category filters; resume and original-document downloads; email, GitHub, LinkedIn and supplied freelance links. GSAP animations respect reduced motion. WebGL is lazy-loaded, caps pixel ratio and pauses while offscreen or the browser tab is hidden. WebGL failure leaves all portfolio content usable.

The contact button opens the visitor's email client; it is not a backend contact form. Freelance links are preserved from the original document. Live availability of external websites has not been verified.
