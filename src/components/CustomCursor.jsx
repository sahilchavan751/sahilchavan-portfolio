import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorVariant, setCursorVariant] = useState('default');
    const [cursorText, setCursorText] = useState('');

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        const handleMouseEnter = (e) => {
            const target = e.target;

            if (target.closest('.grid-block--cta') || target.closest('.contact-block--form button')) {
                setCursorVariant('gridCta');
                setCursorText('CLICK');
            } else if (target.closest('.grid-block--image')) {
                setCursorVariant('gridGrab');
                setCursorText('✦');
            } else if (target.closest('.grid-block') || target.closest('.contact-grid-block')) {
                setCursorVariant('gridMove');
                setCursorText('MOVE');
            } else if (target.closest('.cube-card')) {
                setCursorVariant('view');
                setCursorText('VIEW');
            } else if (target.closest('.logo-text')) {
                setCursorVariant('me');
                setCursorText('itss mee ❤️');
            } else if (target.closest('.footer-title')) {
                setCursorVariant('spotlight');
                setCursorText('');
            } else if (target.closest('.footer-email')) {
                setCursorVariant('send');
                setCursorText('SEND');
            } else if (target.closest('.social-links a') || target.closest('.social-links-grid a') || target.closest('.footer-col.social a')) {
                setCursorVariant('go');
                setCursorText('GO');
            } else if (target.closest('.bento-item')) {
                setCursorVariant('view');
                setCursorText('VIEW');
            } else if (target.closest('.music-player-container')) {
                setCursorVariant('music');
                setCursorText('🎵');
            } else if (target.closest('a') || target.closest('button') || target.closest('input') || target.closest('textarea') || target.closest('.menu-trigger') || target.closest('.social-links') || target.closest('.close-btn')) {
                setCursorVariant('hover');
                setCursorText('');
            } else if (target.closest('.strip')) {
                setCursorVariant('play');
                setCursorText('PLAY');
            } else if (target.closest('.sphere-main')) {
                setCursorVariant('drag');
                setCursorText('DRAG');
            } else if (target.closest('.about-horizontal-section')) {
                if (target.closest('.timeline-item') || target.closest('.about-header')) {
                    setCursorVariant('scroll');
                    setCursorText('SCROLL');
                } else {
                    setCursorVariant('scroll');
                    setCursorText('SCROLL');
                }
            } else {
                setCursorVariant('default');
                setCursorText('');
            }
        };

        const handleMouseDown = () => {
            if (cursorVariant === 'hover') {
                setCursorVariant('clicking');
            }
        };
        const handleMouseUp = () => {
            if (cursorVariant === 'clicking') {
                setCursorVariant('hover');
            }
        };

        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseover', handleMouseEnter);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mouseover', handleMouseEnter);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [cursorVariant]);

    // Check if it's a touch device (we shouldn't show cursor on mobile)
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    useEffect(() => {
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            setIsTouchDevice(true);
        }
    }, []);

    if (isTouchDevice) return null;

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 1,
            backgroundColor: 'transparent',
            mixBlendMode: 'multiply'
        },
        hover: {
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            scale: 1.5,
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            mixBlendMode: 'multiply'
        },
        play: {
            x: mousePosition.x - 40,
            y: mousePosition.y - 40,
            scale: 2.5,
            backgroundColor: '#000',
            mixBlendMode: 'normal',
            border: 'none',
            color: '#fff'
        },
        drag: {
            x: mousePosition.x - 30,
            y: mousePosition.y - 30,
            scale: 2,
            backgroundColor: '#000',
            mixBlendMode: 'normal',
            border: 'none',
            color: '#fff',
            width: 60,
            height: 60,
            borderRadius: '50%'
        },
        scroll: {
            x: mousePosition.x - 50,
            y: mousePosition.y - 20,
            scale: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            mixBlendMode: 'normal',
            border: 'none',
            color: '#fff',
            width: 100,
            height: 40,
            borderRadius: '20px'
        },
        spotlight: {
            x: mousePosition.x - 60,
            y: mousePosition.y - 60,
            scale: 1,
            backgroundColor: '#000',
            mixBlendMode: 'normal',
            border: 'none',
            width: 120,
            height: 120,
            borderRadius: '50%'
        },
        send: {
            x: mousePosition.x - 40,
            y: mousePosition.y - 20,
            scale: 1,
            backgroundColor: '#000',
            mixBlendMode: 'normal',
            border: 'none',
            color: '#fff',
            width: 80,
            height: 40,
            borderRadius: '20px'
        },
        view: {
            x: mousePosition.x - 40,
            y: mousePosition.y - 20,
            scale: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            mixBlendMode: 'normal',
            border: 'none',
            color: '#fff',
            width: 80,
            height: 40,
            borderRadius: '20px'
        },
        clicking: {
            x: mousePosition.x - 20,
            y: mousePosition.y - 20,
            scale: 1.2,
            backgroundColor: '#000',
            mixBlendMode: 'multiply'
        },
        go: {
            x: mousePosition.x - 40,
            y: mousePosition.y - 20,
            scale: 1,
            backgroundColor: '#000',
            mixBlendMode: 'normal',
            border: 'none',
            color: '#fff',
            width: 80,
            height: 40,
            borderRadius: '20px'
        },
        me: {
            x: mousePosition.x - 60,
            y: mousePosition.y - 20,
            scale: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            mixBlendMode: 'normal',
            border: 'none',
            color: '#fff',
            width: 120,
            height: 40,
            borderRadius: '20px'
        },
        music: {
            x: mousePosition.x - 20,
            y: mousePosition.y - 20,
            scale: 1,
            backgroundColor: '#000',
            mixBlendMode: 'normal',
            border: 'none',
            color: '#fff',
            width: 40,
            height: 40,
            borderRadius: '50%',
            boxShadow: '0 0 15px rgba(0,0,0,0.1)'
        },
        gridMove: {
            x: mousePosition.x - 32,
            y: mousePosition.y - 16,
            scale: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            mixBlendMode: 'normal',
            border: 'none',
            color: '#fff',
            width: 64,
            height: 32,
            borderRadius: '0px'
        },
        gridGrab: {
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            scale: 1,
            backgroundColor: 'transparent',
            mixBlendMode: 'multiply',
            border: '2px solid rgba(0, 0, 0, 0.8)',
            color: '#000',
            width: 48,
            height: 48,
            borderRadius: '0px'
        },
        gridCta: {
            x: mousePosition.x - 36,
            y: mousePosition.y - 16,
            scale: 1,
            backgroundColor: '#000',
            mixBlendMode: 'normal',
            border: 'none',
            color: '#fff',
            width: 72,
            height: 32,
            borderRadius: '0px'
        }
    };

    return (
        <>
            <motion.div
                className="viewfinder-cursor"
                variants={variants}
                animate={cursorVariant}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5
                }}
            >
                {cursorVariant === 'default' && (
                    <>
                        <div className="vf-mark top-left"></div>
                        <div className="vf-mark top-right"></div>
                        <div className="vf-mark bottom-left"></div>
                        <div className="vf-mark bottom-right"></div>
                        <div className="vf-dot"></div>
                    </>
                )}
                {(cursorVariant === 'play' || cursorVariant === 'drag' || cursorVariant === 'scroll' || cursorVariant === 'send' || cursorVariant === 'view' || cursorVariant === 'go' || cursorVariant === 'me' || cursorVariant === 'music' || cursorVariant === 'gridMove' || cursorVariant === 'gridGrab' || cursorVariant === 'gridCta') && (
                    <span className="cursor-text" style={{ fontSize: (cursorVariant === 'scroll' || cursorVariant === 'send' || cursorVariant === 'view' || cursorVariant === 'go' || cursorVariant === 'me' || cursorVariant === 'music' || cursorVariant === 'gridMove' || cursorVariant === 'gridCta') ? '0.7rem' : (cursorVariant === 'gridGrab' ? '0.9rem' : '0.45rem') }}>{cursorText}</span>
                )}
            </motion.div>
        </>
    );
};

export default CustomCursor;
