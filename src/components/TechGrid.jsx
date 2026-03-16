import React from 'react'
import { motion } from 'framer-motion'
import './TechGrid.css'

const techData = [
    { src: '/tech-logos/react.svg', name: 'React', category: 'FRONTEND' },
    { src: '/tech-logos/nextjs.svg', name: 'Next.js', category: 'FRONTEND' },
    { src: '/tech-logos/javascript.svg', name: 'JavaScript', category: 'LANGUAGE' },
    { src: '/tech-logos/typescript.svg', name: 'TypeScript', category: 'LANGUAGE' },
    { src: '/tech-logos/csharp.svg', name: 'C#', category: 'LANGUAGE' },
    { src: '/tech-logos/python.svg', name: 'Python', category: 'LANGUAGE' },
    { src: '/tech-logos/dotnet.svg', name: '.NET', category: 'BACKEND' },
    { src: '/tech-logos/nodejs.svg', name: 'Node.js', category: 'BACKEND' },
    { src: '/tech-logos/html5.svg', name: 'HTML5', category: 'FRONTEND' },
    { src: '/tech-logos/css3.svg', name: 'CSS3', category: 'FRONTEND' },
    { src: '/tech-logos/firebase.svg', name: 'Firebase', category: 'BACKEND' },
    { src: '/tech-logos/sql.svg', name: 'SQL', category: 'DATABASE' },
    { src: '/tech-logos/git.svg', name: 'Git', category: 'TOOLS' },
    { src: '/tech-logos/figma.svg', name: 'Figma', category: 'DESIGN' },
    { src: '/tech-logos/tailwindcss.svg', name: 'Tailwind', category: 'FRONTEND' },
]

const cellVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: (i) => ({
        opacity: 1,
        scale: 1,
        transition: {
            delay: 0.04 * i,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
}

const TechGrid = () => {
    return (
        <div className="tech-grid-section">
            {/* Section header */}
            <motion.div
                className="tech-grid-header"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                <span className="tech-grid-label">TECHNOLOGIES</span>
                <h2 className="tech-grid-title">STACK</h2>
                <span className="tech-grid-count">{techData.length} TOOLS</span>
            </motion.div>

            {/* The Grid */}
            <div className="tech-grid">
                {techData.map((tech, i) => (
                    <motion.div
                        key={tech.name}
                        className="tech-cell"
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        variants={cellVariants}
                    >
                        {/* Index number */}
                        <span className="cell-index">{String(i + 1).padStart(2, '0')}</span>

                        {/* Logo */}
                        <div className="cell-logo">
                            <img src={tech.src} alt={tech.name} draggable={false} />
                        </div>

                        {/* Info overlay (visible on hover) */}
                        <div className="cell-info">
                            <span className="cell-name">{tech.name}</span>
                            <span className="cell-category">{tech.category}</span>
                        </div>

                        {/* Corner accents */}
                        <div className="cell-corner cell-corner--tl" />
                        <div className="cell-corner cell-corner--br" />
                    </motion.div>
                ))}

                {/* Empty filler cell for visual balance */}
                <div className="tech-cell tech-cell--empty">
                    <span className="cell-empty-text">+ MORE</span>
                </div>
            </div>
        </div>
    )
}

export default TechGrid
