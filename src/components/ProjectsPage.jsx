import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './ProjectsPage.css'

const projectsData = [
    {
        id: 1,
        title: 'Billing System',
        language: 'C#',
        description: 'A robust desktop billing application featuring invoice generation, customer management, and real-time billing workflows with advanced reporting.',
        stack: ['.NET', 'WPF', 'XAML', 'SQL Server'],
        features: [
            'Automated Invoice generation',
            'Customer CRUD operations',
            'Real-time tax calculations',
            'Advanced reporting engine',
        ],
        accent: '#000000',
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
        accent: '#D4AF37',
    },
    {
        id: 3,
        title: 'Traceless',
        language: 'JavaScript',
        description: 'A privacy-focused ephemeral content sharing platform built as a high-performance Progressive Web App with end-to-end encryption.',
        stack: ['React', 'Firebase', 'Vercel Blob', 'PWA'],
        features: [
            'End-to-end ephemeral sharing',
            'Firebase real-time sync',
            'Secure media handling',
            'Offline-first architecture',
        ],
        accent: '#C9A227',
    },
    {
        id: 4,
        title: 'Blind App',
        language: 'Java',
        description: 'An innovative assistive Android application designed to empower visually impaired users with real-time environment recognition and audio navigation.',
        stack: ['Java', 'Android SDK', 'TensorFlow Lite', 'Google Vision API', 'Firebase'],
        features: [
            'Real-time object detection',
            'Text-to-speech navigation',
            'Emergency location sharing',
            'Gesture-based interaction',
        ],
        accent: '#4A90E2',
    },
    {
        id: 5,
        title: 'Mathon',
        language: 'JavaScript (JSX)',
        description: 'A dynamic marathon hosting agency platform enabling organizers to create, manage, and promote marathon events with real-time participant tracking.',
        stack: ['React', 'Vite', 'Node.js', 'Firebase', 'Framer Motion'],
        features: [
            'Event creation & management',
            'Real-time participant tracking',
            'Registration & payment flow',
            'Dynamic route mapping',
        ],
        accent: '#E85D3A',
    },
]

const blockVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
}

const staggerContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.06, delayChildren: 0.15 },
    },
}

const staggerItem = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
}

const ProjectsPage = () => {
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
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    BACK
                </Link>
                <span className="projects-topbar-title">PROJECTS / 0{projectsData.length}</span>
            </motion.div>

            {/* Cube Grid */}
            <div className="projects-cube-grid">
                {projectsData.map((project, i) => (
                    <motion.div
                        key={project.id}
                        className="cube-card"
                        style={{ '--cube-accent': project.accent }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        variants={blockVariants}
                    >
                        {/* Top edge accent */}
                        <div className="cube-accent-bar" />

                        {/* Header row */}
                        <div className="cube-header">
                            <span className="cube-number">0{project.id}</span>
                            <span className="cube-lang">{project.language}</span>
                        </div>

                        {/* Title */}
                        <h2 className="cube-title">{project.title}</h2>

                        {/* Description */}
                        <p className="cube-desc">{project.description}</p>

                        {/* Features */}
                        <motion.div
                            className="cube-features"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                            variants={staggerContainer}
                        >
                            {project.features.map((feat, idx) => (
                                <motion.div className="cube-feature" key={idx} variants={staggerItem}>
                                    <span className="feature-dot" />
                                    {feat}
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Stack Tags */}
                        <motion.div
                            className="cube-tags"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                            variants={staggerContainer}
                        >
                            {project.stack.map((tech) => (
                                <motion.span className="cube-tag" key={tech} variants={staggerItem}>
                                    {tech}
                                </motion.span>
                            ))}
                        </motion.div>

                        {/* Arrow */}
                        <div className="cube-arrow">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
                                <line x1="7" y1="17" x2="17" y2="7" />
                                <polyline points="7 7 17 7 17 17" />
                            </svg>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default ProjectsPage
