import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const initialFooterBlocks = [
    {
        id: 'main-title',
        type: 'title',
        className: 'footer-main-block',
        content: (
            <div className="marquee-wrapper">
                <h2 className="massive-title">SAHIL</h2>
            </div>
        )
    },
    {
        id: 'contact',
        type: 'contact',
        className: 'footer-nav-block',
        content: (
            <>
                <span className="block-label">GET IN TOUCH</span>
                <a href="mailto:sahilsbc751@gmail.com" className="block-email">SAHILSBC751@GMAIL.COM</a>
            </>
        )
    },
    {
        id: 'socials',
        type: 'socials',
        className: 'footer-socials-block',
        content: (
            <>
                <span className="block-label">FOLLOW ON</span>
                <div className="strict-links">
                    <a href="https://www.instagram.com/sahnoir_" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
                    <a href="https://www.youtube.com/@sahil.mp4752" target="_blank" rel="noopener noreferrer">YOUTUBE</a>
                    <a href="#">LINKEDIN</a>
                    <a href="#">BEHANCE</a>
                </div>
            </>
        )
    },
    {
        id: 'credits',
        type: 'credits',
        className: 'footer-copyright-block',
        content: (
            <>
                <span className="block-label">CREDITS</span>
                <p className="copy-text">
                    © 2026 SAHIL CHAVAN.<br />
                    DESIGNED IN PUNE.<br />
                    ALL RIGHTS RESERVED.
                </p>
            </>
        )
    }
];

const Footer = () => {
    const [blocks, setBlocks] = useState(initialFooterBlocks);
    const [dragging, setDragging] = useState(null);
    const [dragOver, setDragOver] = useState(null);
    const draggingRef = useRef(null);
    const gridRef = useRef(null);

    const handleDragStart = useCallback((e, blockId) => {
        // Prevent tracking the drag on actual links
        if (e.target.tagName.toLowerCase() === 'a') {
            e.preventDefault();
            return;
        }
        setDragging(blockId);
        draggingRef.current = blockId;
        e.dataTransfer.effectAllowed = 'move';
        
        // Make the drag ghost transparent
        const ghost = document.createElement('div');
        ghost.style.opacity = '0';
        document.body.appendChild(ghost);
        e.dataTransfer.setDragImage(ghost, 0, 0);
        setTimeout(() => document.body.removeChild(ghost), 0);
    }, []);

    const handleDragOver = useCallback((e, blockId) => {
        e.preventDefault();
        if (blockId !== dragging) {
            setDragOver(blockId);
        }
    }, [dragging]);

    const handleDragEnd = useCallback(() => {
        if (dragging && dragOver && dragging !== dragOver) {
            setBlocks(prev => {
                const newBlocks = [...prev];
                const dragIdx = newBlocks.findIndex(b => b.id === dragging);
                const dropIdx = newBlocks.findIndex(b => b.id === dragOver);
                if (dragIdx === -1 || dropIdx === -1) return prev;

                // Swap array positions
                const temp = newBlocks[dragIdx];
                newBlocks[dragIdx] = newBlocks[dropIdx];
                newBlocks[dropIdx] = temp;
                return newBlocks;
            });
        }
        setDragging(null);
        setDragOver(null);
        draggingRef.current = null;
    }, [dragging, dragOver]);

    // --- Long-press Touch Handlers for Mobile ---
    const holdTimerRef = useRef(null);
    const touchStartPosRef = useRef({ x: 0, y: 0 });
    const HOLD_DURATION = 400; // ms to hold before drag activates
    const MOVE_THRESHOLD = 10; // px movement allowed during hold

    const handleTouchStart = (e, blockId) => {
        // Prevent tracking the drag on actual links
        if (e.target.tagName.toLowerCase() === 'a') return;

        const touch = e.touches[0];
        touchStartPosRef.current = { x: touch.clientX, y: touch.clientY };

        // Start a hold timer — drag only activates after holding
        holdTimerRef.current = setTimeout(() => {
            setDragging(blockId);
            draggingRef.current = blockId;
        }, HOLD_DURATION);
    };

    const cancelHold = () => {
        if (holdTimerRef.current) {
            clearTimeout(holdTimerRef.current);
            holdTimerRef.current = null;
        }
    };

    // Native touchmove handler ref — only preventDefault when actively dragging
    const handleTouchMoveRef = useRef((e) => {
        const touch = e.touches[0];

        // If drag not yet active, check if user moved too far (= scrolling)
        if (!draggingRef.current) {
            const dx = Math.abs(touch.clientX - touchStartPosRef.current.x);
            const dy = Math.abs(touch.clientY - touchStartPosRef.current.y);
            if (dx > MOVE_THRESHOLD || dy > MOVE_THRESHOLD) {
                // User is scrolling — cancel the hold timer
                if (holdTimerRef.current) {
                    clearTimeout(holdTimerRef.current);
                    holdTimerRef.current = null;
                }
            }
            return; // Let the browser handle scrolling
        }

        // Drag IS active — prevent scrolling and track drag target
        e.preventDefault();
        const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
        const blockElement = targetElement?.closest('.draggable-footer-block');
        
        if (blockElement) {
            const targetId = blockElement.getAttribute('data-block-id');
            if (targetId && targetId !== draggingRef.current) {
                setDragOver(targetId);
            }
        }
    });

    // Attach touchmove with { passive: false } via native API to allow preventDefault
    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;
        const handler = handleTouchMoveRef.current;
        grid.addEventListener('touchmove', handler, { passive: false });
        return () => grid.removeEventListener('touchmove', handler);
    }, []);

    return (
        <footer id="contact" className="footer-block-grid">
            <div className="footer-grid-container" ref={gridRef}>
                {blocks.map((block) => {
                    const isDragging = dragging === block.id;
                    const isOver = dragOver === block.id;
                    return (
                        <motion.div
                            key={block.id}
                            className={`${block.className} draggable-footer-block ${isDragging ? 'is-dragging' : ''} ${isOver ? 'is-drag-over' : ''}`}
                            data-block-id={block.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, block.id)}
                            onDragOver={(e) => handleDragOver(e, block.id)}
                            onDragEnd={handleDragEnd}
                            onTouchStart={(e) => handleTouchStart(e, block.id)}
                            onTouchEnd={() => { cancelHold(); handleDragEnd(); }}
                            layout
                            transition={{ layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
                        >
                            {block.content}
                            <div className="drag-indicator">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="9" cy="6" r="1.5" fill="currentColor"/>
                                    <circle cx="15" cy="6" r="1.5" fill="currentColor"/>
                                    <circle cx="9" cy="12" r="1.5" fill="currentColor"/>
                                    <circle cx="15" cy="12" r="1.5" fill="currentColor"/>
                                    <circle cx="9" cy="18" r="1.5" fill="currentColor"/>
                                    <circle cx="15" cy="18" r="1.5" fill="currentColor"/>
                                </svg>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </footer>
    );
};

export default Footer;
