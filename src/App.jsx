import { useState, useCallback, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Menu from './components/Menu'
import Preloader from './components/Preloader'
import MusicPlayer from './components/MusicPlayer'
import Workspace from './components/Workspace'
import DomeGallery from './components/DomeGallery'
import About from './components/About'
import Process from './components/Process'
import SkillsStrip from './components/SkillsStrip'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import ProjectsPage from './components/ProjectsPage'
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

                <div className="dome-gallery-wrapper">
                    <div className="dome-gallery-title">
                        <h2>CAPTURES</h2>
                    </div>
                    <DomeGallery
                        fit={0.6}
                        minRadius={400}
                        maxVerticalRotationDeg={0}
                        segments={34}
                        dragDampening={2}
                        overlayBlurColor="transparent"
                        grayscale={true}
                    />
                </div>

                <About />
                <Process />
                <SkillsStrip />

                <Footer />
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
            </Routes>
        </div>
    )
}

export default App
