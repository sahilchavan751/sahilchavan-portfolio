import { useState, useCallback, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Menu from './components/Menu'
import Preloader from './components/Preloader'
import MusicPlayer from './components/MusicPlayer'
import Workspace from './components/Workspace'
import TechGrid from './components/TechGrid'
import About from './components/About'
import Process from './components/Process'
import FooterZoomWrapper from './components/FooterZoomWrapper'
import CustomCursor from './components/CustomCursor'
import ProjectsPage from './components/ProjectsPage'
import AboutInfoPage from './components/AboutInfoPage'
import ContactPage from './components/ContactPage'
import './App.css'

function HomePage({ isMenuOpen, setIsMenuOpen, isLoading, handlePreloaderComplete }) {

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
            window.removeEventListener('click', handleHashLinks)
            window.lenis = null;
        }
    }, [])

    return (
        <>
            {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
            <Navbar onMenuOpen={() => setIsMenuOpen(true)} />

            <div id="home" className="hero-wrapper">
                <Hero />
            </div>

            <main className="main-content">
                <div id="projects" className="workspace-wrapper">
                    <Workspace />
                </div>

                <TechGrid />

                <About />
                <Process />
                <FooterZoomWrapper />
            </main>

            <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            <MusicPlayer />
        </>
    )
}

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const handlePreloaderComplete = useCallback(() => {
        setIsLoading(false)
    }, [])

    return (
        <div className="app">
            <CustomCursor />
            <Routes>
                <Route path="/" element={
                    <HomePage
                        isMenuOpen={isMenuOpen}
                        setIsMenuOpen={setIsMenuOpen}
                        isLoading={isLoading}
                        handlePreloaderComplete={handlePreloaderComplete}
                    />
                } />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/about" element={<AboutInfoPage />} />
                <Route path="/contact" element={<ContactPage />} />
            </Routes>
        </div>
    )
}

export default App
