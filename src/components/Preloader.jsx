import React, { useState, useEffect, useRef } from 'react'

const Preloader = ({ onComplete, isVideoLoaded }) => {
    const [phase, setPhase] = useState('enter') // enter -> hold -> exit
    const [progress, setProgress] = useState(0)
    const isExiting = useRef(false)

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
        if (progress >= 100 && isVideoLoaded && !isExiting.current) {
            isExiting.current = true
            setPhase('exit')

            const timer = setTimeout(() => {
                onComplete()
            }, 2300) // Match CSS transition (2s) + buffer

            return () => clearTimeout(timer)
        }

        if (phase === 'enter') {
            const timer = setTimeout(() => setPhase('hold'), 500)
            return () => clearTimeout(timer)
        }
    }, [progress, onComplete, phase])

    return (
        <div className={`preloader horizontal-split ${phase}`}>
            <div className="preloader-content-wrapper">
                <div className="preloader-title">
                    <svg viewBox="0 0 600 150" className="wave-logo-svg">
                        <defs>
                            <clipPath id="wave-clip">
                                <path
                                    className="wave-path"
                                    d={`M -100 ${125 - (progress * 1.1)} 
                                       Q 50 ${105 - (progress * 1.1)} 200 ${125 - (progress * 1.1)} 
                                       T 500 ${125 - (progress * 1.1)} 
                                       T 800 ${125 - (progress * 1.1)} 
                                       V 150 H -100 Z`}
                                />
                            </clipPath>
                        </defs>

                        {/* Background Text (Outline/Gray) */}
                        <text x="50%" y="50%" dy=".35em" textAnchor="middle" className="text-bg">
                            SAHIL
                        </text>

                        {/* Foreground Text (Filled with Wave) */}
                        <text x="50%" y="50%" dy=".35em" textAnchor="middle" className="text-fg" clipPath="url(#wave-clip)">
                            SAHIL
                        </text>
                    </svg>
                </div>

                {progress >= 100 && !isVideoLoaded && (
                    <div className="preloader-loading-text">
                        <span>PREPARING MEDIA</span>
                        <div className="dot-loader">
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                    </div>
                )}
            </div>

            <div className="shutter-half top"></div>
            <div className="shutter-half bottom"></div>
        </div>
    )
}

export default Preloader
