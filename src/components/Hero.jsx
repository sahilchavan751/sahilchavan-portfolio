import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

const videos = [
    { src: "/hero-videos/college... - Odinnn (1080p, h264).mp4", fit: false },
    { src: "/hero-videos/November dump... - Odinnn (1080p, h264).mp4", fit: false },
    { src: "/hero-videos/Mothers cry International day of forest Short film - Odinnn (1080p, h264).mp4", fit: true }
]

const Hero = () => {
    const [currentVideo, setCurrentVideo] = useState(0)
    const [fade, setFade] = useState(true)
    const [isVisible, setIsVisible] = useState(true)
    const [time, setTime] = useState('')
    const [isPlaying, setIsPlaying] = useState(false)
    const videoRef = useRef(null)
    const containerRef = useRef(null)

    // Sync with global music state
    useEffect(() => {
        const handlePause = () => setIsPlaying(false);
        const handleResume = () => setIsPlaying(true);
        window.addEventListener('bg-music-paused', handlePause);
        window.addEventListener('bg-music-resumed', handleResume);
        
        // Robust initial state check
        const checkInitialState = () => {
            const globalAudio = document.querySelector('audio');
            if (globalAudio) {
                setIsPlaying(!globalAudio.paused);
            }
        };

        checkInitialState();
        // Also check if audio gets added/starts later
        const timer = setTimeout(checkInitialState, 1000);

        return () => {
            window.removeEventListener('bg-music-paused', handlePause);
            window.removeEventListener('bg-music-resumed', handleResume);
            clearTimeout(timer);
        };
    }, []);

    const toggleMusic = (e) => {
        e?.stopPropagation(); 
        // Expansion is the primary action requested: "touch to open popup"
        window.dispatchEvent(new CustomEvent('open-music-player'));
        
        // Dispatch a dedicated toggle event so MusicPlayer can handle it
        window.dispatchEvent(new CustomEvent('toggle-bg-music'));
    };

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
            {/* Geometric Grid & Background */}
            <div className="hero-blueprint">
                <div className="blueprint-grid"></div>
                <div className="blueprint-lines">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <motion.path 
                            d="M 0 20 L 100 20" 
                            stroke="rgba(255,255,255,0.05)" 
                            strokeWidth="0.1"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 1 }}
                        />
                        <motion.path 
                            d="M 0 80 L 100 80" 
                            stroke="rgba(255,255,255,0.05)" 
                            strokeWidth="0.1"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 1.2 }}
                        />
                        <motion.path 
                            d="M 20 0 L 20 100" 
                            stroke="rgba(255,255,255,0.05)" 
                            strokeWidth="0.1"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 1.4 }}
                        />
                        <motion.path 
                            d="M 80 0 L 80 100" 
                            stroke="rgba(255,255,255,0.05)" 
                            strokeWidth="0.1"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 1.6 }}
                        />
                    </svg>
                </div>
            </div>

            <div className="video-background">
                <video
                    ref={videoRef}
                    key={currentVideo}
                    className={`hero-video ${fade ? 'visible' : 'hidden'} ${videos[currentVideo].fit ? 'cinematic-fit' : ''}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src={videos[currentVideo].src} type="video/mp4" />
                </video>
                <div className="grain-overlay"></div>
                <div className="hero-scanline"></div>
            </div>

            <div className="hero-content">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="hero-tag"
                >
                    <span className="tag-text">DEV, DIRECTOR, EDITOR</span>
                </motion.div>

                <div className="hero-main-title">
                    <div className="title-bounding-box">
                        <motion.h1
                            className="sahil-text"
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.7 }}
                        >
                            SAHIL
                        </motion.h1>
                        
                        {/* Geometric corners for the title box */}
                        <div className="title-corner tl"></div>
                        <div className="title-corner tr"></div>
                        <div className="title-corner bl"></div>
                        <div className="title-corner br"></div>
                    </div>
                </div>
            </div>

            <div className="hero-bottom-bar">
                <div className="bottom-left">
                    <div className="social-links-minimal">
                        <a href="https://www.instagram.com/sahnoir_" target="_blank" rel="noopener noreferrer">IG</a>
                        <a href="https://www.youtube.com/@sahil.mp4752" target="_blank" rel="noopener noreferrer">YT</a>
                        <a href="#">LI</a>
                        <a href="#">BE</a>
                    </div>
                </div>

                <div className="bottom-center">
                    <div className="scroll-box">
                        <span className="scroll-text">SCROLL TO DISCOVER</span>
                        <div className="scroll-progress-line">
                            <motion.div 
                                className="progress-fill"
                                animate={{ width: ["0%", "100%", "0%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>
                    </div>
                </div>

                <div className="bottom-right">
                    <div className="hero-music-block" onClick={toggleMusic}>
                        <div className={`music-visualizer ${isPlaying ? 'active' : ''}`}>
                            <div className="v-bar"></div>
                            <div className="v-bar"></div>
                            <div className="v-bar"></div>
                            <div className="v-bar"></div>
                        </div>
                        <div className="music-meta">
                            <span className="meta-label">AUDIO.EXE</span>
                            <span className="meta-status">{isPlaying ? 'PLAYING' : 'PAUSED'}</span>
                        </div>
                    </div>
                    <div className="location-technical">
                        <div className="loc-header">LOCAL_COORDINATES</div>
                        <div className="loc-data">NASHIK, MH — {time} GMT+5:30</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
