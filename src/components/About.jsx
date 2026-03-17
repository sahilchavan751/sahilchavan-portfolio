import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        year: '2021',
        title: 'Freelance Editor',
        description: 'Started crafting visual stories through freelance video editing for local brands and creators, focusing on pacing and narrative.'
    },
    {
        year: '2022',
        title: 'Creative Director',
        description: 'Stepped up to direct full projects, overseeing the entire creative process from storyboarding to final post-production.'
    },
    {
        year: '2023',
        title: 'Frontend Developer',
        description: 'Began blending aesthetic design with interactive web experiences. Mastered React, animations, and modern UI/UX principles.'
    },
    {
        year: '2024',
        title: 'Cinematic Dev',
        description: 'Merged the worlds of filmmaking and coding to build immersive, storytelling-driven web platforms and digital experiences.'
    },
    {
        year: '2025',
        title: 'AI Analytics',
        description: 'Pioneering intelligent interfaces that transform raw data into cinematic insights, blending machine learning with creative strategy.'
    }
];

const About = () => {
    const containerRef = useRef(null);
    const scrollRef = useRef(null);
    useLayoutEffect(() => {
        const sections = gsap.utils.toArray('.timeline-item');

        let ctx = gsap.context(() => {
            // Horizontal scroll animation
            let scrollTween = gsap.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1,
                    start: "top top",
                    // The end determines the duration of the horizontal scroll
                    end: () => `+=${scrollRef.current.offsetWidth}`,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    refreshPriority: 1, // Ensure this pin is calculated BEFORE downstream elements
                }
            });

            // Fade up animations for each item title/desc
            sections.forEach((section) => {
                gsap.fromTo(section.querySelectorAll('.experience-content h3, .experience-content p'),
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.2,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            containerAnimation: scrollTween,
                            start: "left center",
                            toggleActions: "play none none reverse"
                        }
                    }
                );

                // Parallax background year
                gsap.fromTo(section.querySelector('.background-year'),
                    { x: -100 },
                    {
                        x: 100,
                        ease: "none",
                        scrollTrigger: {
                            trigger: section,
                            containerAnimation: scrollTween,
                            start: "left right",
                            end: "right left",
                            scrub: true
                        }
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" className="about-horizontal-section" ref={containerRef}>
            <div className="about-header">
                <motion.div
                    className="about-header-calligraphy"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    The Journey
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                >
                    EXPERIENCE
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    Bridging cinematic storytelling and interactive technology.
                </motion.p>
            </div>

            <div className="timeline-container" ref={scrollRef}>
                {experiences.map((exp, index) => (
                    <div className="timeline-item" key={index}>
                        <div className="background-year">{exp.year}</div>
                        <div className="experience-content">
                            <h3>{exp.title}</h3>
                            <p>{exp.description}</p>
                        </div>
                        <div className="timeline-track-element">
                            <div className="timeline-line"></div>
                            <div className="timeline-node">
                                <div className="timeline-dot"></div>
                                <div className="timeline-year">{exp.year}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default About;
