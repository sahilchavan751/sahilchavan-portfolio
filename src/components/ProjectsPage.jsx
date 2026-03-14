import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './ProjectsPage.css'

const projectsData = [
    {
        id: 1,
        title: 'Billing System',
        language: 'C#',
        description: 'A robust desktop billing application featuring invoice generation, customer management, and real-time billing workflows.',
        stack: ['.NET', 'WPF', 'XAML', 'SQL Server'],
        features: [
            'Automated Invoice generation',
            'Customer CRUD operations',
            'Real-time tax calculations',
            'Advanced reporting engine',
        ],
        accent: 'linear-gradient(135deg, #F4C025 0%, #B88A00 100%)',
    },
    {
        id: 2,
        title: 'Sahil Portfolio',
        language: 'JavaScript (JSX)',
        description: 'A high-end, immersive personal portfolio featuring fluid GSAP animations, interactive 3D elements, and custom micro-interactions.',
        stack: ['React', 'Vite', 'GSAP', 'Framer Motion', 'Lenis'],
        features: [
            'Lenis smooth scrolling',
            'Magnetic cursor interactions',
            '3D Dome gallery system',
            'Audio-visual experience',
        ],
        accent: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 100%)',
    },
    {
        id: 3,
        title: 'Traceless',
        language: 'JavaScript',
        description: 'A privacy-focused ephemeral content sharing platform built as a high-performance Progressive Web App.',
        stack: ['React', 'Firebase', 'Vercel Blob', 'PWA'],
        features: [
            'End-to-end ephemeral sharing',
            'Firebase real-time sync',
            'Secure media handling',
            'Offline-first architecture',
        ],
        accent: 'linear-gradient(135deg, #F4C025 0%, #8A6D0F 100%)',
    },
]

const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: (i) => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            delay: 0.15 * i,
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
}

const modalVariants = {
    hidden: { opacity: 0, backdropFilter: 'blur(0px)', scale: 1.05 },
    visible: { 
        opacity: 1, 
        backdropFilter: 'blur(40px)', 
        scale: 1,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
    exit: { 
        opacity: 0, 
        backdropFilter: 'blur(0px)',
        scale: 1.02,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
}

const ProjectsPage = () => {
    const [selectedProject, setSelectedProject] = useState(null)

    // Close modal on Escape
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setSelectedProject(null)
        }
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [])

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [selectedProject])

    return (
        <div className="projects-page">
            {/* Top Bar */}
            <motion.div
                className="projects-topbar"
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
                <Link to="/" className="projects-back-link">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    Back to Home
                </Link>
                <span className="projects-topbar-title">Case Studies</span>
            </motion.div>

            {/* Header */}
            <motion.div
                className="projects-header"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
                <h1>Selected Works</h1>
                <p>A curated collection of projects spanning desktop applications, web experiences, and immersive progressive web apps.</p>
            </motion.div>

            {/* Project Cards Grid */}
            <div className="projects-grid">
                {projectsData.map((project, i) => (
                    <motion.div
                        key={project.id}
                        className="project-card"
                        style={{ '--card-accent': project.accent }}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={cardVariants}
                        onClick={() => setSelectedProject(project)}
                    >
                        <span className="card-number">0{project.id}</span>
                        
                        <div className="card-content">
                            <h2 className="card-title">{project.title}</h2>
                            <p className="card-language">{project.language}</p>
                            <p className="card-description">{project.description}</p>
                            <div className="card-tags">
                                {project.stack.slice(0, 3).map((tech) => (
                                    <span className="card-tag" key={tech}>{tech}</span>
                                ))}
                                {project.stack.length > 3 && (
                                    <span className="card-tag">+{project.stack.length - 3}</span>
                                )}
                            </div>
                        </div>

                        <div className="card-arrow">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="7" y1="17" x2="17" y2="7" />
                                <polyline points="7 7 17 7 17 17" />
                            </svg>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="project-modal-backdrop"
                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, backdropFilter: 'blur(30px)' }}
                        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        transition={{ duration: 0.5 }}
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            className="project-modal"
                            style={{ '--card-accent': selectedProject.accent }}
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="modal-close-btn" onClick={() => setSelectedProject(null)}>✕</button>

                            <div className="modal-accent-line" />
                            <span className="modal-number">PROJECT 0{selectedProject.id}</span>
                            <h2 className="modal-title">{selectedProject.title}</h2>
                            <span className="modal-language-badge">{selectedProject.language}</span>

                            <div className="modal-content-grid">
                                <div>
                                    <h4 className="modal-section-title">Overview</h4>
                                    <p className="modal-description">{selectedProject.description}</p>
                                    
                                    <h4 className="modal-section-title" style={{ marginTop: '3rem' }}>Key Features</h4>
                                    <ul className="modal-features">
                                        {selectedProject.features.map((feat, idx) => (
                                            <li key={idx}>{feat}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="modal-section-title">Tech Stack</h4>
                                    <div className="modal-tags">
                                        {selectedProject.stack.map((tech) => (
                                            <span className="modal-tag" key={tech}>{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ProjectsPage
