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

            // Animate clip-path directly
            gsap.fromTo(el,
                {
                    clipPath: "inset(10% 5% 45% 5% round 24px)",
                    webkitClipPath: "inset(10% 5% 45% 5% round 24px)",
                },
                {
                    clipPath: "inset(0% 0% 0% 0% round 0px)",
                    webkitClipPath: "inset(0% 0% 0% 0% round 0px)",
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
