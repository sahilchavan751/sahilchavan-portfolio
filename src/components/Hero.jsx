import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

const videos = [
    { src: "/hero-videos/college... - Odinnn (1080p, h264).mp4", fit: false },
    { src: "/hero-videos/November dump... - Odinnn (1080p, h264).mp4", fit: false },
    { src: "/hero-videos/Mother's cry  International day of forest  Short film - Odinnn (1080p, h264).mp4", fit: true }
]

const Hero = ({ onLoaded }) => {
    const [currentVideo, setCurrentVideo] = useState(0)
    const [fade, setFade] = useState(true)
    const [isVisible, setIsVisible] = useState(true)
    const [time, setTime] = useState('')
    const videoRef = useRef(null)
    const containerRef = useRef(null)

    // Intersection Observer for auto-pause
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting)
            },
            { threshold: 0.1 } // Trigger when at least 10% is visible
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => observer.disconnect()
    }, [containerRef])

    // Real-time Clock Logic
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options = {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            };
            const timeString = new Intl.DateTimeFormat('en-GB', options).format(now);
            setTime(timeString);
        };

        updateTime();
        const timer = setInterval(updateTime, 10000); // Check every 10s for accuracy
        return () => clearInterval(timer);
    }, []);

    const switchVideo = useCallback(() => {
        setFade(false)
        setTimeout(() => {
            setCurrentVideo((prev) => {
                let next;
                do {
                    next = Math.floor(Math.random() * videos.length);
                } while (next === prev && videos.length > 1);
                return next;
            });
            setFade(true)
        }, 800)
    }, [])

    useEffect(() => {
        if (!isVisible) return; // Pause rotation if not visible

        const timer = setInterval(switchVideo, 5000)
        return () => clearInterval(timer)
    }, [switchVideo, isVisible])

    useEffect(() => {
        const video = videoRef.current
        if (video) {
            if (!isVisible) {
                video.pause();
                return;
            }
            // Force jump to random time on every video swap
            const handleLoaded = () => {
                if (video.duration) {
                    const randomTime = Math.random() * video.duration;
                    video.currentTime = randomTime;
                }
            };

            video.addEventListener('loadedmetadata', handleLoaded);

            video.load();
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => { });
            }

            return () => video.removeEventListener('loadedmetadata', handleLoaded);
        }
    }, [currentVideo])

    return (
        <section className="hero" ref={containerRef}>
            <div className="video-background">
                <video
                    ref={videoRef}
                    key={currentVideo}
                    className={`hero-video ${fade ? 'visible' : 'hidden'} ${videos[currentVideo].fit ? 'cinematic-fit' : ''}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    onLoadedData={() => {
                        if (currentVideo === 0 && onLoaded) {
                            onLoaded();
                        }
                    }}
                >
                    <source src={videos[currentVideo].src} type="video/mp4" />
                </video>
                <div className="grain-overlay"></div>
            </div>

            <div className="hero-content">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="hero-subtitle"
                >
                    DEV, DIRECTOR, EDITOR
                </motion.div>

                <div className="hero-main-title" style={{ position: 'relative', display: 'inline-block' }}>
                    <motion.h1
                        className="sahil-text"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.7 }}
                    >
                        SAHIL
                    </motion.h1>
                    <motion.h2
                        className="chavan-text"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.9 }}
                    >
                        CHAVAN
                    </motion.h2>
                    <motion.div
                        className="age-text"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 1.1 }}
                    >
                        AGE-21
                    </motion.div>
                </div>

            </div>

            <div className="hero-bottom">
                <div className="social-links">
                    <a href="https://www.instagram.com/sahnoir_" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
                    <a href="https://www.youtube.com/@sahil.mp4752" target="_blank" rel="noopener noreferrer">YOUTUBE</a>
                    <a href="#">LINKEDIN</a>
                    <a href="#">BEHANCE</a>
                </div>

                <div className="scroll-hint">
                    <div className="mouse-indicator">
                        <div className="mouse-wheel"></div>
                    </div>
                </div>

                <div className="location">
                    <span className="marker">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" height="12" r="3"></circle>
                        </svg>
                    </span>
                    <span>NASHIK, MH — {time} GMT+5:30</span>
                </div>
            </div>
        </section>
    )
}

export default Hero
