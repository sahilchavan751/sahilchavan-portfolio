import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Process.css';
const processItems = [
    { id: 1, title: "PLANNING", image: "/process-images/brainstorming.jpg", size: "tall" },
    { id: 2, title: "PLANNING", image: "/process-images/planning.jpg", size: "small" },
    { id: 3, title: "DESIGNING", image: "/process-images/designing.jpg", size: "wide" },
    { id: 4, title: "CODING", image: "/process-images/coding.jpg", size: "small" },
    { id: 5, title: "DIRECTING", image: "/process-images/directing.jpg", size: "small" },
    { id: 6, title: "TESTING", image: "/process-images/testing.jpg", size: "small" },
    { id: 7, title: "REVIEWING", image: "/process-images/reviewing.jpg", size: "wide" },
    { id: 8, title: "DEPLOYING", image: "/process-images/deploying.jpg", size: "small" },
    { id: 9, title: "LAUNCH", image: "/process-images/launch.jpg", size: "small" }
];

const Process = () => {
    const sectionRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    // Close lightbox on Escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setSelectedImage(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Hide header when lightbox is open
    useEffect(() => {
        if (selectedImage) {
            document.body.classList.add('lightbox-open');
        } else {
            document.body.classList.remove('lightbox-open');
        }
        return () => document.body.classList.remove('lightbox-open');
    }, [selectedImage]);

    const splitText = (text) => {
        return text.split('').map((char, i) => (
            <motion.span
                key={i}
                className="char"
                style={{ display: 'inline-block' }}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                    duration: 0.8,
                    delay: i * 0.03,
                    ease: "easeOut"
                }}
            >
                {char === ' ' ? '\u00A0' : char}
            </motion.span>
        ));
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { scale: 0.95, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <>
            <section id="process" className="process-section" ref={sectionRef}>
                <div className="process-header">
                    <motion.div
                        className="process-calligraphy"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                    >
                        Behind the Scenes
                    </motion.div>
                    <h2 className="process-title">{splitText('THE PROCESS')}</h2>
                </div>

                <motion.div
                    className="bento-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {processItems.map((item) => (
                        <motion.div
                            key={item.id}
                            className={`bento-item ${item.size}`}
                            variants={itemVariants}
                            onClick={() => setSelectedImage(item)}
                            whileTap={{ scale: 0.97 }}
                        >
                            <div className="card-image-wrapper">
                                <img src={item.image} alt={item.title} />
                                <div className="card-overlay">
                                    <span className="card-title">{item.title}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Fullscreen Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="lightbox-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="lightbox-close"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(null);
                            }}
                        >
                            ✕
                        </button>
                        <motion.div
                            className="lightbox-content"
                            initial={{ scale: 0.8, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.85, opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage.image}
                                alt={selectedImage.title}
                                className="lightbox-image"
                            />
                            <div className="lightbox-info">
                                <span className="lightbox-title">{selectedImage.title}</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Process;
