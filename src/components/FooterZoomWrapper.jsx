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

            // Use less aggressive clip on mobile where footer is stacked vertically
            const isMobile = window.innerWidth <= 768;
            const startClip = isMobile
                ? "inset(5% 3% 25% 3%)"
                : "inset(15% 5% 55% 5%)";

            // Animate clip-path directly using strict 4-value syntax
            gsap.fromTo(el,
                {
                    clipPath: startClip,
                    webkitClipPath: startClip,
                },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    webkitClipPath: "inset(0% 0% 0% 0%)",
                    ease: "power2.inOut",
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: wrapperRef.current,
                        start: "top top",
                        end: "+=150vh", // Longer scroll distance for slower reveal
                        scrub: 1.5, // Smooth scrub with 1.5s lag for buttery feel
                        pin: true,
                    },
                }
            );
        }, wrapperRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="footer-zoom-wrapper" ref={wrapperRef}>
            <div className="footer-zoom-clip" ref={clipRef}>
                <Footer />
            </div>
        </div>
    );
};

export default FooterZoomWrapper;
