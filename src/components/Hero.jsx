import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import musicBtnSvg from '../../svg/MUISC BUTTON.svg'
export const HERO_VIDEOS = [
    { src: "/hero-videos/college... - Odinnn (1080p, h264).mp4", fit: false },
    { src: "/hero-videos/November dump... - Odinnn (1080p, h264).mp4", fit: false },
    { src: "/hero-videos/Mothers cry International day of forest Short film - Odinnn (1080p, h264).mp4", fit: true }
]

const Hero = ({ currentVideo, fade, isClone }) => {
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

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    
    const handleMouseMove = useCallback((e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMousePosition({ x, y });
    }, []);

    return (
        <section 
            className="hero hero-parallax" 
            ref={containerRef} 
            onMouseMove={handleMouseMove} 
            onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
        >
            {/* Layer 1: Deep Background Text */}
            <motion.div 
                className="parallax-layer parallax-bg"
                animate={{ x: mousePosition.x * -40, y: mousePosition.y * -40 }}
                transition={{ type: "spring", stiffness: 75, damping: 20, mass: 0.5 }}
            >
                <h1 className="parallax-bg-text">CHAVAN</h1>
            </motion.div>

            {/* Layer 2: Masked Video Cutout */}
            <motion.div 
                className="parallax-layer parallax-mid"
                animate={{ x: mousePosition.x * -15, y: mousePosition.y * -15 }}
                transition={{ type: "spring", stiffness: 75, damping: 20, mass: 0.5 }}
            >
                <div className="video-cutout organic-shape">
                    <video
                        ref={videoRef}
                        key={currentVideo}
                        className={`parallax-video ${fade ? 'visible' : 'hidden'} ${HERO_VIDEOS[currentVideo].fit ? 'cinematic-fit' : ''}`}
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source src={HERO_VIDEOS[currentVideo].src} type="video/mp4" />
                    </video>
                    <div className="parallax-film-grain"></div>
                </div>
            </motion.div>

            {/* Layer 3: Foreground Overlapping Text & UI */}
            <motion.div 
                className="parallax-layer parallax-fg"
                animate={{ x: mousePosition.x * 30, y: mousePosition.y * 30 }}
                transition={{ type: "spring", stiffness: 75, damping: 20, mass: 0.5 }}
            >
                <h2 className="parallax-fg-text">SAHIL</h2>
                
                {/* Badges Layout TL */}
                <div className="parallax-ui-item parallax-badge-tl">
                    <span>DEV</span><span className="dot"></span><span>DIRECTOR</span><span className="dot"></span><span>EDITOR</span>
                </div>

                {/* Vertical Scroll Indicator TR */}
                <div className="parallax-ui-item parallax-scroll-tr">
                    <div className="scroll-line">
                        <motion.div 
                            className="scroll-thumb"
                            animate={{ scaleY: [0, 1, 0], transformOrigin: ["50% 0%", "50% 0%", "50% 100%"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                    <span className="scroll-label">DISCOVER</span>
                </div>

                {/* Music Toggle BL */}
                <div className="parallax-ui-item parallax-music-bl" onClick={toggleMusic}>
                    <img 
                        src={musicBtnSvg} 
                        alt="Music Toggle" 
                        className="music-toggle-svg"
                    />
                </div>

                {/* Location BR */}
                <div className="parallax-ui-item parallax-location-br">
                    <div className="p-loc-label">LOCAL_TIME</div>
                    <div className="p-loc-value">{time}</div>
                    <div className="p-loc-label mt-2">NASHIK, MH</div>
                </div>
            </motion.div>
        </section>
    )
}

export default Hero
