import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './ContactPage.css'

const initialBlocks = [
    {
        id: 'contact-title',
        type: 'title',
        gridArea: '1 / 1 / 2 / 4',
        label: 'GET IN TOUCH',
        value: 'CONNECT\n& CREATE',
    },
    {
        id: 'availability',
        type: 'stat',
        gridArea: '1 / 4 / 2 / 5',
        label: 'AVAILABILITY',
        value: 'Available for\nFreleance 2026',
    },
    {
        id: 'contact-form',
        type: 'form',
        gridArea: '2 / 1 / 5 / 3',
        label: 'SEND A MESSAGE',
    },
    {
        id: 'social-ig',
        type: 'social',
        gridArea: '2 / 3 / 3 / 4',
        label: 'INSTAGRAM',
        value: '@sahnoir_',
        url: 'https://www.instagram.com/sahnoir_',
    },
    {
        id: 'social-yt',
        type: 'social',
        gridArea: '2 / 4 / 3 / 5',
        label: 'YOUTUBE',
        value: 'Sahil.mp4',
        url: 'https://www.youtube.com/@sahil.mp4752',
    },
    {
        id: 'direct-email',
        type: 'stat',
        gridArea: '3 / 3 / 4 / 5',
        label: 'DIRECT MAIL',
        value: 'sahilsbc751@gmail.com',
    },
    {
        id: 'location-hq',
        type: 'stat',
        gridArea: '4 / 3 / 4 / 4',
        label: 'LOCAL TIME',
        value: 'Nashik, IN\nGMT+5:30',
    },
    {
        id: 'social-li',
        type: 'social',
        gridArea: '4 / 4 / 5 / 5',
        label: 'LINKEDIN',
        value: 'Sahil Chavan',
        url: '#',
    },
    {
        id: 'collab-text',
        type: 'text',
        gridArea: '5 / 1 / 6 / 5',
        content: 'I am always looking for exciting new projects and creative collaborations. Whether you have a specific project in mind or just want to say hello, feel free to reach out. Let\'s build something exceptional together.',
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

const ContactPage = () => {
    const [blocks, setBlocks] = useState(initialBlocks)
    const [dragging, setDragging] = useState(null)
    const [dragOver, setDragOver] = useState(null)
    const gridRef = useRef(null)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleDragStart = useCallback((e, blockId) => {
        setDragging(blockId)
        e.dataTransfer.effectAllowed = 'move'
        const ghost = document.createElement('div')
        ghost.style.opacity = '0'
        document.body.appendChild(ghost)
        e.dataTransfer.setDragImage(ghost, 0, 0)
        setTimeout(() => document.body.removeChild(ghost), 0)
    }, [])

    const handleDragOver = useCallback((e, blockId) => {
        e.preventDefault()
        if (blockId !== dragging) {
            setDragOver(blockId)
        }
    }, [dragging])

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
    }, [dragging, dragOver])

    const renderBlock = (block, index) => {
        const isDragging = dragging === block.id
        const isOver = dragOver === block.id

        const blockClass = `contact-grid-block contact-block--${block.type} ${isDragging ? 'is-dragging' : ''} ${isOver ? 'is-drag-over' : ''}`

        return (
            <motion.div
                key={block.id}
                className={blockClass}
                style={{ gridArea: block.gridArea }}
                draggable
                onDragStart={(e) => handleDragStart(e, block.id)}
                onDragOver={(e) => handleDragOver(e, block.id)}
                onDragEnd={handleDragEnd}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={blockVariants}
                layout
                transition={{ layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
            >
                <div className="block-drag-handle">
                    <span></span><span></span><span></span><span></span>
                </div>

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

                {block.type === 'social' && (
                    <a href={block.url} target="_blank" rel="noopener noreferrer" className="block-social-content">
                        <span className="block-label">{block.label}</span>
                        <div className="social-val-row">
                            <span className="block-value">{block.value}</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                        </div>
                    </a>
                )}

                {block.type === 'form' && (
                    <div className="contact-form-block">
                        <span className="block-label">{block.label}</span>
                        <form className="contact-form-actual" onSubmit={(e) => e.preventDefault()}>
                            <div className="form-input-row">
                                <input type="text" placeholder="YOUR NAME" />
                            </div>
                            <div className="form-input-row">
                                <input type="email" placeholder="EMAIL ADDRESS" />
                            </div>
                            <div className="form-input-row">
                                <textarea placeholder="YOUR MESSAGE" rows="4"></textarea>
                            </div>
                            <button type="submit" className="form-submit-btn">
                                SEND MESSAGE
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </button>
                        </form>
                    </div>
                )}

                {block.type === 'text' && (
                    <div className="block-text-content">
                        <p>{block.content}</p>
                    </div>
                )}
            </motion.div>
        )
    }

    return (
        <div className="contact-page">
            <motion.div
                className="contact-topbar"
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <Link to="/" className="contact-back-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    BACK
                </Link>
                <span className="contact-topbar-title">CONNECT / CONTACT</span>
                <span className="contact-topbar-hint">DRAG BLOCKS TO REARRANGE</span>
            </motion.div>

            <div className="contact-grid" ref={gridRef}>
                {blocks.map((block, i) => renderBlock(block, i))}
            </div>
        </div>
    )
}

export default ContactPage
