import React, { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, X } from 'lucide-react'

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const [volume, setVolume] = useState(0.15)
    const [isExpanded, setIsExpanded] = useState(false)
    const audioRef = useRef(null)
    const hasStarted = useRef(false)

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume
        }

        // Start music on first click anywhere on the page
        const startOnFirstClick = () => {
            if (!hasStarted.current && audioRef.current) {
                hasStarted.current = true
                audioRef.current.play().catch(() => { })
                audioRef.current.muted = false
                setIsMuted(false)
                setIsPlaying(true)
            }
            document.removeEventListener('click', startOnFirstClick)
        }

        document.addEventListener('click', startOnFirstClick)
        return () => document.removeEventListener('click', startOnFirstClick)
    }, [])

    // Listen for custom events to coordinate with Workspace videos
    useEffect(() => {
        const handlePauseRequest = () => {
            if (audioRef.current && isPlaying && !isMuted) {
                audioRef.current.pause()
                setIsPlaying(false)
                audioRef.current.dataset.autoPaused = "true"
            }
        }

        const handleResumeRequest = () => {
            if (audioRef.current && audioRef.current.dataset.autoPaused === "true") {
                audioRef.current.play().catch(() => { })
                setIsPlaying(true)
                audioRef.current.dataset.autoPaused = "false"
            }
        }

        window.addEventListener('pause-bg-music', handlePauseRequest)
        window.addEventListener('resume-bg-music', handleResumeRequest)

        return () => {
            window.removeEventListener('pause-bg-music', handlePauseRequest)
            window.removeEventListener('resume-bg-music', handleResumeRequest)
        }
    }, [isPlaying, isMuted])

    const toggleExpand = (e) => {
        e?.stopPropagation()
        setIsExpanded(!isExpanded)
    }

    const togglePlay = (e) => {
        e?.stopPropagation()
        const audio = audioRef.current
        if (!audio) return

        if (isPlaying) {
            audio.pause()
            setIsPlaying(false)
        } else {
            audio.play().catch(() => { })
            setIsPlaying(true)
            if (isMuted) {
                audio.muted = false
                setIsMuted(false)
            }
        }
    }

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value)
        setVolume(newVolume)
        if (audioRef.current) {
            audioRef.current.volume = newVolume
            if (newVolume === 0) {
                audioRef.current.muted = true
                setIsMuted(true)
            } else if (isMuted) {
                audioRef.current.muted = false
                setIsMuted(false)
            }
        }
    }

    const toggleMute = (e) => {
        e?.stopPropagation()
        const audio = audioRef.current
        if (!audio) return

        if (isMuted) {
            audio.muted = false
            setIsMuted(false)
            if (volume === 0) {
                setVolume(0.15)
                audio.volume = 0.15
            }
        } else {
            audio.muted = true
            setIsMuted(true)
        }
    }

    return (
        <div className={`music-player-container ${isExpanded ? 'expanded' : ''}`}>
            <audio ref={audioRef} loop preload="auto">
                <source src="/solitude.mp3" type="audio/mpeg" />
            </audio>

            {!isExpanded && (
                <button
                    className="music-toggle"
                    onClick={toggleExpand}
                    aria-label="Open music player"
                >
                    <div className={`music-icon ${isPlaying && !isMuted ? 'playing' : ''}`}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </button>
            )}

            {isExpanded && (
                <div className="music-window">
                    <button className="music-close" onClick={toggleExpand}>
                        <X size={16} />
                    </button>

                    <div className="music-info">
                        <div className={`music-icon-large ${isPlaying && !isMuted ? 'playing' : ''}`}>
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </div>
                        <div className="music-details">
                            <span className="music-title">Victory Lap Five</span>
                            <span className="music-artist">Fred again...</span>
                        </div>
                    </div>

                    <div className="music-controls">
                        <button className="control-btn" onClick={togglePlay}>
                            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                        </button>
                        <div className="volume-control">
                            <button className="volume-btn" onClick={toggleMute}>
                                {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="volume-slider"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MusicPlayer
