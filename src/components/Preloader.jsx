import React, { useState, useEffect, useRef } from 'react'

const Preloader = ({ onComplete }) => {
    const [phase, setPhase] = useState('enter') 
    const [progress, setProgress] = useState(0)
    const isExiting = useRef(false)
    
    // Generate an array of 25 blocks (5x5 grid)
    const blocks = Array.from({ length: 25 }, (_, i) => i)
    // Create random delays for the exit animation of each block (in seconds)
    const [delays, setDelays] = useState([])

    useEffect(() => {
        // Assign random delays between 0 and 0.8s for the block vanishing
        setDelays(blocks.map(() => Math.random() * 0.8))
    }, [])

    // Progress animation
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                const remaining = 100 - prev
                const increment = Math.max(0.4, Math.random() * (remaining / 10))
                return Math.min(100, prev + increment)
            })
        }, 30)
        return () => clearInterval(interval)
    }, [])

    // Phase management
    useEffect(() => {
        if (progress >= 100 && !isExiting.current) {
            isExiting.current = true
            setPhase('exit')

            // Wait for the longest staggered block animation to finish (~1.2s total)
            const timer = setTimeout(() => {
                onComplete()
            }, 1200) 

            return () => clearTimeout(timer)
        }

        if (phase === 'enter') {
            const timer = setTimeout(() => setPhase('hold'), 500)
            return () => clearTimeout(timer)
        }
    }, [progress, onComplete, phase])

    return (
        <div className={`preloader blocky-grid ${phase}`}>
            {/* The 5x5 White Grid Backdrop */}
            <div className="preloader-bg-wrapper">
                {blocks.map((index) => (
                    <div 
                        key={index} 
                        className="preloader-bg-block"
                        style={{
                            transitionDelay: phase === 'exit' ? `${delays[index]}s` : '0s'
                        }}
                    ></div>
                ))}
            </div>

            {/* Foreground Content: Title and Progress Bar */}
            <div className="preloader-content-wrapper">
                <div className="preloader-text-container">
                    <h1 className="preloader-hero-title">INITIATING</h1>
                    <span className="preloader-percentage">{Math.floor(progress)}%</span>
                </div>
                
                <div className="preloader-bar-container">
                    <div 
                        className="preloader-bar-fill" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    )
}

export default Preloader
