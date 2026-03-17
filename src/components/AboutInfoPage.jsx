import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './AboutInfoPage.css'

// Grid block data — each block is a draggable "Lego" piece
const initialBlocks = [
    {
        id: 'portrait',
        type: 'image',
        gridArea: '1 / 1 / 3 / 3',
        src: '/workspace-images/w1.jpg',
        alt: 'Sahil Chavan',
    },
    {
        id: 'name',
        type: 'title',
        gridArea: '1 / 3 / 2 / 5',
        label: 'HELLO, I AM',
        value: 'SAHIL\nCHAVAN',
    },
    {
        id: 'role',
        type: 'stat',
        gridArea: '2 / 3 / 3 / 4',
        label: 'ROLE',
        value: 'Full-Stack Developer & Visual Creator',
    },
    {
        id: 'location',
        type: 'stat',
        gridArea: '2 / 4 / 3 / 5',
        label: 'BASED IN',
        value: 'India',
    },
    {
        id: 'bio',
        type: 'text',
        gridArea: '3 / 1 / 4 / 3',
        content: 'I am a multidisciplinary visual creator and developer, blending the lines between technical precision and artistic expression. My journey began with a fascination for storytelling—whether through the lens of a camera or writing elegant code that brings a digital experience to life.',
    },
    {
        id: 'bio2',
        type: 'text',
        gridArea: '3 / 3 / 4 / 5',
        content: 'With extensive experience in both software architecture (C#, .NET, React) and visual media (photography, cinematography), I approach every project as a holistic narrative. I believe the best applications feel less like tools and more like immersive environments.',
    },
    {
        id: 'dev-skills',
        type: 'skills',
        gridArea: '4 / 1 / 5 / 3',
        label: 'DEVELOPMENT',
        items: ['React / Next.js', 'C# / .NET', 'Creative Coding (GSAP)', 'SQL Server / Firebase'],
    },
    {
        id: 'visual-skills',
        type: 'skills',
        gridArea: '4 / 3 / 5 / 5',
        label: 'VISUAL',
        items: ['Cinematography', 'Color Grading', 'UI/UX Design', 'Figma Prototyping'],
    },
    {
        id: 'contact',
        type: 'cta',
        gridArea: '5 / 1 / 6 / 3',
        label: 'GET IN TOUCH',
    },
    {
        id: 'status',
        type: 'stat',
        gridArea: '5 / 3 / 6 / 4',
        label: 'STATUS',
        value: 'Open to Work',
    },
    {
        id: 'year',
        type: 'stat',
        gridArea: '5 / 4 / 6 / 5',
        label: 'SINCE',
        value: '2022',
    },
]

