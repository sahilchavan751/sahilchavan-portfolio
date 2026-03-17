import React, { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, X } from 'lucide-react'

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const [volume, setVolume] = useState(0.35)
    const [isExpanded, setIsExpanded] = useState(false)
    const audioRef = useRef(null)
    const hasStarted = useRef(false)

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume
        }
    }, [volume])

    // Listen for custom events to coordinate with Workspace videos
    useEffect(() => {
        const handlePauseRequest = () => {
            if (audioRef.current && isPlaying && hasStarted.current) {
                audioRef.current.pause()
                setIsPlaying(false)
                audioRef.current.dataset.autoPaused = "true"
                window.dispatchEvent(new CustomEvent('bg-music-paused'));
            }
        }

        const handleResumeRequest = () => {
            // Only resume if user has manually started music before AND it was auto-paused
            if (audioRef.current && hasStarted.current && audioRef.current.dataset.autoPaused === "true") {
                audioRef.current.play().catch(() => { })
                setIsPlaying(true)
                audioRef.current.muted = false;
                setIsMuted(false);
                audioRef.current.dataset.autoPaused = "false"
                window.dispatchEvent(new CustomEvent('bg-music-resumed'));
            }
        }

        // Toggle event from Hero music block — acts like a manual play/pause
        const handleToggleRequest = () => {
            const audio = audioRef.current
            if (!audio) return

            if (isPlaying) {
                audio.pause()
                setIsPlaying(false)
                hasStarted.current = false
                audio.dataset.autoPaused = "false"
                window.dispatchEvent(new CustomEvent('bg-music-paused'));
            } else {
                hasStarted.current = true
                audio.play().catch(() => { })
                setIsPlaying(true)
                audio.dataset.autoPaused = "false"
                window.dispatchEvent(new CustomEvent('bg-music-resumed'));
                if (audio.muted) {
                    audio.muted = false
                    setIsMuted(false)
                }
            }
        }

        window.addEventListener('pause-bg-music', handlePauseRequest)
        window.addEventListener('resume-bg-music', handleResumeRequest)
        window.addEventListener('toggle-bg-music', handleToggleRequest)

        // Listen for expansion request from Hero
        const handleOpenRequest = () => setIsExpanded(true);
        window.addEventListener('open-music-player', handleOpenRequest);

        return () => {
            window.removeEventListener('pause-bg-music', handlePauseRequest)
            window.removeEventListener('resume-bg-music', handleResumeRequest)
            window.removeEventListener('toggle-bg-music', handleToggleRequest)
            window.removeEventListener('open-music-player', handleOpenRequest);
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
            hasStarted.current = false // User manually stopped — don't auto-resume
            audio.dataset.autoPaused = "false"
            window.dispatchEvent(new CustomEvent('bg-music-paused'));
        } else {
            hasStarted.current = true // User manually started playback
            audio.play().catch(() => { })
            setIsPlaying(true)
            audio.dataset.autoPaused = "false"
            window.dispatchEvent(new CustomEvent('bg-music-resumed'));
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
                setVolume(0.35)
                audio.volume = 0.35
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
