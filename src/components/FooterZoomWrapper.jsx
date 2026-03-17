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

            // Animate clip-path from a small centered card to full screen
            // inset(top right bottom left round borderRadius)
            gsap.fromTo(el,
                {
                    clipPath: "inset(5% 15% 50% 15% round 24px)",
                },
                {
                    clipPath: "inset(0% 0% 0% 0% round 0px)",
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
