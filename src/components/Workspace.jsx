import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const projects = [
    { id: 1, title: 'Landscape', type: 'image', src: '/workspace-images/pexels-eberhardgross-1287075.jpg' },
    { id: 2, title: 'College', type: 'video', src: "/hero-videos/college... - Odinnn (1080p, h264).mp4" },
    { id: 3, title: 'Mountains', type: 'image', src: '/workspace-images/pexels-eberhardgross-1366919.jpg' },
    { id: 4, title: "Mother's Cry", type: 'video', src: "/hero-videos/Mother's cry  International day of forest  Short film - Odinnn (1080p, h264).mp4" },
    { id: 5, title: 'Architecture', type: 'image', src: '/workspace-images/pexels-freestockpro-1174183.jpg' },
    { id: 6, title: 'November', type: 'video', src: "/hero-videos/November dump... - Odinnn (1080p, h264).mp4" },
    { id: 7, title: 'Abstract', type: 'image', src: '/workspace-images/pexels-lukas-rodriguez-1845331-3573351.jpg' },
]

const ProjectStrip = ({ project, isActive, onClick }) => {
    const videoRef = useRef(null)

    const handleMouseEnter = () => {
        if (window.innerWidth > 768 && videoRef.current) {
            videoRef.current.play().catch(() => { })
        }
    }

    const handleMouseLeave = () => {
        if (window.innerWidth > 768 && videoRef.current) {
            videoRef.current.pause()
        }
    }

    // Handle video play/pause for active state on mobile
    React.useEffect(() => {
        if (window.innerWidth <= 768 && videoRef.current) {
            if (isActive) {
                videoRef.current.play().catch(() => { })
            } else {
                videoRef.current.pause()
            }
        }
    }, [isActive])

    return (
        <div
            className={`strip ${isActive ? 'active' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            {project.type === 'video' ? (
                <video
                    ref={videoRef}
                    className="strip-media"
                    muted
                    loop
                    playsInline
                    src={project.src}
                />
            ) : (
                <img
                    className="strip-media"
                    src={project.src}
                    alt={project.title}
                    loading="lazy"
                />
            )}
            <div className="strip-overlay">
                <span className="strip-number">0{project.id}</span>
                <h3 className="strip-title">{project.title}</h3>
            </div>
        </div>
    )
}

const Workspace = () => {
    const [activeId, setActiveId] = useState(null)
    const [selectedMedia, setSelectedMedia] = useState(null)
    const [isPlaying, setIsPlaying] = useState(true)
    const [isMuted, setIsMuted] = useState(false) // Start unmuted in popup
    const popupVideoRef = useRef(null)

    const handleStripClick = (project) => {
        if (window.innerWidth <= 768) {
            if (activeId === project.id) {
                // If already active (expanded) on mobile, open popup
                setSelectedMedia(project)
                setIsPlaying(true)
                setIsMuted(false)
            } else {
                // First tap expands it
                setActiveId(project.id)
            }
        } else {
            // Open popup on desktop directly
            setSelectedMedia(project)
            setIsPlaying(true)
            setIsMuted(false)
        }
    }

    // Close on Escape
    React.useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setSelectedMedia(null)
        }
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [])

    // Toggle body class to hide navbar when popup is open
    React.useEffect(() => {
        if (selectedMedia) {
            document.body.classList.add('popup-open')
        } else {
            document.body.classList.remove('popup-open')
        }

        // Cleanup on unmount
        return () => document.body.classList.remove('popup-open')
    }, [selectedMedia])

    // Manage Background Music via Custom Events
    React.useEffect(() => {
        if (selectedMedia && selectedMedia.type === 'video' && isPlaying && !isMuted) {
            window.dispatchEvent(new CustomEvent('pause-bg-music'))
        } else {
            window.dispatchEvent(new CustomEvent('resume-bg-music'))
        }

        // Ensure music resumes when component unmounts
        return () => window.dispatchEvent(new CustomEvent('resume-bg-music'))
    }, [selectedMedia, isPlaying, isMuted])

    const togglePlay = (e) => {
        e.stopPropagation()
        if (popupVideoRef.current) {
            if (isPlaying) {
                popupVideoRef.current.pause()
            } else {
                popupVideoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const toggleMute = (e) => {
        e.stopPropagation()
        if (popupVideoRef.current) {
            popupVideoRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    // ... handlePrev and handleNext omitted for brevity (they remain the same for mobile strips)
    const handlePrev = (e) => {
        e.stopPropagation()
        const currentIndex = projects.findIndex(p => p.id === activeId)
        if (currentIndex > 0) {
            setActiveId(projects[currentIndex - 1].id)
        } else {
            setActiveId(projects[projects.length - 1].id)
        }
    }

    const handleNext = (e) => {
        e.stopPropagation()
        const currentIndex = projects.findIndex(p => p.id === activeId)
        if (currentIndex < projects.length - 1) {
            setActiveId(projects[currentIndex + 1].id)
        } else {
            setActiveId(projects[0].id)
        }
    }

    return (
        <section id="projects" className="workspace">
            <div className={`workspace-strips ${activeId !== null ? 'has-active' : ''}`}>
                {projects.map((project) => (
                    <ProjectStrip
                        key={project.id}
                        project={project}
                        isActive={activeId === project.id}
                        onClick={() => handleStripClick(project)} // pass full project
                    />
                ))}

                {/* Workspace Navigation for Mobile */}
                <div className="workspace-nav-mobile">
                    <button className="ws-nav-btn prev" onClick={handlePrev} aria-label="Previous project">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <button className="ws-nav-btn next" onClick={handleNext} aria-label="Next project">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Alan Menken Style Creative Popup */}
            <AnimatePresence>
                {selectedMedia && (
                    <motion.div
                        className="workspace-popup-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        onClick={() => setSelectedMedia(null)}
                    >
                        <motion.div
                            className="workspace-popup-content"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* The Masked Container */}
                            <div className="masked-media-container">
                                {selectedMedia.type === 'video' ? (
                                    <video
                                        ref={popupVideoRef}
                                        className="popup-media"
                                        src={selectedMedia.src}
                                        autoPlay
                                        loop
                                        playsInline
                                    />
                                ) : (
                                    <img
                                        className="popup-media"
                                        src={selectedMedia.src}
                                        alt={selectedMedia.title}
                                    />
                                )}
                            </div>

                            {/* Media Controls & Info */}
                            <div className="popup-controls">
                                <h3 className="popup-title">{selectedMedia.title}</h3>

                                {selectedMedia.type === 'video' && (
                                    <div className="popup-buttons">
                                        <button className="popup-btn" onClick={togglePlay}>
                                            {isPlaying ? (
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                                            ) : (
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                            )}
                                        </button>
                                        <button className="popup-btn" onClick={toggleMute}>
                                            {isMuted ? (
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                                            ) : (
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>

                            <button className="popup-close-btn" onClick={() => setSelectedMedia(null)}>
                                CLOSE ✕
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default Workspace
