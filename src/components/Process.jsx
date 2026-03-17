import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Process.css';

gsap.registerPlugin(ScrollTrigger);

const processBlocks = [
    { id: '01', className: 'block-1', title: "DISCOVERY", desc: "Understanding the core problem, user needs, and business goals." },
    { id: '02', className: 'block-2', title: "STRATEGY & DESIGN", desc: "Mapping out user flows, architecture, and crafting the visual identity." },
    { id: '03', className: 'block-3', title: "DEVELOPMENT", desc: "Executing robust front-end and back-end architecture with precision." },
    { id: '04', className: 'block-4', title: "DEPLOYMENT", desc: "Rigorous testing, final launch, domain setup, and client handoff." }
];

const Process = () => {
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
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const blockVariants = {
        hidden: { scale: 0.95, opacity: 0, y: 20 },
        visible: {
            scale: 1,
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section id="process" className="process-section">
            <div className="process-header">
                <motion.div
                    className="creative-label"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    [METHODOLOGY]
                </motion.div>
                <h2 className="process-title">{splitText('THE PROCESS')}</h2>
            </div>

            <motion.div
                className="creative-block-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* 4 Process Blocks in a single row */}
                {processBlocks.map((block) => (
                    <motion.div
                        key={block.id}
                        className={`creative-block-item ${block.className}`}
                        variants={blockVariants}
                        whileHover="hover"
                        initial="rest"
                    >
                        <motion.div className="block-number" variants={{ rest: { y: 0 }, hover: { y: -10 } }} transition={{ duration: 0.3 }}>
                            {block.id}
                        </motion.div>
                        <div className="block-content">
                            <motion.h3 className="block-name" variants={{ rest: { color: "#000000" }, hover: { color: "#FFFFFF" } }}>{block.title}</motion.h3>
                            <motion.p className="block-desc" variants={{ rest: { color: "rgba(0,0,0,0.6)", opacity: 1 }, hover: { color: "rgba(255,255,255,0.8)", opacity: 1 } }}>{block.desc}</motion.p>
                        </div>
                        <motion.div className="block-arrow" variants={{ rest: { rotate: 0, scale: 1 }, hover: { rotate: 45, scale: 1.2 } }} transition={{ duration: 0.3 }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </motion.div>
                        <motion.div className="hover-bg" variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} />
                    </motion.div>
                ))}
            </motion.div>

        </section>
    );
};

export default Process;
