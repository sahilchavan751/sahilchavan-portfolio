import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Lenis from 'lenis'
import './AboutInfoPage.css'

const AboutInfoPage = () => {
    // Ensure scroll starts at top and initialize smooth scroll
    useEffect(() => {
        window.scrollTo(0, 0)
        
        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
        }
    }, [])

    return (
        <div className="about-info-page">
            {/* Top Bar Navigation */}
            <motion.div
                className="about-topbar"
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
                <Link to="/" className="about-back-link">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    Back to Home
                </Link>
                <span className="about-topbar-title">About Me</span>
            </motion.div>

            {/* Page Content */}
            <div className="about-content-wrapper">
                {/* Left Column: Image */}
                <motion.div 
                    className="about-image-col"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="about-image-container">
                        <img 
                            src="/workspace-images/w1.jpg" 
                            alt="Sahil Chavan Portrait" 
                            className="about-portrait"
                        />
                        <div className="about-image-overlay"></div>
                    </div>
                </motion.div>

                {/* Right Column: Text & Bio */}
                <motion.div 
                    className="about-text-col"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="about-header-group">
                        <motion.span 
                            className="about-calligraphy"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.6 }}
                        >
                            Hello, I am
                        </motion.span>
                        <h1 className="about-title">SAHIL CHAVAN</h1>
                    </div>

                    <div className="about-bio-content">
                        <p className="about-bio-lead">
                            I am a multidisciplinary visual creator and developer, blending the lines between technical precision and artistic expression.
                        </p>
                        
                        <div className="about-bio-body">
                            <p>
                                My journey began with a fascination for storytelling—whether through the lens of a camera capturing fleeting moments of urban geometry, or writing elegant code that brings a digital experience to life.
                            </p>
                            <p>
                                With extensive experience in both software architecture (C#, .NET, React) and visual media (photography, cinematography), I approach every project not just as a standalone task, but as a holistic narrative. I believe the best applications feel less like tools and more like immersive environments.
                            </p>
                        </div>

                        <div className="about-skills-grid">
                            <div className="skill-category">
                                <h3>Development</h3>
                                <ul>
                                    <li>React / Next.js</li>
                                    <li>C# / .NET</li>
                                    <li>Creative Coding (GSAP)</li>
                                    <li>SQL Server / Firebase</li>
                                </ul>
                            </div>
                            <div className="skill-category">
                                <h3>Visual</h3>
                                <ul>
                                    <li>Cinematography</li>
                                    <li>Color Grading</li>
                                    <li>UI/UX Design</li>
                                    <li>Figma Prototyping</li>
                                </ul>
                            </div>
                        </div>

                        <div className="about-contact-cta">
                            <a href="#contact" className="about-cta-link">
                                GET IN TOUCH
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Divider */}
            <motion.div 
                className="about-section-divider"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Second User Section: Digambar Patil */}
            <div className="about-content-wrapper about-content-wrapper--reverse">
                {/* Left Column: Text & Bio */}
                <motion.div 
                    className="about-text-col about-text-col--left"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="about-header-group">
                        <motion.span 
                            className="about-calligraphy"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.4 }}
                        >
                            Meet
                        </motion.span>
                        <h1 className="about-title">DIGAMBAR PATIL</h1>
                    </div>

                    <div className="about-bio-content">
                        <p className="about-bio-lead">
                            A passionate creator and problem-solver who brings ideas to life through technology and creative vision.
                        </p>
                        
                        <div className="about-bio-body">
                            <p>
                                Digambar is driven by a relentless curiosity and a deep commitment to craftsmanship. With a strong foundation in modern development practices, he transforms complex challenges into elegant, user-centric solutions.
                            </p>
                            <p>
                                His approach blends analytical thinking with creative intuition—ensuring every project not only functions flawlessly but also delivers a memorable experience. Whether building robust backend systems or polishing pixel-perfect interfaces, Digambar strives for excellence in every detail.
                            </p>
                        </div>

                        <div className="about-skills-grid">
                            <div className="skill-category">
                                <h3>Development</h3>
                                <ul>
                                    <li>React / Next.js</li>
                                    <li>Node.js / Express</li>
                                    <li>Python / Django</li>
                                    <li>MongoDB / PostgreSQL</li>
                                </ul>
                            </div>
                            <div className="skill-category">
                                <h3>Creative</h3>
                                <ul>
                                    <li>UI/UX Design</li>
                                    <li>Motion Graphics</li>
                                    <li>Brand Identity</li>
                                    <li>Visual Storytelling</li>
                                </ul>
                            </div>
                        </div>

                        <div className="about-contact-cta">
                            <a href="#contact" className="about-cta-link">
                                GET IN TOUCH
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Image */}
                <motion.div 
                    className="about-image-col about-image-col--static"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="about-image-container">
                        <img 
                            src="/aboutinfo/digambar.jpeg" 
                            alt="Digambar Patil Portrait" 
                            className="about-portrait"
                        />
                        <div className="about-image-overlay"></div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default AboutInfoPage
