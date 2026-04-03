import { useState, useCallback, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero, { HERO_VIDEOS } from './components/Hero'
import Menu from './components/Menu'
import Preloader from './components/Preloader'
import MusicPlayer from './components/MusicPlayer'
import Workspace from './components/Workspace'

import FooterZoomWrapper from './components/FooterZoomWrapper'
import CustomCursor from './components/CustomCursor'
import ProjectsPage from './components/ProjectsPage'
import AboutInfoPage from './components/AboutInfoPage'
import ContactPage from './components/ContactPage'
import './App.css'

function HomePage({ isMenuOpen, setIsMenuOpen }) {
    const [currentHeroVideo, setCurrentHeroVideo] = useState(0)
    const [heroFade, setHeroFade] = useState(true)

    // Lifted Hero video rotation state for syncing the top and bottom clones
    useEffect(() => {
        const switchVideo = () => {
            setHeroFade(false);
            setTimeout(() => {
                setCurrentHeroVideo((prev) => {
                    let next;
                    do {
                        next = Math.floor(Math.random() * HERO_VIDEOS.length);
                    } while (next === prev && HERO_VIDEOS.length > 1);
                    return next;
                });
                setHeroFade(true);
            }, 800);
        };

        const timer = setInterval(switchVideo, 5000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            lerp: 0.05,
            duration: 2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: true,
            touchMultiplier: 2,
            infinite: false,
        })

        window.lenis = lenis;

        // Synchronize ScrollTrigger with Lenis
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Seamless Scroll Loop using GSAP ScrollTrigger
        // Bypassing Lenis `infinite: true` to prevent mobile viewport height anomalies
        const loopTrigger = ScrollTrigger.create({
            trigger: '.seamless-clone',
            start: "top top",
            onEnter: () => {
                if (window.lenis) {
                    window.lenis.scrollTo(0, { immediate: true });
                }
            }
        });

        const handleHashLinks = (e) => {
            const target = e.target.closest('a');
            if (target && target.hash && target.hash.startsWith('#')) {
                const href = target.hash;
                e.preventDefault();

                if (href === '#home') {
                    lenis.scrollTo(0, {
                        duration: 1.5,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                    });
                } else {
                    const element = document.querySelector(href);
                    if (element) {
                        lenis.scrollTo(href, {
                            duration: 1.5,
                            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                        });
                    }
                }
            }
        };

        window.addEventListener('click', handleHashLinks);

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
            if (loopTrigger) loopTrigger.kill()
            window.removeEventListener('click', handleHashLinks)
            window.lenis = null;
        }
    }, [])

    return (
        <>
            <Navbar onMenuOpen={() => setIsMenuOpen(true)} />

            <div id="home" className="hero-wrapper">
                <Hero currentVideo={currentHeroVideo} fade={heroFade} isClone={false} />
            </div>

            <main className="main-content">
                <div id="projects" className="workspace-wrapper">
                    <Workspace />
                </div>

                <FooterZoomWrapper />
            </main>

            {/* Seamless Infinite Scroll DOM Duplicate */}
            <div className="hero-wrapper seamless-clone" aria-hidden="true" style={{ position: 'relative', zIndex: 1 }}>
                <Hero currentVideo={currentHeroVideo} fade={heroFade} isClone={true} />
            </div>

            {/* Subpixel Collision Buffer to ensure ScrollTrigger can physically be crossed on mobile */}
            <div className="phantom-scroll-buffer" aria-hidden="true" style={{ height: '50vh', backgroundColor: '#000', pointerEvents: 'none' }} />

            <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    )
}

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true) // Always start true

    const handlePreloaderComplete = useCallback(() => {
        setIsLoading(false)
    }, [])

    return (
        <div className="app">
            <CustomCursor />
            {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
            <Routes>
                <Route path="/" element={
                    <HomePage
                        isMenuOpen={isMenuOpen}
                        setIsMenuOpen={setIsMenuOpen}
                    />
                } />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/about" element={<AboutInfoPage />} />
                <Route path="/contact" element={<ContactPage />} />
            </Routes>
            <MusicPlayer />
        </div>
    )
}

export default App
