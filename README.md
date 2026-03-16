# Sahil Chavan — Portfolio

A modern, animated personal portfolio website built with **React 18** and **Vite**, featuring smooth scroll, 3D tech-stack dome gallery, cinematic preloader, and immersive micro-interactions.

> **Live:** [sahilchavan-portfolio](https://github.com/sahilchavan751/sahilchavan-portfolio)

---

## ✨ Features

| Feature | Description |
|---|---|
| **Cinematic Preloader** | Full-screen animated loader on initial page load |
| **Hero Section** | Video-backed hero with bold typography |
| **Workspace / Projects** | Showcase of featured work with hover reveals |
| **3D Dome Gallery** | Interactive, auto-rotating dome of tech logos with drag-to-spin and click-to-enlarge |
| **About Page** | Calligraphy-styled page with sticky image and animated content |
| **Process Section** | Step-by-step workflow breakdown with scroll-driven animations |
| **Skills Strip** | Infinite marquee of skill tags |
| **Custom Cursor** | Magnetic, context-aware custom cursor |
| **Music Player** | Ambient background audio toggle |
| **Smooth Scroll** | Lenis-powered buttery-smooth scrolling |
| **SPA Navigation** | React Router client-side routing (no full-page reloads) |

---

## 🛠 Tech Stack

### Core
- **React 18** — UI library
- **Vite 5** — Lightning-fast dev server & bundler
- **React Router DOM v7** — Client-side routing

### Animation & Interaction
- **GSAP** — Timeline-based scroll & entrance animations
- **Framer Motion** — Declarative layout & page transitions
- **@use-gesture/react** — Drag, pinch, and gesture handling

### Smooth Scroll
- **Lenis** — Smooth scrolling engine

### Icons & Assets
- **Lucide React** — Icon library
- Custom SVG tech logos (React, Node.js, TypeScript, Python, Firebase, etc.)

### Typography
- Space Grotesk · Playfair Display · Archivo Black · Pinyon Script · Cormorant Garamond · Antonio · Syne · Mrs Saint Delafield  
  *(loaded via Google Fonts)*

---

## 📁 Project Structure

```
sahil-portfolio/
├── public/
│   ├── aboutinfo/           # About page images
│   ├── fonts/               # Custom font files
│   ├── hero-videos/         # Hero section video assets
│   ├── process-images/      # Process section images
│   ├── tech-logos/           # SVG logos for Dome Gallery
│   ├── workspace-images/    # Project/workspace images
│   ├── favicon.jpg
│   └── solitude.mp3         # Background music track
├── src/
│   ├── assets/
│   │   └── about-image/     # About section image
│   ├── components/
│   │   ├── Navbar.jsx       # Navigation bar
│   │   ├── Hero.jsx         # Hero section with video
│   │   ├── Menu.jsx         # Full-screen overlay menu
│   │   ├── Preloader.jsx    # Cinematic preloader
│   │   ├── Workspace.jsx    # Projects showcase
│   │   ├── DomeGallery.jsx  # 3D auto-rotating tech dome
│   │   ├── About.jsx        # About preview section
│   │   ├── AboutInfoPage.jsx# Full about page
│   │   ├── Process.jsx      # Process/workflow section
│   │   ├── SkillsStrip.jsx  # Infinite marquee skills
│   │   ├── ProjectsPage.jsx # Dedicated projects page
│   │   ├── Footer.jsx       # Footer with grid design
│   │   ├── CustomCursor.jsx # Custom cursor component
│   │   └── MusicPlayer.jsx  # Audio player toggle
│   ├── App.jsx              # Root app with routes
│   ├── main.jsx             # Entry point
│   ├── App.css
│   └── index.css            # Global styles & design tokens
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/sahilchavan751/sahilchavan-portfolio.git
cd sahilchavan-portfolio

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 📄 Routes

| Path | Page |
|---|---|
| `/` | Home — Hero, Projects, Dome Gallery, About, Process, Footer |
| `/projects` | Dedicated projects listing |
| `/about` | Full about page with sticky image & bio |

---

## 📝 License

This project is private and proprietary.

---

*Designed & developed by **Sahil Chavan***
