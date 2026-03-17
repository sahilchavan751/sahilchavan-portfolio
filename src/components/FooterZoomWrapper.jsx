import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from './Footer';
import './FooterZoomWrapper.css';

gsap.registerPlugin(ScrollTrigger);

const FooterZoomWrapper = () => {
    const wrapperRef = useRef(null);
    const clipRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const el = clipRef.current;
            if (!el) return;

            // Animate CSS variables instead of raw clip-path strings for bulletproof rendering
            gsap.fromTo(el,
                {
                    "--clip-top": "10%",
                    "--clip-right": "5%",
                    "--clip-bottom": "45%",
                    "--clip-left": "5%",
                    "--clip-rad": "24px",
                },
                {
                    "--clip-top": "0%",
                    "--clip-right": "0%",
                    "--clip-bottom": "0%",
                    "--clip-left": "0%",
                    "--clip-rad": "0px",
                    ease: "none",
                    scrollTrigger: {
                        trigger: wrapperRef.current,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: true,
                    },
                }
            );
        }, wrapperRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="footer-zoom-wrapper" ref={wrapperRef}>
            <div className="footer-zoom-sticky">
                <div className="footer-zoom-clip" ref={clipRef}>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default FooterZoomWrapper;