const blockVariants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: (i) => ({
        opacity: 1,
        scale: 1,
        transition: {
            delay: 0.05 * i,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
}

const AboutInfoPage = () => {
    const [blocks, setBlocks] = useState(initialBlocks)
    const [dragging, setDragging] = useState(null)
    const [dragOver, setDragOver] = useState(null)
    const gridRef = useRef(null)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const draggingRef = useRef(null)

    const handleDragStart = useCallback((e, blockId) => {
        setDragging(blockId)
        draggingRef.current = blockId
        if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = 'move'
            const ghost = document.createElement('div')
            ghost.style.opacity = '0'
            document.body.appendChild(ghost)
            e.dataTransfer.setDragImage(ghost, 0, 0)
            setTimeout(() => document.body.removeChild(ghost), 0)
        }
    }, [])

    const handleDragOver = useCallback((e, blockId) => {
        e.preventDefault()
        if (blockId !== draggingRef.current) {
            setDragOver(blockId)
        }
    }, [])

    const handleDragEnd = useCallback(() => {
        if (dragging && dragOver && dragging !== dragOver) {
            setBlocks(prev => {
                const newBlocks = [...prev]
                const dragIdx = newBlocks.findIndex(b => b.id === dragging)
                const dropIdx = newBlocks.findIndex(b => b.id === dragOver)
                if (dragIdx === -1 || dropIdx === -1) return prev

                const tempArea = newBlocks[dragIdx].gridArea
                newBlocks[dragIdx] = { ...newBlocks[dragIdx], gridArea: newBlocks[dropIdx].gridArea }
                newBlocks[dropIdx] = { ...newBlocks[dropIdx], gridArea: tempArea }
                return newBlocks
            })
        }
        setDragging(null)
        setDragOver(null)
        draggingRef.current = null
    }, [dragging, dragOver])

    // --- Touch Handlers for Mobile ---
    const handleTouchStart = useCallback((e, blockId) => {
        setDragging(blockId)
        draggingRef.current = blockId
    }, [])

    const handleTouchMoveRef = useRef((e) => {
        if (!draggingRef.current) return
        e.preventDefault()
        const touch = e.touches[0]
        const targetElement = document.elementFromPoint(touch.clientX, touch.clientY)
        const blockElement = targetElement?.closest('.grid-block')

        if (blockElement) {
            const targetId = blockElement.getAttribute('data-block-id')
            if (targetId && targetId !== draggingRef.current) {
                setDragOver(targetId)
            }
        }
    })

    // Attach touchmove with { passive: false } via native API to allow preventDefault
    useEffect(() => {
        const grid = gridRef.current
        if (!grid) return
        const handler = handleTouchMoveRef.current
        grid.addEventListener('touchmove', handler, { passive: false })
        return () => grid.removeEventListener('touchmove', handler)
    }, [])

    const renderBlock = (block, index) => {
        const isDragging = dragging === block.id
        const isOver = dragOver === block.id

        const blockClass = `grid-block grid-block--${block.type} ${isDragging ? 'is-dragging' : ''} ${isOver ? 'is-drag-over' : ''}`

        return (
            <motion.div
                key={block.id}
                className={blockClass}
                style={{ gridArea: block.gridArea }}
                data-block-id={block.id}
                draggable
                onDragStart={(e) => handleDragStart(e, block.id)}
                onDragOver={(e) => handleDragOver(e, block.id)}
                onDragEnd={handleDragEnd}
                onTouchStart={(e) => handleTouchStart(e, block.id)}
                onTouchEnd={handleDragEnd}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={blockVariants}
                layout
                transition={{ layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
            >
                {/* Drag handle indicator */}
                <div className="block-drag-handle">
                    <span></span><span></span><span></span><span></span>
                </div>

                {block.type === 'image' && (
                    <div className="block-image-wrap">
                        <img src={block.src} alt={block.alt} className="block-portrait" />
                    </div>
                )}

                {block.type === 'title' && (
                    <div className="block-title-content">
                        <span className="block-label">{block.label}</span>
                        <h1 className="block-name">{block.value.split('\n').map((line, i) => (
                            <React.Fragment key={i}>{line}<br /></React.Fragment>
                        ))}</h1>
                    </div>
                )}

                {block.type === 'stat' && (
                    <div className="block-stat-content">
                        <span className="block-label">{block.label}</span>
                        <span className="block-value">{block.value}</span>
                    </div>
                )}

                {block.type === 'text' && (
                    <div className="block-text-content">
                        <p>{block.content}</p>
                    </div>
                )}

                {block.type === 'skills' && (
                    <div className="block-skills-content">
                        <span className="block-label">{block.label}</span>
                        <div className="block-skills-list">
                            {block.items.map((item, idx) => (
                                <span className="block-skill-item" key={idx}>{item}</span>
                            ))}
                        </div>
                    </div>
                )}

                {block.type === 'cta' && (
                    <a href="#contact" className="block-cta-content">
                        <span className="block-cta-text">{block.label}</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </a>
                )}
            </motion.div>
        )
    }

    return (
        <div className="about-info-page">
            {/* Top Bar */}
            <motion.div
                className="about-topbar"
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <Link to="/" className="about-back-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    BACK
                </Link>
                <span className="about-topbar-title">ABOUT / INFO</span>
                <span className="about-topbar-hint">DRAG BLOCKS TO REARRANGE</span>
            </motion.div>

            {/* Grid */}
            <div className="about-grid" ref={gridRef}>
                {blocks.map((block, i) => renderBlock(block, i))}
            </div>
        </div>
    )
}

export default AboutInfoPage
