import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './ProjectsPage.css'

const projectsData = [
    {
        id: 1,
        title: 'Billing System',
        language: 'C#',
        description: 'A desktop billing application built with Windows Presentation Foundation, featuring invoice generation, customer management, and real-time billing workflows.',
        stack: ['.NET', 'WPF', 'XAML', 'SQL Server'],
        features: [
            'Invoice generation & management',
            'Customer database with CRUD operations',
            'Real-time billing calculations',
            'Desktop-native UI with WPF controls',
        ],
        accent: 'linear-gradient(135deg, #667eea, #764ba2)',
    },
    {
        id: 2,
        title: 'Sahil Portfolio',
        language: 'JavaScript (JSX)',
        description: 'A premium, interactive personal portfolio website featuring smooth scroll animations, a custom cursor, a dome gallery, and immersive micro-interactions.',
        stack: ['React', 'Vite', 'GSAP', 'Framer Motion', 'Lenis', 'Lucide React'],
        features: [
            'Smooth scrolling with Lenis',
            'Complex GSAP scroll-triggered animations',
            'Interactive 3D dome gallery',
            'Custom cursor with contextual states',
            'Background music player',
            'Preloader with animated transitions',
        ],
        accent: 'linear-gradient(135deg, #f093fb, #f5576c)',
    },
    {
        id: 3,
        title: 'Traceless',
        language: 'JavaScript',
        description: 'A Progressive Web App focused on privacy and ephemeral content sharing, leveraging Firebase for real-time data and Vercel Blob for media storage.',
        stack: ['React', 'PWA', 'Tailwind CSS', 'Firebase', 'Vercel Blob'],
        features: [
            'Progressive Web App — installable on any device',
            'Firebase Authentication & Firestore',
            'Vercel Blob for secure media storage',
            'Responsive UI with Tailwind CSS',
            'Offline-capable with service workers',
        ],
        accent: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    },
]

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.15 * i,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
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
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
                <h1>Selected Works</h1>
                <p>A curated collection of projects spanning desktop applications, web experiences, and progressive web apps.</p>
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
                        animate="visible"
                        variants={cardVariants}
                        onClick={() => setSelectedProject(project)}
                    >
                        <span className="card-number">0{project.id}</span>
                        <h2 className="card-title">{project.title}</h2>
                        <p className="card-language">{project.language}</p>
                        <p className="card-description">{project.description}</p>
                        <div className="card-tags">
                            {project.stack.map((tech) => (
                                <span className="card-tag" key={tech}>{tech}</span>
                            ))}
                        </div>
                        <div className="card-arrow">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            className="project-modal"
                            style={{ '--card-accent': selectedProject.accent }}
                            initial={{ scale: 0.92, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="modal-close-btn" onClick={() => setSelectedProject(null)}>✕</button>

                            <div className="modal-accent-line" />
                            <span className="modal-number">PROJECT 0{selectedProject.id}</span>
                            <h2 className="modal-title">{selectedProject.title}</h2>
                            <span className="modal-language-badge">{selectedProject.language}</span>

                            <h4 className="modal-section-title">Overview</h4>
                            <p className="modal-description">{selectedProject.description}</p>

                            <h4 className="modal-section-title">Tech Stack</h4>
                            <div className="modal-tags">
                                {selectedProject.stack.map((tech) => (
                                    <span className="modal-tag" key={tech}>{tech}</span>
                                ))}
                            </div>

                            <h4 className="modal-section-title">Key Features</h4>
                            <ul className="modal-features">
                                {selectedProject.features.map((feat, idx) => (
                                    <li key={idx}>{feat}</li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ProjectsPage
